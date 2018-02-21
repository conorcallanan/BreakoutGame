//canvas setup
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//set start point
var x = canvas.width/2;
var y = canvas.height-30;

//draw ball
function draw() {
	ctx.beginPath();
	ctx.arc(x,y,10,0,Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
	
}

//calls draw function every 10ms
setInterval(draw,10);