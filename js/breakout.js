//canvas setup
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;

//set start point
var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

//draw ball
function drawBall() {
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBall();
	x += dx;
	y += dy;
	
	if(y + dy > canvas.height-ballRadius || y+dy < 0) {
		dy = -dy;
	}
	
	if(x + dx > canvas.width-ballRadius || x+dx < 0) {
		dx = -dx;
	}
}

//calls draw function every 10ms
setInterval(draw,10);

