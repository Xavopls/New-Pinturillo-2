var client = {
	room: '',
	nickname: '',
	user_id: '',
	color: '',
};

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
client.color = colores[Math.floor(Math.random() * colores.length)];

var new_server;
var canvasPos;
var url = "localhost:55000"
//ecv-etic.upf.edu:9000

var server = new SillyClient(); //Crea instancia de servidor
server.connect(url, ""); //Primera conexion en blanco a servidor

//Listado de las salas
server.getReport(function (report) {
	for (sala in report.rooms) {
		var name_room = decodeURI(sala) //decodeURI para que no nos de caracteres raros tipo espacios como %20
		if (name_room != "") {
			var element = document.createElement("option");
			element.innerHTML = name_room;
			element.value = name_room;
			document.querySelector("#select_room").appendChild(element);
		}
	}
});

//Entrar en una sala
function joinRoom() {

	if (client.nickname != '' && client.room != '') {
		server.close(); //Cierra conexion primer servidor
		new_server = new SillyClient(); //Abre nueva conexion con servidor con una sala predeterminada
		new_server.connect(url, client.room);

		new_server.on_ready = function (id) { //Cuano se obtiene una id primero se guarda en el servior los datos del cliente
			client.user_id = id;
			new_server.storeData(id + "_Pinturillo", JSON.stringify(client));
			loadClientList(); //Se listan en el html todos los clientes conectados
		};

		new_server.on_message = function (author_id, msg) { //Al recibir un mensaje se llama a reciveMessage para procesar el msg
			reciveMessage(author_id, msg);
		};

		new_server.on_user_disconnected = function (user_id) { //Si se desconecta un cliente se elimina del html
			var parent = document.querySelector("#player_list")
			var child = document.getElementById(user_id)
			parent.removeChild(child);
		}

		new_server.on_user_connected = function (user_id) { //Si se conecta un cliente se añade en la lista del html
			sleep(2000); //Esto pausa para que el cliente que se ha conectado le de tiempo de escribir en el servidor sus datos. Vease la funcion de "new_server.on_ready"

			new_server.loadData((user_id + "_Pinturillo"), function (data) {
				printClientList(data) //Montamos el cliente para el html
			})
		}

		document.querySelector("#login_page_container").style.display = "none"; //Ocultamos login y desplegamos el chat
		document.querySelector("#game_page_container").style.display = "inline";

		canvasPos = setCanvas(canvas); //Fijamos posición del canvas
	}
}

//Escucha de boton Create room
var set_createroom = document.querySelector("#set_createroom");
set_createroom.addEventListener("click", function () {
	client.room = document.querySelector("#createroom").value;
	client.nickname = document.querySelector("#nickname").value;
	joinRoom();
});

//Escucha de boton Join room
var join_room = document.querySelector("#join_room");
join_room.addEventListener("click", function () {
	var select_room = document.getElementById("select_room");
	client.room = select_room.options[select_room.selectedIndex].value;
	client.nickname = document.querySelector("#nickname").value;
	joinRoom();
});

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