var client= []
client.nickname = '';
client.room='';
client.user_id='';
/*
var server = new SillyClient(); //Crea instancia de servidor
server.connect("ecv-esup.s.upf.edu:9000",""); //Primera conexion en blanco a servidor

//Listado de las salas
server.getReport( function(report) {
	 for(sala in report.rooms){
		 var element = document.createElement("div");
		 element.innerHTML =sala;
		 document.querySelector("#list_rooms").appendChild(element);
		 }
});

//Entrar en una sala
function entrar_room(){
	if(client.nickname!='' && client.room!='')
	server = new SillyClient();//Sobreescribe servidor
	server.connect("ecv-esup.s.upf.edu:9000",nombre); //Con una nueva conexion
}


//this method is called when the server accepts the connection (no ID yet nor info about the room)
server.on_connect = function(){
  console.log("Connected to server! :)");

};

//this method is called when the server gives the user his ID (ready to start transmiting)
server.on_ready = function(id){
  var user_id= id;
	//aqui aniria cerrar el div

	document.querySelector("#login").style.display="none";
	document.querySelector("#login").style.display="inline";
};


//this methods receives messages from other users (author_id is an unique identifier per user)
server.on_message = function( author_id, msg ){
 	var rec =document.createElement("div");
 	rec.className="msg rec"
 	rec.innerHTML =msg;
 	document.querySelector("#chat").appendChild(rec)

	console.log("Nuevo mensage de"+author_id+": "+msg);
}
*/


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


var set_nickname = document.querySelector("#set_nickname");
set_nickname.addEventListener("click",function(){
	client.nickname=document.querySelector("#nickname").value;
});

var set_createroom = document.querySelector("#set_createroom");
set_createroom.addEventListener("click",function(){
	client.room=document.querySelector("#createroom").value;
	entrar_room();
});


var input = document.querySelector("input");
var button = document.querySelector("#send");

button.addEventListener("click",sendMessage);
