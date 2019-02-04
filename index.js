var http = require("http"),
    fs = require("fs");

var port = 1337;

var server = http.createServer(function(request, response) {
    filename = '.' + request.url;
    fs.exists(filename, function(exists) {
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html'; //Primera ejecucion, para que lea el HTML

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }
            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });
})

server.listen(port, function (){
    console.log("Server running at port: ", port);
});

// WEB SOCKET

var WebSocketServer = require('websocket').server;
wsServer = new WebSocketServer({ // create the server
    httpServer: server //if we already have our HTTPServer in server variable...
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
