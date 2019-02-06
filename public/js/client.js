function Client()
{
    this.ws = new WebSocket('ws://localhost:9048');
    this.ws.onopen = () => {
        console.log('websocket is connected ...');
        // sending a send event to websocket server
        this.ws.send('connected')
    };

    this.room = '';
    this.nickname = '';
    this.user_id = '';
    this.color = '';

    this.connect = () => {
        this.ws.send("Hi!")
    };

    this.join_room = (room_name, client_name) => {
        var message = {
            'msg_type': 'join_room',
            'room_name': room_name,
            'client_name': client_name
        };
        this.ws.send(JSON.stringify(message));
    };

    this.create_room = (room_name, client_name) => {
        var message = {
            'msg_type': 'create_room',
            'room_name': room_name,
            'client_name': client_name
        };
        this.ws.send(JSON.stringify(message));
    };

    this.list_rooms = (callback_fn) => {
        var message = {
            'msg_type': 'list_rooms',
        };
        this.ws.send(JSON.stringify(message));
        this.ws.onmessage = callback_fn
    }
}

// event emmited when receiving message
// ws.onmessage = function (ev) {
//     console.log(ev.data);
//     switch (ev.data.msg_type) {
//         case 'room_list':
//             return ev.data.data;
//     }
//     //
// };