

var color='black';
var size=5;
var circle;

function Circle (x,y){
	this.x=x
	this.y=y
	this.r=4
	this.color=color
}

function createCircle(body,e){
  this.x=e.clientX
  this.y=e.clientY
	this.size=size
  this.color=color
	myCirclearray.push(circle);
}


function drawFrame(){
	var canvas = document.querySelector("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,canvas.width, canvas.height);

	for(var circle of myCirclearray){ //OJU, IMPORTANT! Si es posa "in" pilla lindex, si es posa "of" pilla lobjecte
		circle.draw(ctx);
	}

	requestAnimationFrame(drawFrame); //Per demanarli al Chrome que requereixi aquesta funcio per cada refresh. La funcio es passa sense els ()
}

//Seleccion de colores
var colors = document.querySelector("#colors");
colors.addEventListener("click", setColors);

function setColors(e) {
    if (e.target !== e.currentTarget) {
        color = e.target.id;
    }
}

//Seleccion de tamano
var slider = document.getElementById("slider");
slider.oninput = function() {
  size = this.value;
}


var canvas =document.querySelector("canvas");
	canvas.addEventListener("mousemove",function(evt){
	createCircle(canvas,event);
});

drawFrame();
