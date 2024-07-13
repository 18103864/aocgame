let board;
let boardWidth = 500;
let boardHeight = 700;
let context;

// Player
let playerWidth = 80;
let playerHeight = 10;
let playerVelocityX = 10;

let player = {
    x: boardWidth / 2 - playerWidth / 2,
    y: boardHeight - playerHeight - 5,
    width: playerWidth,
    height: playerHeight,
    velocityX: playerVelocityX
}

// Balls
let ballWidth = 50; // Adjusted size for visibility
let ballHeight = 35; // Adjusted size for visibility
let ballVelocityY = 2;

let balls = [];
let flagImage = new Image();
flagImage.src = 'assets/images/flag.png';

let score = 0;
let gameOver = false;

// DOM Elements
let gameOverScreen = document.getElementById('game-over-screen');
let finalScoreDisplay = document.getElementById('final-score');
let retryButton = document.getElementById('retry-button');
let scoreDisplay = document.getElementById('score');
let girlImage = document.getElementById('girl-image');

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    context.fillStyle = "skyblue";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("mousemove", movePlayer);

    // Create initial ball
    createBall();
    setInterval(createBall, 2000); // Add a new ball every 2 seconds
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    // Player
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    // Balls
    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        ball.y += ball.velocityY;
        context.drawImage(flagImage, ball.x, ball.y, ball.width, ball.height);

        if (detectCollision(ball, player)) {
            balls.splice(i, 1);
            score += 100;
            scoreDisplay.innerText = 'Score: ' + score;
            updateGirlImage();
            i--; // Adjust index after removal
        } else if (ball.y + ball.height >= boardHeight) {
            showGameOver();
        }
    }

    // Score
    context.font = "20px sans-serif";
    context.fillText('Score: ' + score, 10, 25);
}

function outOfBounds(xPosition) {
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}

function movePlayer(e) {
    let mouseX = e.clientX - board.offsetLeft;
    player.x = mouseX - player.width / 2;

    // Ensure player stays within bounds
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > boardWidth) {
        player.x = boardWidth - player.width;
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function createBall() {
    let ball = {
        x: Math.random() * (boardWidth - ballWidth),
        y: 0,
        width: ballWidth,
        height: ballHeight,
        velocityY: ballVelocityY
    }
    balls.push(ball);
}

function resetGame() {
    gameOver = false;
    player = {
        x: boardWidth / 2 - playerWidth / 2,
        y: boardHeight - playerHeight - 5,
        width: playerWidth,
        height: playerHeight,
        velocityX: playerVelocityX
    }
    balls = [];
    score = 0;
    scoreDisplay.innerText = 'Score: 0';
    girlImage.src = 'assets/images/girl1.png'; // Reset to initial image
    createBall();
}

function showGameOver() {
    gameOver = true;
    gameOverScreen.style.display = 'flex';
    finalScoreDisplay.innerText = 'Final Score: ' + score;
    finalScoreDisplay.style.color = 'green'; // Change font color to green
}

function updateGirlImage() {
    if (score >= 4000) {
        girlImage.src = 'assets/images/girl4.png';
    } else if (score >= 2000) {
        girlImage.src = 'assets/images/girl3.png';
    } else if (score >= 1000) {
        girlImage.src = 'assets/images/girl2.png';
    } else {
        girlImage.src = 'assets/images/girl1.png';
    }
}

retryButton.addEventListener('click', () => {
    gameOverScreen.style.display = 'none';
    resetGame();
});


// let board;
// let boardWidth = 500;
// let boardHeight = 700;
// let context;

// // Player
// let playerWidth = 80;
// let playerHeight = 10;
// let playerVelocityX = 10;

// let player = {
//     x: boardWidth / 2 - playerWidth / 2,
//     y: boardHeight - playerHeight - 5,
//     width: playerWidth,
//     height: playerHeight,
//     velocityX: playerVelocityX
// }

// // Balls
// let ballWidth = 10;
// let ballHeight = 10;
// let ballVelocityY = 2;

// let balls = [];

// let score = 0;
// let gameOver = false;

// // DOM Elements
// let gameOverScreen = document.getElementById('game-over-screen');
// let finalScoreDisplay = document.getElementById('final-score');
// let retryButton = document.getElementById('retry-button');
// let scoreDisplay = document.getElementById('score');

// window.onload = function () {
//     board = document.getElementById("board");
//     board.height = boardHeight;
//     board.width = boardWidth;
//     context = board.getContext("2d");

//     context.fillStyle = "skyblue";
//     context.fillRect(player.x, player.y, player.width, player.height);

//     requestAnimationFrame(update);
//     document.addEventListener("mousemove", movePlayer);

//     // Create initial ball
//     createBall();
//     setInterval(createBall, 2000); // Add a new ball every 2 seconds
// }

// function update() {
//     requestAnimationFrame(update);
//     if (gameOver) {
//         return;
//     }
//     context.clearRect(0, 0, board.width, board.height);

//     // Player
//     context.fillStyle = "lightgreen";
//     context.fillRect(player.x, player.y, player.width, player.height);

//     // Balls
//     context.fillStyle = "white";
//     for (let i = 0; i < balls.length; i++) {
//         let ball = balls[i];
//         ball.y += ball.velocityY;
//         context.fillRect(ball.x, ball.y, ball.width, ball.height);

//         if (detectCollision(ball, player)) {
//             balls.splice(i, 1);
//             score += 100;
//             scoreDisplay.innerText = 'Score: ' + score;
//             i--; // Adjust index after removal
//         } else if (ball.y + ball.height >= boardHeight) {
//             showGameOver();
//         }
//     }

//     // Score
//     context.font = "20px sans-serif";
//     context.fillText('Score: ' + score, 10, 25);
// }

// function outOfBounds(xPosition) {
//     return (xPosition < 0 || xPosition + playerWidth > boardWidth);
// }

// function movePlayer(e) {
//     let mouseX = e.clientX - board.offsetLeft;
//     player.x = mouseX - player.width / 2;

//     // Ensure player stays within bounds
//     if (player.x < 0) {
//         player.x = 0;
//     }
//     if (player.x + player.width > boardWidth) {
//         player.x = boardWidth - player.width;
//     }
// }

// function detectCollision(a, b) {
//     return a.x < b.x + b.width &&
//         a.x + a.width > b.x &&
//         a.y < b.y + b.height &&
//         a.y + a.height > b.y;
// }

// function createBall() {
//     let ball = {
//         x: Math.random() * (boardWidth - ballWidth),
//         y: 0,
//         width: ballWidth,
//         height: ballHeight,
//         velocityY: ballVelocityY
//     }
//     balls.push(ball);
// }

// function resetGame() {
//     gameOver = false;
//     player = {
//         x: boardWidth / 2 - playerWidth / 2,
//         y: boardHeight - playerHeight - 5,
//         width: playerWidth,
//         height: playerHeight,
//         velocityX: playerVelocityX
//     }
//     balls = [];
//     score = 0;
//     scoreDisplay.innerText = 'Score: 0';
//     createBall();
// }

// function showGameOver() {
//     gameOver = true;
//     gameOverScreen.style.display = 'flex';
//     finalScoreDisplay.innerText = 'Final Score: ' + score;
//     finalScoreDisplay.style.color = 'green'; // Change font color to green
// }


// retryButton.addEventListener('click', () => {
//     gameOverScreen.style.display = 'none';
//     resetGame();
// });

