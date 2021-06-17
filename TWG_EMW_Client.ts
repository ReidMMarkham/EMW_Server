import * as WebSocket from 'ws';

const socket = new WebSocket("http://localhost:8081");

socket.onopen = () => {
    socket.send('Heres a message.')
}
socket.onmessage = e => {
    console.log('Message from Server: ', e.data);
}