function reciveMessage(author_id, msg) {
	var message = JSON.parse(msg)

	//Siempre nos fijamos en los mensajes que son JSONs. Miramos su primer parametro "tipo" para tomar una decision
	if (message[Object.keys(message)[0]] == 'circulo') { //Si es un circulo, grabamos el circulo en el canvas
		draw_pointer(message)
	}

	if (message[Object.keys(message)[0]] == 'mensaje') { //Si es un mensaje lo representamos en el chat

		var div1 = document.createElement("div")
		var div2 = document.createElement("div")
		var p = document.createElement("p")

		p.innerHTML = '<b style="color:#' + message.color + '">' + message.nickname + ':</b><br>' + message.message

		div1.className = "received_msg"
		div1.appendChild(p)

		div2.className = "received_withd_msg"
		div2.appendChild(div1)
		document.querySelector("#messages").appendChild(div2)

		//Detalles fancy del chat
		var audio = document.querySelector('#myAudio');
		audio.play()
		var title = document.querySelector("title");
		title.innerHTML = "New message!"
		var favicon = document.querySelector("#favicon")
		favicon.href = "./assets/img/favicon_blink.png"

		var messages = document.querySelector('#messages');
		messages.scrollTop = messages.scrollHeight; //Fuerza scroll del chat a estar siempre "bajado"
	}

	if (message[Object.keys(message)[0]] == 'clean') { //Si es un "clean" limpiamos el canvas

	}

	if (message[Object.keys(message)[0]] == 'online') {
		var parent = document.querySelector("#player_list")
		var child = document.getElementById(author_id)
		parent.removeChild(child);
		new_server.loadData((author_id + "_Pinturillo"), function (data) {
			printClientList(data, true)
		})

	}
	if (message[Object.keys(message)[0]] == 'ausente') {
		var parent = document.querySelector("#player_list")
		var child = document.getElementById(author_id)
		parent.removeChild(child);
		new_server.loadData((author_id + "_Pinturillo"), function (data) {
			printClientList(data, false)
		})
	}
}

function sendMessage() {
	var input = document.querySelector("#message");
	if (input.value != '') { //No podemos enviar mensajes vacios

		var message = {}
		var message_text = input.value;

		//Montamos parte visual
		var div1 = document.createElement('div');
		var div2 = document.createElement('div');
		var p = document.createElement('p');

		p.innerHTML = '<b>You:</b><br>' + message_text

		div1.className = "sent_msg"
		div1.appendChild(p)

		div2.className = "outgoing_msg"
		div2.appendChild(div1)

		document.querySelector("#messages").appendChild(div2);

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
				printClientList(data, true) //Montamos el cliente para el html
			})
		});
	}
}

function printClientList(data, status) { //Montamos el cliente para el html
	var user_connected = JSON.parse(data)
	var status_color;
	var p = document.createElement('p');
	var h1 = document.createElement('h1');

	h1.className = 'client_from_list'
	h1.style.color = '#' + user_connected.color
	if (status == true) {
		status_color = '#00ff21'
	}

	if (status == false) {
		status_color = '#ff7800'
	}
	h1.innerHTML = '<span style="color:' + status_color + '">● </span>' + user_connected.nickname

	p.id = user_connected.user_id
	p.className = 'conectados'
	p.appendChild(h1)

	document.querySelector("#player_list").appendChild(p);
}

//Escucha de tecla de "Enter" en input de "message"
var input_message = document.querySelector('#message')
input_message.addEventListener("keypress", function (e) {
	if (e.keyCode == '13') {
		sendMessage();
	}
})

//Escucha de boton Send
var send_message = document.querySelector("#send");
send_message.addEventListener("click", sendMessage);

//Escucha de presencia del "mouse" en la pagina para cambiar titulo de la pagina 
var cuerpo = document.querySelector("html")

cuerpo.addEventListener("mousemove", function (e) {
	var title = document.querySelector("title");
	var favicon = document.querySelector("#favicon")
	if (title.innerHTML != 'New Pinturillo 2') { //En el caso que el el titulo sea "New message!" cambiamos de nuevo
		title.innerHTML = 'New Pinturillo 2'
		favicon.href = "./assets/img/favicon_normal.png"
	}
});

document.addEventListener('visibilitychange', function (e) {
	if (document.hidden == true) {
		var clean = {
			tipo: 'ausente',
		};
		new_server.sendMessage(JSON.stringify(clean))
	}
	if (document.hidden == false) {
		var clean = {
			tipo: 'online',
		};
		new_server.sendMessage(JSON.stringify(clean))
	}
});