import * as WebSocket from 'ws';

const express   = require('express'),
    app = express(),
    bodyParser = require('body-parser');

const http      = require('http');
const port      = '8081';
// init HTTP server
const server    = http.createServer(app);
// init WebSocket Server
const sock      = new WebSocket.Server({server});


app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(port, () => {
    console.log('Listening @ http://localhost:' + port);
});

sock.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        console.log('received: ' + message);
        ws.send('Received your message. You sent: ' + message);
    });

    ws.send('Hello! I am a WebSocket server.');
});

//Express
app.get('/', (req, res) => {
    console.log('GET request received. \n' + req.body);
    res.send('Received your GET request.');
});

//Close Server
app.get('/close', (req, res) => {
    console.log("Closing server...");
    res.send("Bye bye!");

    server.close();
    sock.close();
});

app.post('/', (req, res) =>{
    console.log("POST request received. \n" + req.body);
    res.send('Received your POST request.');
});

// Login
app.post('/Login', (req, res) =>{
    console.log("POST request received. \n Username: " + req.body + "Password: " + req.body);
    res.send('Received your POST request.');
    res.sendStatus(200);
});



// Websocket
/*
function connect(url: string): void{

    let sock = new WebSocket('http://localhost:' + port);

    sock.addEventListener('message', function(event){
        console.log('Message from client: ', event.data);
    });
}

function onOpen(event: any): void{
    console.log('We are live! Listening on port:' + 'port');
}

function onMessage(event: any): void{

}

function onError(event: any): void{

}

function onClose(event: any): void{
    
}
*/