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
	var element = document.createElement('p');

	element.innerHTML = '<b>You: </b>' + input.value;
	element.className = "my message"
	var msg = input.value;

	//To send information to all the other users connected to the same room
	//server.sendMessage(msg);

	document.querySelector("#messages").appendChild(element);

	var messages = document.querySelector('#messages');
	messages.scrollTop = messages.scrollHeight;

	input.value = "";
}


var input_message = document.querySelector('#message')
input_message - addEventListener("keypress", function (evt) {

	if (evt.keyCode == '13') {
		sendMessage();
	}
})