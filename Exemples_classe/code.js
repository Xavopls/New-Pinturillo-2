/*EXEMPLE 1////////////////////////////////////////////////////////
Creacio de "for", mathrandom, missatges de consola
///////////////////////////////////////////////////////////////////

var myarray = []

for(var i=0;i<10;i++){
myarray[i]=Math.random()*10;

}

console.log("Primer resultat");
console.log(myarray);



for(i in myarray){ //OJU, IMPORTANT! Si es posa "in" pilla lindex, si es posa "of" pilla lobjecte
	myarray[i]=Math.random()*10
}

console.log("Segon resultat");
console.log(myarray);
*/

/*EXEMPLE 2////////////////////////////////////////////////////////
Quadrats del Barca que es mouen
///////////////////////////////////////////////////////////////////

var t =0;

function drawFrame(){
	var canvas = document.querySelector("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,canvas.width, canvas.height);
	
	


	for(var i=0; i<100;i++){
		
		for(var j=0; j<100;j++){
			ctx.fillStyle =i % 2 ? "blue":"red";
			ctx.fillRect(60+i*20 +Math.sin(t+j*0.8)*50,50+20*j, 10, 10)
		}
		
	}

	t+=0.01;
	requestAnimationFrame(drawFrame); //Per demanarli al Chrome que requereixi aquesta funcio per cada refresh. La funcio es passa sense els ()
}
drawFrame();
*/

//EXEMPLE 3////////////////////////////////////////////////////////
//Classes, protoype, botons i draw
///////////////////////////////////////////////////////////////////

var myCirclearray = []

function Circle (){	
	this.x=(Math.random() * 300) + 1
	this.y=(Math.random() * 300) + 1
	this.r=(Math.random() * 20) + 1
	this.color='rgb('+(Math.random()*255)+','+(Math.random()*255)+','+(Math.random()*255)+')'
}

Circle.prototype.draw = function(ctx){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
	ctx.fill();
}

function createCircle(){
	var circle=new Circle();
	myCirclearray.push(circle)
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
drawFrame();

var button=document.querySelector("button");
button.addEventListener("click",createCircle);


/*EXEMPLE 4////////////////////////////////////////////////////////
Copia de la pissarra de com va fer els missatges. No esta implementat en el html
///////////////////////////////////////////////////////////////////

var input = document.querySelector("input");
var button = documet.querySelector("button");

button.add.EventLisener("click,sendMessage");


function sendMessage(){
	var element = document.createElement("div");
	element.innerHTML =input.value;
	eleemnt.className="msg me"
	messages_container.appenChild(element);
	input.value="";
}

*/

/*ALTRES///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/*performance.now() temps desde que l'usuari ha obert la pagina*/


