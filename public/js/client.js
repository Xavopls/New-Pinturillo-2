function Client()
{
    this.ws = new WebSocket('ws://localhost:9048');
    this.ws.z = () => {
        console.log('Websocket connected!');
        this.ws.onmessage = function (event) {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            console.log(event)
        };
        // sending a send event to websocket server
        this.ws.send('connected')
    };

    this.room = '';
    this.nickname = '';
    this.user_id = '';
    this.color = '';
    this.status ='';
    this.nickname = '';

    this.connect = () => {
        this.ws.send("You are connected!")
    };


    this.join_room = (room_name, client_name, callback_fn) => {
        var message = {
            'msg_type': 'join_room',
            'room_name': room_name,
            'nickname': client_name
        };
        this.ws.send(JSON.stringify(message));
        this.ws.onmessage = callback_fn
    };

    this.create_room = (room_name, client_name, callback_fn) => {
        var message = {
            'msg_type': 'create_room',
            'room_name': room_name,
            'nickname': client_name
        };
        this.ws.send(JSON.stringify(message));
        this.ws.onmessage = callback_fn
    };

    this.list_rooms = (callback_fn) => {
        var message = {
            'msg_type': 'list_rooms'
        };
        this.ws.send(JSON.stringify(message));
        this.ws.onmessage = callback_fn
    }

    this.show_user_list = (callback_fn) => {
        var message = {
            'msg_type' : 'show_user_list'
        };
        this.ws.send(JSON.stringify(message));
        this.ws.onmessage = callback_fn
    }
    this.send_message = (msg_content, callback_fn) => {
        var message = {
            'msg_type' : 'send_message',
            'content' : msg_content
        };
        this.ws.send(JSON.stringify(message));
        this.ws.onmessage = callback_fn
    }

}