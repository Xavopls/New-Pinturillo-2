var ws = new WebSocket('ws://localhost:9048');
// event emmited when connected
ws.onopen = function () {
    console.log('websocket is connected ...')
    // sending a send event to websocket server
    ws.send('connected')
};
// event emmited when receiving message
ws.onmessage = function (ev) {
    console.log('IM THE CLIENT');
    console.log(ev.data);
    switch (ev.data.msg_type) {
        case 'room_list':
            paintRoomList(ev.data.data);
    }
    //
};

// LOGIN PAGE
function cl_joinRoom(room_name, client_name) {
    var message = {
        'msg_type': 'join_room',
        'room_name': room_name,
        'client_name': client_name
    };
    ws.send(JSON.stringify(message));
}

function cl_createRoom(room_name, client_name){
    var message = {
        'msg_type': 'create_room',
        'room_name': room_name,
        'client_name': client_name
    };
    ws.send(JSON.stringify(message));
}

function cl_listRooms(){
    var message = {
        'msg_type': 'list_rooms',
    };
    ws.send(JSON.stringify(message));
}