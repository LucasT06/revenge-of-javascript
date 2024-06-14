let canvas = document.querySelector('.game'),
    ctx = canvas.getContext('2d'),
    ballRadius = 9,
    x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3),
    y = canvas.height - 40,
    dx = 2,
    dy = 2;


//draw paddle
let paddleheight = 15,
    paddleWidth = 100;

function drawPaddle() {
    ctx.beginPath();
    ctx.roundRect(paddlex, canvas.height - paddleheight, paddleWidth, paddleheight, 30);
    ctx.fillstyle = '#333';
    ctx.fill();
    ctx.closePath();

}

//paddle start position
let paddlex = (canvas.width - paddleWidth) / 2;


//paddle moving with mouse function
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddlex = relativeX - paddleWidth / 2;
    }
}

//Bricks
let rowCount = 5,
    columnCount = 9,
    brickWidth = 54,
    brickHeight = 18,
    brickPadding = 12,
    topOffset = 40,
    leftOffset = 33,
    score = 0;


//Bricks array
let bricks = [];
for (let c = 0; c < columnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < rowCount; r++) {
        //Set position of bricks
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

//Draw Bric

function drawBricks() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + leftOffset;
                let brickY = (r * (brickHeight + brickPadding)) + topOffset;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30);
                ctx.fillStyle = '#333';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();

    console.log(`Drawing ball at x: ${x}, y: ${y}`);
}

//main function
function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBricks();
    drawBall();

    //ziet de zijkanten
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    // ziet de boven kant
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        //ziet de balk hit
        if (x > paddlex && x < paddlex + paddleWidth)
            dy = -dy;
        else {
            // dont hit balk
            alert("game over!")
            document.location.reload
        }
    }
    // Bottom wall
    if (y + dy > canvas.height - ballRadius && y + dy < ballRadius) {
        dy = -dy;
    }

    // ball bewegen
    x += dx;
    y += dy;
}

setInterval(init, 10);