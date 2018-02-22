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
	ctx.clearRect(0,0,480,320);
	drawBall();
	x += dx;
	y += dy;
	
	//making ball bounce and change colour
	if(y + dy >= 320 || y+dy <= 0) {
		dy = -dy;
		ctx.fillStyle ="red";
		ctx.fill();
	}
	
	if(x + dx == 470 || x+dx <= ballRadius) {
		dx = -dx;
		ctx.fillStyle = "red";
		ctx.fill();
	}
}

//calls draw function every 10ms
setInterval(draw,50);

