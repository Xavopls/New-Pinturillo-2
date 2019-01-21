var client = []
client.nickname = '';
client.room = '';
client.user_id = '';

var new_server;

var url="ecv-esup.s.upf.edu:9000"
//ecv-esup.s.upf.edu:9000

var server = new SillyClient(); //Crea instancia de servidor
server.connect(url,""); //Primera conexion en blanco a servidor

//Listado de las salas
server.getReport( function(report) {
	 for(sala in report.rooms){
		 var sa=decodeURI(sala)
		 if(sa!=""){
		 var element = document.createElement("option");
		 element.innerHTML =sa;
		 element.value=sa;
		 document.querySelector("#select_room").appendChild(element);
		 }
	}
});

//Entrar en una sala
function j_room(){
	if(client.nickname!='' && client.room!=''){
		
		new_server = new SillyClient()
		new_server.connect(url,client.room);

		new_server.on_message = function( author_id, msg ){
			reciveMessage(author_id, msg);
				
			}

		document.querySelector("#login_page_container").style.display="none";
		document.querySelector("#game_page_container").style.display="inline";
	}
}





var set_createroom = document.querySelector("#set_createroom");
set_createroom.addEventListener("click", function () {
	client.room = document.querySelector("#createroom").value;
	client.nickname = document.querySelector("#nickname").value;
	j_room();
});

var join_room = document.querySelector("#join_room");
join_room.addEventListener("click", function () {
	var select_room = document.getElementById("select_room");
	client.room = select_room.options[select_room.selectedIndex].value;
	client.nickname = document.querySelector("#nickname").value;
	j_room();
});
