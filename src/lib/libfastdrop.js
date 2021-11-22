const wrtc = require('wrtc');
const { RTCPeerConnection } = wrtc;

// Import Socket.io Client
const io = require("socket.io-client");


const DEFAULT_CONFIG = {
    socketConfig: "ws://127.0.0.1:8000",
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

        this.user = user
        this.friends = friends
        this.addressBook = {}
        this.socketConfig = config.socketConfig
        this.RTCPeerConnectionConfig = config.RTCPeerConnectionConfig
        this.#initializeSocketIO(config.socketConfig, config.RTCPeerConnectionConfig)
        this.sessions = {}

    }

    sendText(uid, text) {
        const config = {type:"text"}
        this.openConnection(uid,config, (e) => {
            console.log("--> Peer Ready, Sending Text")
            // console.log(this.sessions)
            let dc = this.sessions[uid].createDataChannel("text")
        console.log(dc.readyState)

        // It appears as if the open state is by default
        // Possibly because the primary connection has already been established?
        // Regardless, i choose to handle this in an if statement in case this is a bug
        // With wrtc implementation
        if(dc.readyState == "open"){
            dc.send(text)
        }else{
            dc.onopen = async (e) => {
                console.log("Text Channel Opened")
                dc.send(text)
            }
        }

    
            dc.onmessage = (e) => {
                console.log("New Message: " + e.data)
            }
            // this.sessions[uid].dc.send(text)
        })

    }

    serializeConfig() {
        return { user: this.user, friends: this.friends, config: { socketConfig: this.socketConfig, RTCPeerConnectionConfig: this.RTCPeerConnectionConfig } }
    }

    // Opens a peer connection with a friend
    openConnection = async (uid,config, operationCallback) => {
        const pc = new RTCPeerConnection(this.RTCPeerConnectionConfig);
        // https://stackoverflow.com/questions/19609077/does-webrtc-handle-packet-loss-and-packet-received-confirmations-etc-for-you-or
        // Adding reliable makes webrtc use TCP, which handles packet loss
        // Save peer connection in sessions
        this.sessions[uid] = pc

        let dc = pc.createDataChannel("config", {reliable:true})
        dc.onopen = async (e) => {
            console.log(" --> Connection Opened, Sending Config")
            dc.send(JSON.stringify(config))
            // dc.send("HI")
        }

        dc.onmessage = (e) => {
            console.log("<-- Config response: " + e.data)
           operationCallback(e)
        }
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                this.socket.emit("offerIce", { to: uid, from: this.user.uid, candidate: event.candidate })
                // Send the candidate to the remote peer
            } else {
                console.log("All candidates found")
                //All ICE candidates have been sent
            }
        }
        const offerDescription = await pc.createOffer(
            // {offerToReceiveAudio: 1}
        );
        await pc.setLocalDescription(offerDescription);
        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type
        }
        pc.dc = dc
        this.socket.emit("offer", { to: uid, from: this.user.uid, offer })
    }

    #initializeSocketIO(socketIOConfig) {
        const socket = io(socketIOConfig)
        this.socket = socket

        // Send Identification to server
        socket.emit("identify", { uid: this.user.uid, friends: this.friends })

        socket.on("statusChange", this.#onStatusChange)

        socket.on("offer", (event) => this.#onOffer(event))

        socket.on("offerIce", (event) => this.#onOfferIce(event))

        socket.on("answer", (event) => this.#onAnswer(event))
    }
    async #onOffer(event) {
        const pc = new RTCPeerConnection(this.RTCPeerConnectionConfig);
        // Note: Ice candidates seem to be recieved before the answer is made
        this.sessions[event.from] = pc


        await pc.setRemoteDescription(event.offer);
        pc.ondatachannel = e => {
            let channelLabel = e.channel.label
            let dc = e.channel
            console.log("New Data Channel: " + channelLabel)

            if(channelLabel == "config"){
            dc.onmessage = (e) =>{
             console.log("Config Recieved: " + e.data)
            pc.config = JSON.parse(e.data)
            dc.send("ready")
            }
        }
        if(channelLabel == "text"){
            dc.onmessage = (e) =>{
                console.log(e.data)
             dc.send("Text Recieved")
            }
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
        // console.log("<-- answer recieved")
        let connection = this.sessions[event.from]
        await connection.setRemoteDescription(event.offer);
    }
    async #onOfferIce(event) {
        // console.log("ICE recieved")
        // console.log(event)
        let connection = this.sessions[event.from]
        // console.log(this.sessions)
        await connection.addIceCandidate(event.candidate)
    }

}

module.exports = libFastDrop