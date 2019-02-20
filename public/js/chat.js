
/*
function recieveMessage(author_id, msg) {
	var message = JSON.parse(msg);

	//Siempre nos fijamos en los mensajes que son JSONs. Miramos su primer parametro "tipo" para tomar una decision
	if (message[Object.keys(message)[0]] == 'circulo') { //Si es un circulo, grabamos el circulo en el canvas
		draw_pointer(message)
	}

	if (message[Object.keys(message)[0]] == 'mensaje') { //Si es un mensaje lo representamos en el chat
	if (message[Object.keys(message)[0]] == 'mensaje') { //Si es un mensaje lo representamos en el chat

		var div1 = document.createElement("div");
		var div2 = document.createElement("div");
		var p = document.createElement("p");

		p.innerHTML = '<b style="color:#' + message.color + '">' + message.nickname + ':</b><br>' + message.message;

		div1.className = "received_msg";
		div1.appendChild(p);

		div2.className = "received_withd_msg";
		div2.appendChild(div1);
		document.querySelector("#messages").appendChild(div2);

		//Detalles fancy del chat
		var audio = document.querySelector('#myAudio');
		audio.play();
		var title = document.querySelector("title");
		title.innerHTML = "New message!";
		var favicon = document.querySelector("#favicon");
		favicon.href = "./assets/img/favicon_blink.png";

		var messages = document.querySelector('#messages');
		messages.scrollTop = messages.scrollHeight; //Fuerza scroll del chat a estar siempre "bajado"
	}

	if (message[Object.keys(message)[0]] == 'clean') { //Si es un "clean" limpiamos el canvas

	}

	if (message[Object.keys(message)[0]] == 'online') {
		var parent = document.querySelector("#player_list");
		var child = document.getElementById(author_id);
		parent.removeChild(child);
		new_server.loadData((author_id + "_Pinturillo"), function (data) {
			printClientList(data, true)
		})

	}
	if (message[Object.keys(message)[0]] == 'ausente') {
		var parent = document.querySelector("#player_list");
		var child = document.getElementById(author_id);
		parent.removeChild(child);
		new_server.loadData((author_id + "_Pinturillo"), function (data) {
			printClientList(data, false)
		})
	}
}

}
*/

//Escucha de tecla de "Enter" en input de "message"
var input_message = document.querySelector('#message');
input_message.addEventListener("keypress", function (e) {
	if (e.keyCode == '13') {
		sendChatMessage();
	}
});


//Escucha de boton Send
var send_button = document.querySelector("#send");
send_button.addEventListener("click", sendChatMessage);


function sendChatMessage(){
	var input = document.querySelector("#message");
	if (input.value != '') { //No podemos enviar mensajes vacios
		var message_text = input.value;

		var message = {};


		//Montamos parte visual
		var div1 = document.createElement('div');
		var div2 = document.createElement('div');
		var p = document.createElement('p');

		p.innerHTML = '<b>You:</b><br>' + message_text;

		div1.className = "sent_msg";
		div1.appendChild(p);

		div2.className = "outgoing_msg";
		div2.appendChild(div1);

		document.querySelector("#messages").appendChild(div2);

		//Detalles fancy del chat
		var messages = document.querySelector('#messages');
		messages.scrollTop = messages.scrollHeight; //Fuerza scroll del chat a estar siempre "bajado"

		//Montamos el JSON que enviaremos a traves del servidor con "new_server.sendMessage()"
		message.tipo = 'mensaje';
		message.message = message_text;
		message.nickname = client.nickname;
		message.color = client.color;

		//Detalles fancy del chat
		input.value = "";

		client.send_message(message_text, on_message_sent);

	}
}

function on_message_sent(msg) {
	var data = JSON.parse(msg.data);

	switch (data.status) {
		case 'OK':
		break;
	}
}


function receiveMessage(msg) {
	var data = JSON.parse(msg.data);

	var div1 = document.createElement("div");
	var div2 = document.createElement("div");
	var p = document.createElement("p");
	var nickname = data.content[data.content.length-1][0]
	var message_received = data.content[data.content.length-1][1]
	p.innerHTML = '<b' + '>' + nickname + ':</b><br>' + message_received;

	div1.className = "received_msg";
	div1.appendChild(p);

	div2.className = "received_withd_msg";
	div2.appendChild(div1);
	document.querySelector("#messages").appendChild(div2);

	//Detalles fancy del chat
	var audio = document.querySelector('#myAudio');
	audio.play();
	var title = document.querySelector("title");
	title.innerHTML = "New message!";
	var favicon = document.querySelector("#favicon");
	favicon.href = "./assets/img/favicon_blink.png";

	var messages = document.querySelector('#messages');
	messages.scrollTop = messages.scrollHeight; //Fuerza scroll del chat a estar siempre "bajado"
}
