/*
server.on_message = function( author_id, msg ){


	var rec =document.createElement("div");
 	rec.className="msg rec"
 	rec.innerHTML =msg;
 	document.querySelector("#chat").appendChild(rec)

	var audio = document.querySelector('#myAudio');
	audio.play()

	console.log("Nuevo mensage de"+author_id+": "+msg);
}
*/


function sendMessage() {
	
		var input = document.querySelector("#message");
	if (input.value != '') {
		var element = document.createElement('div');

		element.className = "outgoing_msg"

		element.innerHTML = '<div class="sent_msg"><p>' + input.value + "</p></div>";

		var msg = input.value;

		//To send information to all the other users connected to the same room
		//server.sendMessage(msg);

		document.querySelector("#messages").appendChild(element);

		var messages = document.querySelector('#messages');
		messages.scrollTop = messages.scrollHeight;
		var audio = document.querySelector('#myAudio');
		audio.play();
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