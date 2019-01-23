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
//client.nickname = ''
//client.room = '';
//client.user_id = '';
var new_server;
var canvasPos;
var url = "ecv-etic.upf.edu:9000"
//ecv-esup.s.upf.edu:9000

var server = new SillyClient(); //Crea instancia de servidor
server.connect(url, ""); //Primera conexion en blanco a servidor

//Listado de las salas
server.getReport(function (report) {
	for (sala in report.rooms) {
		var sa = decodeURI(sala)
		if (sa != "") {
			var element = document.createElement("option");
			element.innerHTML = sa;
			element.value = sa;
			document.querySelector("#select_room").appendChild(element);
		}
	}
});

//Entrar en una sala
function j_room() {

	if (client.nickname != '' && client.room != '') {
		server.close();
		new_server = new SillyClient();
		new_server.connect(url, client.room);

		new_server.on_ready = function (id) {
			client.user_id = id;
			new_server.storeData(id + "_Pinturillo", JSON.stringify(client));
			loadClientList();

		};


		new_server.on_message = function (author_id, msg) {
			reciveMessage(author_id, msg);

		};



		new_server.on_user_connected = function (user_id) {
var cargar=user_id+"_Pinturillo"
console.log(cargar)
			//Borra tots els fills
			new_server.loadData(cargar, function (data) {

				var cl= JSON.parse(data);

				var input = document.createElement('p');
				input.id=cl.user_id;
				input.innerHTML = '<h1 class="client_from_list" style="color:#' + cl.color + '">' + cl.nickname + '</h1>';
				document.querySelector("#player_list").appendChild(input);
			})

			

		}


		new_server.on_user_disconnected = function( user_id ){
			var parent = document.querySelector("#player_list")
			var child = document.getElementById(user_id)
			parent.removeChild(child);
		}



		document.querySelector("#login_page_container").style.display = "none";
		document.querySelector("#game_page_container").style.display = "inline";

		//aixo esta copiat https://www.kirupa.com/canvas/follow_mouse_cursor.htm
		canvasPos = setCanvas(canvas);
	}


}





var set_createroom = document.querySelector("#set_createroom");
set_createroom.addEventListener("click", function () {
	client.room = document.querySelector("#createroom").value;
	client.nickname = document.querySelector("#nickname").value;
	j_room();
});

var join_room = document.querySelector("#join_room");
join_room.addEventListener("click", function () {
	var select_room = document.getElementById("select_room");
	client.room = select_room.options[select_room.selectedIndex].value;
	client.nickname = document.querySelector("#nickname").value;
	j_room();
});