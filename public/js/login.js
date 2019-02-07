var client = new Client();

var new_server;
var canvasPos;



//Entrar en una sala
/*function joinRoom() {

	if (client.nickname != '' && client.room != '') {
		server.close(); //Cierra conexion primer servidor
		new_server = new SillyClient(); //Abre nueva conexion con servidor con una sala predeterminada
		new_server.connect(url, client.room);

		new_server.on_ready = function (id) { //Cuano se obtiene una id primero se guarda en el servior los datos del cliente
			client.user_id = id;
			new_server.storeData(id + "_Pinturillo", JSON.stringify(client));
			loadClientList(); //Se listan en el html todos los clientes conectados
		};

		new_server.on_message = function (author_id, msg) { //Al recibir un mensaje se llama a recieveMessage para procesar el msg
			recieveMessage(author_id, msg);
		};

		new_server.on_user_disconnected = function (user_id) { //Si se desconecta un cliente se elimina del html
			var parent = document.querySelector("#player_list")
			var child = document.getElementById(user_id)
			parent.removeChild(child);
		}

		new_server.on_user_connected = function (user_id) { //Si se conecta un cliente se añade en la lista del html
			sleep(2000); //Esto pausa para que el cliente que se ha conectado le de tiempo de escribir en el servidor sus datos. Vease la funcion de "new_server.on_ready"

			new_server.loadData((user_id + "_Pinturillo"), function (data) {
				printClientList(data, true) //Montamos el cliente para el html
			})
		}


	}
}
*/







// CREATE ROOM
var set_createroom = document.querySelector("#set_createroom");
set_createroom.addEventListener("click", function () {
	var room_name = document.querySelector("#createroom").value;
	var user_name = document.querySelector("#nickname").value;
	if (room_name.length > 0 && user_name.length > 0){
		client.create_room(room_name, user_name, on_room_created);
	}
});

function on_room_created(msg) {
	var data = JSON.parse(msg.data);
	switch (data.status) {
		case 'repeated':
			alert('Room name already exists');
			break;

		case 'OK':
			document.querySelector("#login_page_container").style.display = "none"; //Ocultamos login y desplegamos el chat
			document.querySelector("#game_page_container").style.display = "inline";
			canvasPos = setCanvas(canvas); //Fijamos posición del canvas i pintamos el fondo
			break;

	}
}


// JOIN ROOM
var join_room = document.querySelector("#join_room");
join_room.addEventListener("click", function () {
	var select_room = document.getElementById("select_room");
	var joined_room = select_room.options[select_room.selectedIndex].value;
	var client_nick = document.querySelector("#nickname").value;
	if(client_nick.length > 0){
		client.join_room(joined_room,client_nick, on_room_joined);
	}
});

function on_room_joined(msg){
	var data = JSON.parse(msg.data);
	switch (data.status) {
		case 'repeated':
			alert('Room does not exist, try refreshing the page');
			break;

		case 'OK':
			document.querySelector("#login_page_container").style.display = "none"; //Ocultamos login y desplegamos el chat
			document.querySelector("#game_page_container").style.display = "inline";
			canvasPos = setCanvas(canvas); //Fijamos posición del canvas i pintamos el fondo
			break;

	}
}




// LIST ROOMS
var dropdown_rooms = document.querySelector("#dropdown_rooms");
dropdown_rooms.addEventListener("click", function () {
	client.list_rooms(on_rooms_received);
});

function on_rooms_received(msg){
	var data = JSON.parse(msg.data);
	var rooms = data.rooms;
	console.log(rooms);

		rooms.forEach((sala) => {
			var name_room = decodeURI(sala); //decodeURI para que no nos de caracteres raros tipo espacios como %20
			if (name_room) {
					var element = document.createElement("option");
					element.innerHTML = name_room;
					element.value = name_room;
					document.querySelector("#select_room").appendChild(element);
			}
		});
}



/*
//Funcion sleep() para ganar tiempo
//inspirado en https://www.phpied.com/sleep-in-javascript/
function sleep(milliseconds) {
	var now = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - now) > milliseconds) {
			break;
		}
	}
}
*/


