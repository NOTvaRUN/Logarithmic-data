var fs = require('fs')
var https = require('https')
var ws = require('websocket')
var privateKey  = fs.readFileSync('sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

//... bunch of other express stuff here ...
console.log('loaded')
//pass in your express app and credentials to create an https server
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443);

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
	server: httpsServer
});

console.log(wss)
console.log(httpsServer)

wss.on('connection', function connection(ws) {
	console.log(ws)
	ws.on('message', function incoming(message) {
	console.log('received: %s', message);
	});
	setInterval(()=>{
		ws.send(Math.random() * 100);
	},1000)
});