// Put your JavaScript here
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

let ballRadius = 15;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let score = 0;
let Lives = 1;
//set up 2d array 4 bricks
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, show: true };
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#9775DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].show == true) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillstyle = "#9999DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    //clearing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw the bricks
    drawBricks();

    //drawing the ball
    drawBall();

    //change the x and y os for the ball
    x += dx;
    y += dy;

    //check to see if we've gone off the edge
    if (x > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (y + dy < ballRadius) { //ceiling chec
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {//floor chec
        if (x > paddleX && x < paddleX + paddleWidth) { //paddlehit
            dy = -dy;
        } else { // it hits the floor!!1!
            alert("GAME OVER LMAO LOSER");
            document.location.reload();
            clearInterval(interval); //needed 4 browser to end game
            Lives--;
        }
    }

    //paddle controls
    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    drawPaddle();

    //check wether the ball is touhcing bricks
    collisionDetection();

    //This will show what the user's score is
    drawScore();

    drawLives();

}

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.show == true) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.show = false;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YA WON, GIT OUT NOW");
                        document.location.reload();
                        clearInterval(interval); //req. for browser to end the game
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Roboto";
    ctx.fillstyle = "#7851DD";
    ctx.fillText("Score:" + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Roboto";
    ctx.fillstyle = "#7851DD";
    ctx.fillText("Lives:" + lives, 8, 30);
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

document.addEventListener("mousemove", mouseMoveHandler, false);

let interval = setInterval(draw, 10);