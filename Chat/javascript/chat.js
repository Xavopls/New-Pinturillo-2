

/*
server.on_message = function( author_id, msg ){


	var rec =document.createElement("div");
 	rec.className="msg rec"
 	rec.innerHTML =msg;
 	document.querySelector("#chat").appendChild(rec)

	console.log("Nuevo mensage de"+author_id+": "+msg);
}
*/


function sendMessage(){

	var input = document.querySelector("#message");
	var element = document.createElement("div");

	element.innerHTML =input.value;
	element.className="my message"
	var msg=input.value;

	//To send information to all the other users connected to the same room
	//server.sendMessage(msg);

	document.querySelector("#my_messages").appendChild(element);
	input.value="";

}

document.keypress(function(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        sendMessage
    }
});


var send_message = document.querySelector("#send");

send_message.addEventListener("click",sendMessage);
