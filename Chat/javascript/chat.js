function sendMessage(){
	var element = document.createElement("div");
	element.innerHTML =input.value;
	element.className="msg me"
	var msg=input.value;

	//To send information to all the other users connected to the same room
	server.sendMessage(msg);

	document.querySelector("#messages").appendChild(element);
	input.value="";

}



var input = document.querySelector("input");
var button = document.querySelector("#send");

button.addEventListener("click",sendMessage);
