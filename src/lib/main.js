import './style.css'

// (function () {
//   var old = console.log;
//   var logger = document.getElementById('debug');
//   window.console.log = function (message) {
//     if (typeof message == 'object') {
//       logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
//     } else {
//       logger.innerHTML += message + '<br />';
//     }
//   }
// })();

import libFastDrop from './libfastdrop';
// const libFastDrop = require('./libfastdrop')
// const libFastDrop = import('./libfastdrop')

// console.log("Hello World")

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
// document.querySelector('#app').innerHTML = "HI"

// Testing
// const userID = process.env.USER;

const friends = {
  reciever: ["sender"],
  sender: ["receiver"]
}

// let user
// if (userID == "receiver") {
//     user = {
//         alias: "receiver",
//         uid: "receiver",
//         secret: "TODO"
//     }
// } else {
//     user = {
//         alias: "sender",
//         uid: "sender",
//         secret: "TODO"
//     }
// }



//                                 // Config object. To be saved client side
// let fastdrop = new libFastDrop({ user, friends: friends[user.uid] })
// // console.log(fastdrop.serializeConfig())


// if (userID == "sender") {
//                                     // Send To,  Message
//     // setTimeout(() => fastdrop.sendText("receiver", "Hello World"), 5000)
//     setTimeout(() => fastdrop.sendBytes("receiver"), 3000)
// }


// (function () {
//   var old = console.log;
//   var logger = document.getElementById('debug');
//   window.console.log = function (message) {
//       if (typeof message == 'object') {
//           logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
//       } else {
//           logger.innerHTML += message + '<br />';
//       }
//   }
// })();

function test() {
  console.log("TESTED")
}


let user = null
function sender(file) {
  user = {
    alias: "sender",
    uid: "sender",
    secret: "TODO"
  }
  let fastdrop = libFastDrop.getInstance({ user, friends: friends[user.uid] })
  setTimeout(() => fastdrop.sendBytes("receiver", file), 3000)
}

function senderTesting() {
  user = {
    alias: "sender",
    uid: "sender",
    secret: "TODO"
  }
  let fastdrop = libFastDrop.getInstance({ user, friends: friends[user.uid] })
  setTimeout(() => fastdrop.sendBytes("receiver", null), 5000)
}

function receiver() {
  user = {
    alias: "receiver",
    uid: "receiver",
    secret: "TODO"
  }

  let fastdrop = libFastDrop.getInstance({ user, friends: friends[user.uid] })
}

async function readFile(file){
  // let file = new File("./draw.png",);
  // console.log(file.size)

  const chunkSize = 1024 * 64; //16KB Chunk size
  var fileSize = file.size;
  let totalChunks = Math.ceil(fileSize/chunkSize)
  let currentChunk = 0
  // Prevent default behavior (Prevent file from being opened)
  

  let lWindow = 0
  let rWindow = Math.min(chunkSize, fileSize)
  var buffer = await file.slice(lWindow, rWindow).arrayBuffer();
  // var sizeof = require('object-sizeof')
  // console.log(buffer.byteLength)
  // console.log(sizeof(new Int8Array(buffer)))
}

async function sendText(){
  // let file = new File("./draw.png",);
  // console.log(file.size)
  user = {
    alias: "sender",
    uid: "sender",
    secret: "TODO"
  }
  let fastdrop = libFastDrop.getInstance({ user, friends: friends[user.uid] })
  fastdrop.sendText("receiver", "Hello World")
}


window.test = test
window.sender = sender
window.receiver = receiver
window.readFile = readFile
window.senderTesting = senderTesting


window.sendText = sendText