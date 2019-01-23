var my_circle = {
	tipo: 'circulo',
	color: 'black',
	size: '8',
	positionX: '',
	positionY: '',
};

var clic = 0;

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var background = new Image();
background.src = "./assets/img/canvas_background.PNG";



function draw_pointer(todraw) {

	ctx.beginPath();
	ctx.arc(todraw.positionX, todraw.positionY, todraw.size, 0, 2 * Math.PI, true);
	ctx.fillStyle = todraw.color;
	ctx.fill();
}

function drawFrame() {



	if (clic == 1) {
		draw_pointer(my_circle)
		new_server.sendMessage(JSON.stringify(my_circle));
	}



	requestAnimationFrame(drawFrame); //Per demanarli al Chrome que requereixi aquesta funcio per cada refresh. La funcio es passa sense els ()
}
drawFrame();


//Seleccion de colores
var colors = document.querySelector("#colors");
colors.addEventListener("click", setColors);

function setColors(e) {
	my_circle.color = '#' + e.target.id;
}

//Seleccion de tamano
var slider = document.getElementById("slider");
slider.oninput = function () {
	my_circle.size = this.value;
}



//aixo esta copiat https://www.kirupa.com/canvas/follow_mouse_cursor.htm
function setCanvas(el) {
	var xPosition = 0;
	var yPosition = 0;
	ctx.drawImage(background, 0, 0);
	while (el) {
		xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
		yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
		el = el.offsetParent;
	}
	return {
		x: xPosition,
		y: yPosition
	};
}

function limpia() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(background, 0, 0);
}

canvas.addEventListener("mousemove", function (e) {
	my_circle.positionX = e.clientX - canvasPos.x;
	my_circle.positionY = e.clientY - canvasPos.y;
});

canvas.addEventListener("mousedown", function (e) {
	++clic;
});
canvas.addEventListener("mouseup", function (e) {
	--clic;
});

var set_clean = document.querySelector("#clean");
set_clean.addEventListener("click", function () {
	limpia()
	var clean={tipo: 'clean',};
	new_server.sendMessage(JSON.stringify(clean))
});



function loadClientList() {
		new_server.on_room_info = function(info){
		document.querySelector("#room_title").textContent += info.name;
			info.clients.forEach(function(element) {
				new_server.loadData(element.toString() + "_Pinturillo", function (data) {
					data+='-"}';
					var input = document.createElement('p');
					input.innerHTML = '<h1 class="client_from_list">'+JSON.parse(data).nickname+'</h1>';
					document.querySelector("#player_list").appendChild(input);
				})
		});
		}
}

