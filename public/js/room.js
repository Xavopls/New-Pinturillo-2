
// LIST USERS IN THE SAME ROOM

function show_user_list(){
    client.show_user_list(on_user_list_shown);    
}

function on_user_list_shown(msg){
    var data = JSON.parse(msg.data);
    if (data.msg_type === 'list_users'){
        switch(data.status){
            case 'OK':
                var player_list = document.querySelector("#player_list");
                while (player_list.lastChild){
                    player_list.removeChild(player_list.lastChild);
                }
                var p = document.createElement('p');
                for (var i = 0; i<data.user_list.length; i++){
                    var h1 = document.createElement('h1');
                    h1.className = 'client_from_list';
                    h1.innerHTML = '<span>● </span>' + data.user_list[i];
                    p.appendChild(h1);
                    player_list.appendChild(p);
                }

                console.log('USER LIST:', data.user_list);
                break;

            case 'ERROR':
                console.log('ERROR');
                break;
        }
    }

}




/*function loadClientList() { //Listamos los clientes que hay dentro la sala y titulamos la pagina en el html
    new_server.on_room_info = function (info) {

        document.querySelector("#room_title").textContent += decodeURI(info.name);

        info.clients.forEach(function (element) {

            new_server.loadData(element.toString() + "_Pinturillo", function (data) { //Cada user_id lo usamos para descargar sus datos del servidor
                printClientList(data, true) //Montamos el cliente para el html
            })
        });
    }
}
*/




/*
function printClientList(data, status) { //Montamos el cliente para el html
    var user_connected = JSON.parse(data);
    var status_color;
    var p = document.createElement('p');
    var h1 = document.createElement('h1');

    h1.className = 'client_from_list';
    h1.style.color = '#' + user_connected.color;
    if (status == true) {
        status_color = '#00ff21';
    }

    if (status == false) {
        status_color = '#ff7800';
    }
    h1.innerHTML = '<span style="color:' + status_color + '">● </span>' + user_connected.nickname;

    p.id = user_connected.user_id;
    p.className = 'conectados';
    p.appendChild(h1);

    document.querySelector("#player_list").appendChild(p);
}



//Escucha de presencia del "mouse" en la pagina para cambiar titulo de la pagina
var cuerpo = document.querySelector("html");

cuerpo.addEventListener("mousemove", function (e) {
    var title = document.querySelector("title");
    var favicon = document.querySelector("#favicon");
    if (title.innerHTML != 'New Pinturillo 2') { //En el caso que el el titulo sea "New message!" cambiamos de nuevo
        title.innerHTML = 'New Pinturillo 2';
        favicon.href = "./assets/img/favicon_normal.png";
    }
});

document.addEventListener('visibilitychange', function (e) {
    var clean = {};
    if (document.hidden == true) {
        clean.tipo = 'ausente';
        new_server.sendMessage(JSON.stringify(clean))
    }
    if (document.hidden == false) {
        clean.tipo = 'online';
        new_server.sendMessage(JSON.stringify(clean));
    }
});

*/