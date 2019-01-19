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
		 var element = document.createElement("option");
		 element.innerHTML =sala;
		 element.value=sala;
		 document.querySelector("#select_room").appendChild(element);
		 }
});

//Entrar en una sala
function join_room(){
	if(client.nickname!='' && client.room!=''){
		server = new SillyClient();//Sobreescribe servidor
		server.connect("ecv-esup.s.upf.edu:9000",nombre); //Con una nueva conexion

	}
}

//this method is called when the server gives the user his ID (ready to start transmiting)
server.on_ready = function(id){
  var user_id= id;
	//aqui aniria cerrar el div

	document.querySelector("#login").style.display="none";
	document.querySelector("#room").style.display="inline";

};

*/


var set_createroom = document.querySelector("#set_createroom");
set_createroom.addEventListener("click",function(){
	client.room=document.querySelector("#createroom").value;
	client.nickname=document.querySelector("#nickname").value;
	join_room();
});

var join_room = document.querySelector("#join_room");
join_room.addEventListener("click",function(){
	var select_room = document.getElementById("select_room");
	client.room=	select_room.options[select_room.selectedIndex].value;
	client.nickname=document.querySelector("#nickname").value;
	join_room();
});
