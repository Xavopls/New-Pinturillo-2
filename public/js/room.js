function loadClientList() { //Listamos los clientes que hay dentro la sala y titulamos la pagina en el html
    new_server.on_room_info = function (info) {

        document.querySelector("#room_title").textContent += decodeURI(info.name);

        info.clients.forEach(function (element) {

            new_server.loadData(element.toString() + "_Pinturillo", function (data) { //Cada user_id lo usamos para descargar sus datos del servidor
                printClientList(data, true) //Montamos el cliente para el html
            })
        });
    }
}

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

