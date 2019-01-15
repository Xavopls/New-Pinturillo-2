
/*
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
ctx.clearRect(0,0,canvas.width, canvas.height);


function Circle(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
}

Circle.prototype.addRadius = function(extraRadius){
    this.radius += extraRadius;
};


Circle.prototype.showStats = function(){
    console.log('X position: ', this.x , '\n Y position:', this.y, '\n Radius: ', this.radius);
};

Circle.prototype.draw = function(ctx){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius,0,Math.PI * 2);
    ctx.fill();
};

Circle.prototype.crazyCircle = function(){
    for(var i = 0; i<200; i++){
        ctx.arc(this.x+= i, this.y+= i, this.radius+= i,0,Math.PI * 2);
        ctx.fill();
    }
};

var smallCircle = new Circle(100, 100, 30);
smallCircle.showStats();
smallCircle.draw(ctx);



var button = document.querySelector('button');
button.addEventListener( "click", console.log('ezejuekt') );


*/