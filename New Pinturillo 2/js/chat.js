


function reciveMessage(author_id, msg){
	var rec =document.createElement("div");
	rec.className="incoming_msg"
	rec.innerHTML ='<div class="received_msg"><div class="received_withd_msg"><p>'+msg+'</p></div></div>';
	document.querySelector("#messages").appendChild(rec)
	var audio = document.querySelector('#myAudio');
	audio.play()

	var title = document.querySelector("title");
	title.innerHTML="New message!"

	var messages = document.querySelector('#messages');
	messages.scrollTop = messages.scrollHeight;
}



function sendMessage() {
	
		var input = document.querySelector("#message");
	if (input.value != '') {
		var element = document.createElement('div');
		var msg = input.value;
		element.className = "outgoing_msg"
		element.innerHTML = '<div class="sent_msg"><p>' + msg + "</p></div>";
		document.querySelector("#messages").appendChild(element);

		var messages = document.querySelector('#messages');
		messages.scrollTop = messages.scrollHeight;

		new_server.sendMessage(msg);
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


