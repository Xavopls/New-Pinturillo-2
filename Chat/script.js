var server = new SillyClient(); //create our class
server.connect("ecv-esup.s.upf.edu:9000","");


server.getReport( function(report) { 
	 for(sala in report.rooms){
		 var element = document.createElement("div");
		 element.innerHTML =sala;
		 document.querySelector("#list_rooms").appendChild(element);
		 
	}
	
});



var createroom = document.querySelector("#createroom");
var set_createroom = document.querySelector("#set_createroom");

function new_room(){
	server = new SillyClient(); //create our class
	server.connect("ecv-esup.s.upf.edu:9000",createroom.value);
	
}

button.addEventListener("click",sendMessage);



//this method is called when the server accepts the connection (no ID yet nor info about the room)
server.on_connect = function(){
  console.log("Connected to server! :)");  
};

//this method is called when the server gives the user his ID (ready to start transmiting)
server.on_ready = function(id){
  console.log(id)
};


//this methods receives messages from other users (author_id is an unique identifier per user)
server.on_message = function( author_id, msg ){
 	var rec =document.createElement("div");
 	rec.className="msg rec"
 	rec.innerHTML =msg;
 	document.querySelector("#chat").appendChild(rec)
	
	console.log("Nuevo mensage de"+author_id+": "+msg);
}



function sendMessage(){
	var element = document.createElement("div");
	element.innerHTML =input.value;
	element.className="msg me"
	var msg=input.value;

	//To send information to all the other users connected to the same room
	server.sendMessage(msg);

	document.querySelector("#chat").appendChild(element);
	input.value="";

}

function set_nick(){
	var nickname = document.querySelector("#nickname");
	return nickname.value;
}


var set_nickname = document.querySelector("#set_nickname");
set_nickname.addEventListener("click",set_nick);


var input = document.querySelector("input");
var button = document.querySelector("#send");

button.addEventListener("click",sendMessage);




