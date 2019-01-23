

function reciveMessage(author_id, msg) {

	var msga = JSON.parse(msg)

	if (msga[Object.keys(msga)[0]] == 'circulo') {
		draw_pointer(msga)
	}

	if (msga[Object.keys(msga)[0]] == 'mensaje') {


		var rec = document.createElement("div");
		rec.className = "incoming_msg"
		rec.innerHTML = '<div class="received_msg"><div class="received_withd_msg"><p><b style="color:' + msga.color + '">' + msga.nickname + ':</b><br>' + msga.message + '</p></div></div>';
		document.querySelector("#messages").appendChild(rec)
		var audio = document.querySelector('#myAudio');
		audio.play()

		var title = document.querySelector("title");
		title.innerHTML = "New message!"

		var messages = document.querySelector('#messages');
		messages.scrollTop = messages.scrollHeight;
	}
	if (msga[Object.keys(msga)[0]] == 'clean') {
		limpia()
	}
}



function sendMessage() {

	var input = document.querySelector("#message");
	if (input.value != '') {

		var letter = {}

		var element = document.createElement('div');
		var msg = input.value;
		element.className = "outgoing_msg"
		element.innerHTML = '<div class="sent_msg"><p><b>You:</b><br>' + msg + '</p></div>';
		document.querySelector("#messages").appendChild(element);

		var messages = document.querySelector('#messages');
		messages.scrollTop = messages.scrollHeight;

		letter.tipo = 'mensaje'
		letter.message = msg
		letter.nickname = client.nickname;
		letter.color = client.color;
		console.log(letter)
		new_server.sendMessage(JSON.stringify(letter));

		input.value = "";
	}
}


var input_message = document.querySelector('#message')
input_message.addEventListener("keypress", function (evt) {

	if (evt.keyCode == '13') {
		sendMessage();
	}
})

var send_message = document.querySelector("#send");
send_message.addEventListener("click", sendMessage);


var cuerpo = document.querySelector("html")
var title = document.querySelector("title");
cuerpo.addEventListener("mousemove", function (e) {
	if (title.innerHTML != 'New Pinturillo 2') {
		title.innerHTML = 'New Pinturillo 2'
	}
});



 function  loadClientList() {
	new_server.on_room_info = function (info) {
		document.querySelector("#room_title").textContent += decodeURI(info.name);
		info.clients.forEach(function (element) {
			
			new_server.loadData(element.toString() + "_Pinturillo", function (data) {

				var cl = JSON.parse(data)

				var input = document.createElement('p');
				input.innerHTML = '<h1 class="client_from_list">' + cl.nickname + '</h1>';
				document.querySelector("#player_list").appendChild(input);
			})
			
		});
		
	}
}
