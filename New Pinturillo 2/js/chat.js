function reciveMessage(author_id, msg) {
	var message = JSON.parse(msg)

	//Siempre nos fijamos en los mensajes que son JSONs. Miramos su primer parametro "tipo" para tomar una decision
	if (message[Object.keys(message)[0]] == 'circulo') { //Si es un circulo, grabamos el circulo en el canvas
		draw_pointer(message)
	}

	if (message[Object.keys(message)[0]] == 'mensaje') { //Si es un mensaje lo representamos en el chat
		var rec = document.createElement("div");
		rec.className = "incoming_msg"
		rec.innerHTML = '<div class="received_msg"><div class="received_withd_msg"><p><b style="color:#' + message.color + '">' + message.nickname + ':</b><br>' + message.message + '</p></div></div>';
		document.querySelector("#messages").appendChild(rec)
		var audio = document.querySelector('#myAudio');

		//Detalles fancy del chat
		audio.play()
		var title = document.querySelector("title");
		title.innerHTML = "New message!"

		var messages = document.querySelector('#messages');
		messages.scrollTop = messages.scrollHeight; //Fuerza scroll del chat a estar siempre "bajado"
	}

	if (message[Object.keys(message)[0]] == 'clean') { //Si es un "clean" limpiamos el canvas
		limpia()
	}
}

function sendMessage() {
	var input = document.querySelector("#message");
	if (input.value != '') { //No podemos enviar mensajes vacios

		var message = {}
		var message_text = input.value;

		//Montamos parte visual
		var element = document.createElement('div');
		element.className = "outgoing_msg"
		element.innerHTML = '<div class="sent_msg"><p><b>You:</b><br>' + message_text + '</p></div>';
		document.querySelector("#messages").appendChild(element);

		//Detalles fancy del chat
		var messages = document.querySelector('#messages');
		messages.scrollTop = messages.scrollHeight; //Fuerza scroll del chat a estar siempre "bajado"

		//Montamos el JSON que enviaremos a traves del servidor con "new_server.sendMessage()"
		message.tipo = 'mensaje'
		message.message = message_text
		message.nickname = client.nickname;
		message.color = client.color;

		new_server.sendMessage(JSON.stringify(message));

		//Detalles fancy del chat
		input.value = "";
	}
}

function loadClientList() { //Listamos los clientes que hay dentro la sala y titulamos la pagina en el html
	new_server.on_room_info = function (info) {

		document.querySelector("#room_title").textContent += decodeURI(info.name);

		info.clients.forEach(function (element) {

			new_server.loadData(element.toString() + "_Pinturillo", function (data) { //Cada user_id lo usamos para descargar sus datos del servidor
				printClientList(data) //Montamos el cliente para el html
			})
		});
	}
}

function printClientList(data) { //Montamos el cliente para el html
	var user_connected = JSON.parse(data)

	var element = document.createElement('p');
	element.id = user_connected.user_id;
	element.className = 'conectados'
	element.innerHTML = '<h1 class="client_from_list" style="color:#' + user_connected.color + '">' + '<span style="color:#00ff21">● </span>' + user_connected.nickname + '</h1>';
	document.querySelector("#player_list").appendChild(element);
}

//Escucha de tecla de "Enter" en input de "message"
var input_message = document.querySelector('#message')
input_message.addEventListener("keypress", function (evt) {
	if (evt.keyCode == '13') {
		sendMessage();
	}
})

//Escucha de boton Send
var send_message = document.querySelector("#send");
send_message.addEventListener("click", sendMessage);

//Escucha de presencia del "mouse" en la pagina para cambiar titulo de la pagina 
var cuerpo = document.querySelector("html")
var title = document.querySelector("title");
cuerpo.addEventListener("mousemove", function (e) {
	if (title.innerHTML != 'New Pinturillo 2') { //En el caso que el el titulo sea "New message!" cambiamos de nuevo
		title.innerHTML = 'New Pinturillo 2'
	}
});