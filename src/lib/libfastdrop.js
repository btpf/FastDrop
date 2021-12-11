
// Import Socket.io Client
// const io = require("socket.io-client");
// ES6 import or TypeScript
import { io } from "socket.io-client";

// Good library for the time, Will allow me to debug with current setup
// const streamSaver = require('streamsaver')
import streamSaver from 'streamsaver'

const DEFAULT_CONFIG = {
    socketConfig: "ws://127.0.0.1:6970",
    RTCPeerConnectionConfig: {
        mandatory: {
            // offerToReceiveAudio: true
        },
        iceServers: [
            {
                urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
            },
        ],
        iceCandidatePoolSize: 10,
    }
};


class libFastDrop {
    constructor(params) {

        let {
            user = null,
            friends = [],
            config = DEFAULT_CONFIG
        } = params

        if (user.uid == null) {
            console.log("NO UID Set")
        }

        // Keeps track of all user sessions. All users this peer is connected to
        this.sessions = {}

        this.user = user
        this.friends = friends
        // Address of signaling server
        this.socketConfig = config.socketConfig
        // WebRTC Peer Connection Configuration
        this.RTCPeerConnectionConfig = config.RTCPeerConnectionConfig
        this.files = []
        
        // Callbacks
        this.fileDetailsUpdate = ()=>{}

        this.#initializeSocketIO(config.socketConfig, config.RTCPeerConnectionConfig)

    }

    sendText(uid, text) {
        const config = { type: "text" }
        // Opens connection with UID
        console.log("Before Callback")
        this.openConnection(uid, config, (e) => {
            console.log("--> Peer Ready, Sending Text")
            let dc = this.sessions[uid].createDataChannel("text")
            console.log(dc.readyState)

            // It appears as if the open state is by default
            // Possibly because the primary connection has already been established?
            // Regardless, i choose to handle this in an if statement in case this is a bug
            // With wrtc implementation
            if (dc.readyState == "open") {
                dc.send(text)
            } else {
                dc.onopen = async (e) => {
                    console.log("Text Channel Opened")
                    dc.send(text)
                }
            }
            dc.onmessage = (e) => {
                console.log("New Message: " + e.data)
            }
        })

    }
    getFileTransfers(){
        return this.files
    }
    sendBytes(uid, file) {

        // UInt8 Byte Representation = 10 Bytes
        // 100 seems to work
        const chunkSize = 256 * 1024 ; //256KB Chunk size - Chromium Max
        const lowWaterMark = chunkSize; // A single chunk
        const highWaterMark = Math.max(chunkSize * 8, 1048576); // 8 chunks or at least 1 MiB

        // Testing
        let dataString = new Array(chunkSize).fill('X').join('');
        // var fileSize = 168 * 1024 * 1024;
        var fileSize = file.size;
        let totalChunks = Math.ceil(fileSize / chunkSize)


        let lWindow = 0
        let rWindow = Math.min(chunkSize, fileSize)
        let startTime
        console.log("Before Loop")



        let fileInfo = {chunks:totalChunks, currentChunk:0, fileName: file.name, size:fileSize}
        this.files.push(fileInfo)
        this.fileDetailsUpdate(this.files)
        // let fileInfo = { chunks: totalChunks, currentChunk: 0, fileName: "test.txt", size: fileSize }
        const config = { type: "bytestream", fileInfo }
        this.openConnection(uid, config, async (e) => {
            // console.log("MAX SIZE: " + this.sessions[uid].sctp.maxMessageSize)
            console.log("--> Peer Ready, preparing bytestream")
            // console.log(this.sessions)
            let dc = this.sessions[uid].createDataChannel("bytestream", {
                ordered: true,
                // maxRetransmits: 0
            })
            dc.binaryType = "arraybuffer";
            // chunkSize - 1 seems to work
            dc.bufferedAmountLowThreshold = chunkSize - 1;
            // start sending data chunks here.
            // Increment chunk on each message back

            let buffer = null
            let nextArray = null

            let sendData = async () => {
                fileInfo.currentChunk++
                // if (fileInfo.currentChunk++ != fileInfo.chunks) {
                    // console.log("Sending Buffer")
                    // console.log("Buffer Amount: " + dc.bufferedAmount)
                    buffer = await file.slice(lWindow, rWindow).arrayBuffer();
                    nextArray = new Int8Array(buffer)
                    // console.log(nextArray)
                    dc.send(nextArray)
                    lWindow = rWindow
                    rWindow = Math.min(rWindow + chunkSize, fileSize)
                    console.log("Current Chunk: " + fileInfo.currentChunk + " Total Chunks: " + fileInfo.chunks)
                // } 
                this.fileDetailsUpdate(this.files)
                if(fileInfo.currentChunk >= fileInfo.chunks){
                    console.log("Finished on sender side")
                    console.log("Time Taken: " + (performance.now() - startTime))
                    return;
                }

            }
            // V1 CODE
            dc.onopen = (e) => {
                console.log("bytestream datachannel open")

                // dc.send(dataString)
                startTime = performance.now()
                // dc.send(dataString)
                sendData()
            }

            // In the case the buffer threshold is bet
            dc.onbufferedamountlow = async (e) => {
                console.log("Buffer Threshold Low")
               sendData()
            };

            dc.onerror = (e) => {
                console.log("ERROR: ")
                console.log(e)
            }
            dc.onclosing = (e) => {
                console.log("ONCLOSING: ")
                console.log(e)
            }
            dc.onclose = (e) => {
                console.log("ONCLOSE: ")
                console.log(e)
            }
        })
    }

