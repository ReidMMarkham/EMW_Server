"use strict";
exports.__esModule = true;
var WebSocket = require("ws");
var socket = new WebSocket("http://localhost:8081");
socket.onopen = function () {
    socket.send('Heres a message.');
};
socket.onmessage = function (e) {
    console.log('Message from Server: ', e.data);
};
