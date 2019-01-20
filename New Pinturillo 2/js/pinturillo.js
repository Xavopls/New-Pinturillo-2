var color='black';
var size=8;
var positionX;
var positionY;


var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var background = new Image();
background.src = "./assets/img/canvas_background.PNG";


function draw_pointer(){
	ctx.drawImage(background,0,0)
	ctx.beginPath();
  ctx.arc(positionX, positionY, size, 0, 2 * Math.PI, true);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawFrame(){
	ctx.clearRect(0,0,canvas.width, canvas.height);
	draw_pointer()
	requestAnimationFrame(drawFrame); //Per demanarli al Chrome que requereixi aquesta funcio per cada refresh. La funcio es passa sense els ()
}
drawFrame();


//Seleccion de colores
var colors = document.querySelector("#colors");
colors.addEventListener("click", setColors);

function setColors(e) {
  color = e.target.id;
}

//Seleccion de tamano
var slider = document.getElementById("slider");
slider.oninput = function() {
  size = this.value;
}

//aixo esta copiat https://www.kirupa.com/canvas/follow_mouse_cursor.htm
var canvasPos = getPosition(canvas);

//aixo esta copiat https://www.kirupa.com/canvas/follow_mouse_cursor.htm
function getPosition(el) {
  var xPosition = 0;
  var yPosition = 0;
 
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

var canvas_pos =document.querySelector("canvas");
	canvas.addEventListener("mousemove",function(e){
		positionX = e.clientX-canvasPos.x;
		positionY = e.clientY-canvasPos.y;
});

   

