//canvas setup
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;

//paddle vars
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

//bricks setup
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//set start point
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballColour = "#0095DD";

var rightPressed = false;
var leftPressed = false;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++) {
		bricks[c][r] = { x:0, y:0, status:1};
	}
}

var score = 0;
var lives = 3;

//sounds
var winningSound = new Audio('sounds/woohoo.wav');
var scoreSound = new Audio('sounds/success.wav');
var gameOverSound = new Audio('sounds/gameover.wav');

//draw ball
function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = ballColour;
	ctx.fill();
	ctx.closePath();
}

//draw paddle
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

//draw bricks
function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath;
			}
		}
	}
}

function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetect();
	drawBricks();
	x += dx;
	y += dy;
	
	//making ball bounce
	if(x + dx > canvas.width-ballRadius || x+dx < ballRadius) {
		dx = -dx;
	}
	
	if(y + dy < ballRadius) {
		dy = -dy;
	} else if(y + dy > canvas.height-ballRadius) {
		
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		}
		//decrease lives
				else {
					lives--;
					if(!lives) {
					gameOverSound.play();
					alert("Game Over");
					document.location.reload();
				}
				else {
					x = canvas.width/2;
					y = canvas.height-30;
					dx = 2;
					dy = -2;
					paddleX = (canvas.width-paddleWidth)/2;
				}
			}
		}	
		if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 4;
		}
		else if(leftPressed && paddleX > 0) {
		paddleX -= 4;
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}

function collisionDetect() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var b = bricks[c][r];
			if (b.status == 1) {
				if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight) {
					dy = -dy;
					b.status = 0;
					score+=10;
					scoreSound.play();
					if(score == brickRowCount*brickColumnCount*10) {
						winningSound.play();
						alert("You Win! Congratulations!");
						document.location.reload();
					}
				}
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Ariel";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
	document.getElementById("gamescore").innerHTML = "Score: " + score;
}

function drawLives() {
	ctx.font = "16px Ariel";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
	document.getElementById("gamelives").innerHTML = "Lives: "+lives;
}

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth/2;
	}
}

//calls draw function every 10ms
setInterval(draw,20);

