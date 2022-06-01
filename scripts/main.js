let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let a = canvas.width / 2;
let b = canvas.height - 30;

let dx = 3;
let dy = -3;
let da = 3;
let db = -3;

let ballRadius = 10;

let paddleHeight = 8;
let paddleWidth = 90;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let score = 0;

function drawBall1() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#7dc4ff";
    ctx.fill();
    ctx.closePath();
}

function drawBall2() {
    ctx.beginPath();
    ctx.arc(a, b, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#f08991";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the ball
    drawBall1();

    // draw the second ball
    drawBall2();

    // changes x and y values
    a += da;
    b += db;

    // check to see if you have hit the edge
    if (a + da > canvas.width - ballRadius || a + da < ballRadius) {
        da = -da;
    }
    if (b + db < ballRadius) {  // ceiling check
        db = -db;
    } else if (b + db > canvas.height - ballRadius) {  // floor check
        if (a > paddleX && a < paddleX + paddleWidth) {  // paddle check
            db = -db;
            score += 1;
            ballRadius -= 1.2;
        }
        else {  // it hit the floor!
            alert("Game Over! " + "Score: " + score);
            document.location.reload();
            clearInterval(interval);  // needed for the browser to end the game
        }
    }

    // changes x and y values
    x += dx;
    y += dy;

    // check to see if you have hit the edge
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {  // ceiling check
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {  // floor check
        if (x > paddleX && x < paddleX + paddleWidth) {  // paddle check
            dy = -dy;
            score += 1;
            dx += 0.2
            dy += -0.2
        }
        else {  // it hit the floor!
            alert("Game Over! " + "Score: " + score);
            document.location.reload();
            clearInterval(interval);  // needed for the browser to end the game
        }
    }

    // paddle controls
    if (rightPressed) {
        paddleX += 6;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (leftPressed) {
        paddleX -= 6;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    drawPaddle();

    drawScore();

    drawSpeed();

}

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: " + score, 13, 630);
}

function drawSpeed() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Speed: " + Math.abs(dy), 882, 630);
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX - paddleWidth > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 1;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

let interval = setInterval(draw, 10);