    serializeConfig() {
        return { user: this.user, friends: this.friends, config: { socketConfig: this.socketConfig, RTCPeerConnectionConfig: this.RTCPeerConnectionConfig } }
    }

    // Opens a peer connection with a friend
    openConnection = async (uid, config, operationCallback) => {
        const pc = new RTCPeerConnection(this.RTCPeerConnectionConfig);
        // https://stackoverflow.com/questions/19609077/does-webrtc-handle-packet-loss-and-packet-received-confirmations-etc-for-you-or
        // Adding reliable makes webrtc use TCP, which handles packet loss

        // Save peer connection in sessions
        this.sessions[uid] = pc

        let dc = pc.createDataChannel("config", { reliable: true })

        // Once the datachannel is open between the two users, send the config object
        dc.onopen = async (e) => {
            console.log(" --> Connection Opened, Sending Config")
            dc.send(JSON.stringify(config))
        }

        // Once the peer has recieved the config and made an acknowledgement to it
        dc.onmessage = (e) => {
            console.log("<-- Config response: " + e.data)
            // callback to perform the next operation
            operationCallback(e)
        }

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("Ice Candidate found locally")
                console.log("--> Sending to remote peer")
                this.socket.emit("offerIce", { to: uid, from: this.user.uid, candidate: event.candidate })
                // Send the candidate to the remote peer
            } else {
                // Taken from https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/icecandidate_event


                // When an ICE negotiation session runs out of candidates to propose for a given RTCIceTransport, it has
                // completed gathering for a generation of candidates. That this has occurred is indicated by an
                // icecandidate event whose candidate string is empty ("").

                // You should deliver this to the remote peer just like any standard candidate...
                // This ensures that the remote peer is given the end-of-candidates notification as well.

                this.socket.emit("offerIce", { to: uid, from: this.user.uid, candidate: event.candidate })

                console.log("All candidates found")
                //All ICE candidates have been sent
            }
        }

        // Create Offer Description - initiates the creation of an SDP
        const offerDescription = await pc.createOffer(
            // {offerToReceiveAudio: 1}
        );
        // Set the description for self/locally
        await pc.setLocalDescription(offerDescription);

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type
        }
        pc.dc = dc
        this.socket.emit("offer", { to: uid, from: this.user.uid, offer })
    }

    #initializeSocketIO(socketIOConfig) {
        // Extra config needed for cors: https://stackoverflow.com/a/65566581
        const socket = io(socketIOConfig, { transports: ['websocket', 'polling', 'flashsocket'] })
        this.socket = socket

        // Send Identification to server
        socket.emit("identify", { uid: this.user.uid, friends: this.friends })

        // When the server sends a statusChange event of a friend
        socket.on("statusChange", this.#onStatusChange)

        // When the initial SDP offer is recieved by a friend
        socket.on("offer", (event) => this.#onOffer(event))

        socket.on("offerIce", (event) => this.#onOfferIce(event))

        socket.on("answer", (event) => this.#onAnswer(event))
    }
    async #onOffer(event) {
        // Connect to stun servers
        const pc = new RTCPeerConnection(this.RTCPeerConnectionConfig);
        // Note: Ice candidates seem to be recieved before the answer is made
        this.sessions[event.from] = pc


        console.log("Offer Made")
         pc.onicecandidate = (iceEvent) => {
            if (iceEvent.candidate) {
                console.log("Ice Candidate found locally")
                console.log("--> Sending to remote peer")
            this.socket.emit("offerIce", { to: event.from, from: this.user.uid, candidate: iceEvent.candidate })
                // Send the candidate to the remote peer
            } else {
                // Taken from https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/icecandidate_event


                // When an ICE negotiation session runs out of candidates to propose for a given RTCIceTransport, it has
                // completed gathering for a generation of candidates. That this has occurred is indicated by an
                // icecandidate event whose candidate string is empty ("").

                // You should deliver this to the remote peer just like any standard candidate...
                // This ensures that the remote peer is given the end-of-candidates notification as well.

             this.socket.emit("offerIce", { to: event.from, from: this.user.uid, candidate: iceEvent.candidate })

                console.log("All candidates found")
                //All ICE candidates have been sent
            }
        }

        // Set remoteDescription from the remote SDP Offer
        await pc.setRemoteDescription(event.offer);
        pc.ondatachannel = e => {
            let channelLabel = e.channel.label
            let dc = e.channel
            console.log("New Data Channel: " + channelLabel)

            if (channelLabel == "config") {
                dc.onmessage = (e) => {
                    console.log("Config Recieved: " + e.data)
                    pc.config = JSON.parse(e.data)
                    console.log(pc.config)
                    if('fileInfo' in pc.config){
                        this.files.push(pc.config.fileInfo)
                        this.fileDetailsUpdate(this.files)
                    }
                    dc.send("ready")
                }
            }
            if (channelLabel == "text") {
                dc.onmessage = (e) => {
                    console.log(e.data)
                    dc.send("Text Recieved")
                }
            }
            if (channelLabel == "bytestream") {
                dc.binaryType = 'arraybuffer';
                console.log({ size: pc.config.fileInfo.size })
                const fileStream = streamSaver.createWriteStream(pc.config.fileInfo.fileName, { size: pc.config.fileInfo.size })
                const writer = fileStream.getWriter()
                dc.onmessage = async (e) => {
                    // console.log("RECIEVED PART")
                    // console.log(new Uint8Array(e.data))

                        pc.config.fileInfo.currentChunk++
                        // console.log("Percent: " + (pc.config.fileInfo.currentChunk / pc.config.fileInfo.chunks) * 100)
                        writer.write(new Uint8Array(e.data))

                        // console.log("Current Chunk: " + pc.config.fileInfo.currentChunk + " Total Chunks: " + pc.config.fileInfo.chunks)
                        if(pc.config.fileInfo.currentChunk == pc.config.fileInfo.chunks){
                            writer.close()
                            // writer.close()
                            // console.log(completeMessage)
                            console.log("Download Complete")
                            // Used simply to signal complete on server side
                            dc.send("Transfer Complete")
                        }
                        this.fileDetailsUpdate(this.files)
                    
                }
                dc.onerror = (e) => {
                    console.log("ERROR: ")
                    console.log(e)
                }
                dc.onclosing = (e) => {
                    console.log("ONCLOSING: ")
                    console.log(e)
                }
                dc.onclose = (e) => {
                    console.log("ONCLOSE: ")
                    console.log(e)
                }
                dc.onbufferedamountlow = async (e) => {
                    // dc.send(new Uint8Array[0])
                    console.log("BUFFER THRESHOLD LOW")
                };

                dc.onopen = e => dc.send(new Uint8Array([0]))
            }
            // dc.onopen = e => console.log("Datachannel Opened: " + JSON.stringify(e))
            pc.dc = dc
        }

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);


        const offer = {
            sdp: answer.sdp,
            type: answer.type
        }

        this.socket.emit("answer", { to: event.from, from: event.to, offer })
    }

    async #onStatusChange(event) {
        console.log(event)
    }

    async #onAnswer(event) {
        let connection = this.sessions[event.from]
        // Set remote description as their answer
        await connection.setRemoteDescription(event.offer);
    }
    async #onOfferIce(event) {
        console.log("ICE recieved")
        console.log(event)
        let connection = this.sessions[event.from]
        // console.log(this.sessions)
        await connection.addIceCandidate(event.candidate)
    }

}

class TestClass{
    constructor(number){
        this.number = number
    }
    getNumber(){
        return this.number++
    }
}

class Singleton{

    constructor() {
        this.instance = null
    }

    getInstance(config){
        if(this.instance == null){
            this.instance = new libFastDrop(config)
            // this.instance = new TestClass(5)
        }
        return this.instance
    }
}

// module.exports = libFastDrop
// export default libFastDrop

export default new Singleton()