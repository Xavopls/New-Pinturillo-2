// LISTENER SERVER

var express = require('express');
var app = express();
var port = 3000;

app.use(express.static('public'));

app.listen(port, function () {
    console.log("Server running at port: ", port);
});

// WEB SOCKET SERVICE
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 40510})

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('received: %s', message)
    })
    setInterval(
        () => ws.send('AOOOOOOOOOOOOOOOOOOOOOOOOO DURO'),
        1000
    )
})




/*
// WEB SOCKET

var WebSocketServer = require('websocket').server;
wsServer = new WebSocketServer({ // create the server
    httpServer: app //if we already have our HTTPServer in server variable...
});

wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    console.log("NEW WEBSOCKET USER!!!");
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log( "NEW MSG: " + message.utf8Data ); // process WebSocket message
        }
    });

    connection.on('close', function(connection) {
        console.log("USER IS GONE");// close user connection
    });
});
*/