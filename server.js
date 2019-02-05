// LISTENER SERVER
var express = require('express');
var app = express();
var port = 9047;

app.use(express.static('public'));

app.listen(port, function () {
    console.log("Server running at port: ", port);
});


colores = ['FF6633', 'FFB399', 'FF33FF', 'FFFF99', '00B3E6',
    'E6B333', '3366E6', '999966', '99FF99', 'B34D4D',
    '80B300', '809900', 'E6B3B3', '6680B3', '66991A',
    'FF99E6', 'CCFF1A', 'FF1A66', 'E6331A', '33FFCC',
    '66994D', 'B366CC', '4D8000', 'B33300', 'CC80CC',
    '66664D', '991AFF', 'E666FF', '4DB3FF', '1AB399',
    'E666B3', '33991A', 'CC9999', 'B3B31A', '00E680',
    '4D8066', '809980', 'E6FF80', '1AFF33', '999933',
    'FF3380', 'CCCC00', '66E64D', '4D80CC', '9900B3',
    'E64D66', '4DB380', 'FF4D4D', '99E6E6', '6666FF'
];

// CLASSES
/*
var room = {
    "id" : 0,
    "client_list": []
};
*/
var room_list = [];
room_list.push('asd1');
room_list.push('asd2');

var client = {
    'id': 0,
    'busy': false,
    'room': '',
    'nickname' : '',
    'color': ''
};
var id_client_counter = 1;
var id_room_counter = 1;

// WEB SOCKET SERVICE
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 9048});

wss.on('connection', function (client) {
    // AQUI SE CREA EL NUEVO CLIENTE
    client.id = id_client_counter;
    id_client_counter++;
    client.color = colores[Math.floor(Math.random() * colores.length)];

    client.on('message', function (message) {
        switch (message.msg_type) {
            case 'create_room':
                room.name = message.room_name;
                room.id = id_room_counter;
                room.clients.push(client);
                id_room_counter++;
                room_list.push(room);
                // FALTA DEVOLVER AL CLIENTE EL OK PARA QUE ESTE MODIFIQUE EL FRONTEND
                // Y CREAR ALGUN SERVIDOR, SOCKET O INSTANCIAR ALGO PARA CREAR UNA SALA EN SÍ.
                break;

            case 'join_room':

                break;
            case 'list_rooms':
                var msg = {
                    'msg_type': 'room_list',
                    'data': room_list
                };
                client.send(JSON.stringify(msg));
                break;

        }
        console.log('received: %s', message)
    });
    console.log('WS', client);
    setInterval(
        () => client.send('AOOOOOOOOOOOOOOOOOOOOOOOOO DURO'),
        1000

    )
});


// LOGIN PAGE
function createRoom(){

}

function joinRoom() {

}

function showRooms(){

}

function hideLogin() {
    
}


