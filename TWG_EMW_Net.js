"use strict";
exports.__esModule = true;

var WebSocket = require("ws");
var express = require('express'), app = express(), bodyParser = require('body-parser');
var mysql = require('mysql');
var http = require('http');
var os = require('os');
var networkInterfaces =  os.networkInterfaces();
var arr = networkInterfaces['Local Area Connection 3'];
var ip = arr[1].address;

const results = Object.create(null); // Or just '{}', an empty object

var connection = mysql.createConnection({
    host: ip,
    user: 'root',
    password: 'MortyAndLouis44242B',
    database: 'emw_db'
});
try {
    connection.connect();
    console.log('Bingo!');
} catch(err) {
    console.log(err);
}

var port = '8081';

// init HTTP server
var server = http.createServer(app);

// init WebSocket Server
var sock = new WebSocket.Server({ server: server });

app.use(express.json());
server.listen(port, function () {
    console.log('Listening @ http://localhost:' + port);
});
sock.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('received: ' + message);
        ws.send('Received your message. You sent: ' + message);
    });
    ws.send('Hello! I am a WebSocket server.');
});


//Express
app.get('/', function (req, res) {
    console.log('GET request received. \n' + req.body);
    res.send('Received your GET request.');
});
//Close Server
app.get('/close', function (req, res) {
    console.log("Closing server...");
    res.send("Bye bye!");
    server.close();
    sock.close();
});
app.post('/', function (req, res) {
    console.log("POST request received. \n" + req.body);
    res.send('Received your POST request.');
});
// Login
app.post('/Login', function (req, res) {
    var sql = 'CALL Login(' + "\'"+ req.get('username') + "\'" + ',' + "\'" + req.get('password') + "\'" + ')';
    connection.query(sql, true, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        console.log("Login Successful " + results[0]);
      });
    console.log("POST request [[LOGIN]] received. \n Username: " + req.get('username') + " Password: " + req.get('password'));
    res.send("POST request received. \n Username: " + req.get('username') + "Password: " + req.get('password'));
});
// Register New Account
app.post('/Register', function (req, res) {
    var sql = 'CALL RegisterAccount(' + "\'"+ req.get('username') + "\'" + ',' + "\'" + req.get('password') + "\'" + ',' + "\'" + req.get('email') + "\'"+ ')';
    connection.query(sql, true, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        console.log("Registered User " + results[0]);
      });
    console.log("POST request received. \n Username: " + req.get('username') + "Password: " + req.get('password'));

    res.send('Received your POST request.');
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
