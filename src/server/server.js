const http = require("http");
const express = require('express')
const app = express()
const server = http.createServer(app)
const socket = require("socket.io")
const io = socket(server)
const port = 8000

let ramdb = { addressBook: {}, userSessions: {}, onlineUsers: 0 }

io.on("connection", socket => {
    // On socket IO Disconnect event
    socket.on("disconnect", (reason) => {
        // Log the reason for the disconnect
        console.log(reason); // "ping timeout"

        // Handle Edge case of server crashing but users reconnect
        // While the server Database is empty
        if(!ramdb.userSessions[socket.id]){
            console.log("Crash prevented")
            return
        }

        // Get UID Corresponding to disconnected sessionID
        let UID = ramdb.userSessions[socket.id].uid
        // Delete the UID from the address book
        delete ramdb.addressBook[UID]

        // Announce the user is going offline to all friends of the user
        announceUserStatus(socket.id, "offline")

        // Set the onlineUsers list to the current users
        delete ramdb.userSessions[socket.id]
        ramdb.onlineUsers--

    });

    // When the user connects to the server, they will identify themselves
    socket.on("identify", (data) => {
        // Push their identity and socket id to the ramdb
        ramdb.userSessions[socket.id] = data
        ramdb.addressBook[data.uid] = socket.id
        ramdb.onlineUsers++

        // Announce to all friends that they had come online
        announceUserStatus(socket.id, "online")
    });


    socket.on("offer", (data) => {

        console.log("Offer recieved")
        // let userObj = ramdb.users.find((user) => user.identity == data.to)
        io.to(ramdb.addressBook[data.to]).emit("offer", data)
    });

    socket.on("offerIce", (data) => {

        console.log("offerIce recieved")
        io.to(ramdb.addressBook[data.to]).emit("offerIce", data)
    });

    socket.on("answer", (data) => {
        // console.log(data)
        console.log("answer recieved")
        io.to(ramdb.addressBook[data.to]).emit("answer", data)
    });

})

// Announce a userStatus to all friends of socketId
function announceUserStatus(socketId, newStatus) {
    // Find the userObj corresponding to the socketId
    let userObj = ramdb.userSessions[socketId]

    userObj.friends.forEach((friend) => {
        // Lookup the friend's UID in the address book to find their SID
        let friendSID = ramdb.addressBook[friend]
        // If the address book contains thier UID, they are online
        if (friendSID) {
            // Emit the status change to that friend
            io.to(friendSID).emit("statusChange", { uid: userObj.uid, status: newStatus })

            // In the case we are announcing we are online
            if (newStatus == "online") {
                // Send to the user coming online all of the friends found of theirs that are also online
                io.to(socketId).emit("statusChange", { uid: friend, status: newStatus })
            }
        }
    })
}

// Debug
app.get('/', function (req, res) {
    res.send(JSON.stringify(ramdb))
})
server.listen(port, () => console.log("Server Started On " + port))