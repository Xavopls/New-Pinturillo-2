// LISTENER SERVER
var express = require('express');
var app = express();
var port = 9047;

app.use(express.static('public'));

app.listen(port, function () {
    console.log("Server running at port: ", port);
});


function Room(){
    this.name = '';
    this.clients = [];
    this.id = '';
}

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

var room_list = [];
// room_list.push('asd1');
// room_list.push('asd2');

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
        console.log('%s --- Received: %s', new Date().toLocaleString(), message);
        var client_msg = '';
        try {
            client_msg = JSON.parse(message);
        } catch(e) {
            return
        }
        if (client_msg.view === 'login_page') {
            switch (client_msg.msg_type) {
                case 'create_room':
                    // Miramos si existe
                    var repeated = false;
                    for (var i = 0; i<room_list.length;i++){
                        if (client_msg.room_name === room_list[i].name) repeated = true;
                    }
                    // SI LA SALA NO EXISTE
                    if (!repeated){
                        console.log('create_room');
                        var room = new Room();
                        room.name = client_msg.room_name;
                        room.id = id_room_counter;
                        room.clients.push(client);
                        client.room = room;
                        id_client_counter++;
                        room_list.push(room);
                        id_room_counter++;

                        var msg = {
                            'msg_type': 'create_room',
                            'status': 'OK'
                        };
                        // Y CREAR ALGUN SERVIDOR, SOCKET O INSTANCIAR ALGO PARA CREAR UNA SALA EN SÍ.
                        client.send(JSON.stringify(msg));
                        console.log('\n\n');
                        console.log('CURRENT ROOM: ', room);
                        console.log('\n\n');

                        console.log('CURRENT CLIENT: ', client);
                        console.log('\n\n');

                    }
                    // SI LA SALA YA EXISTE
                    else {
                        var msg = {
                            'msg_type': 'create_room',
                            'status': 'repeated'
                        }
                        client.send(JSON.stringify(msg));
                    }

                    break;

                case 'join_room':
                    client.room = client_msg.room_name;
                    for (var i = 0; i<room_list.length;i++){
                        if (client_msg.room_name === room_list[i].name){
                            room_list[i].clients.push(client);
                        }
                    }

                    var msg = {
                        'msg_type': 'join_room',
                        'status': 'OK'
                    };
                    client.send(JSON.stringify(msg));
                    break;

                case 'list_rooms':
                    console.log(room_list);
                    var room_ids = [];
                    for (var i = 0; i<room_list.length; i++){
                        room_ids.push(room_list[i].name);
                    }
                    var msg = {
                        'msg_type': 'room_list',
                        'rooms': room_ids
                    };
                    JSON.stringify(msg, function( key, value) {
                        if(key == 'Room') {
                            return value.id;
                        } else {
                            return value;
                        }
                    });

                    client.send(JSON.stringify(msg), );
                    break;
            }
        }

        else if (client_msg.view === 'chat'){

        }

    });
});

