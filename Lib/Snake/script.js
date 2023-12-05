const snake = document.querySelector(".play-board.snake");
const food = document.querySelector(".play-board.food");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const modal = document.querySelector(".modal");
const newGame = document.querySelector(".newGame");

let foodX;
let foodY;
let snakeX = 5;
let snakeY = 10;
let snakeBody = [];
let velocityX = 0;
let velocityY = 0;
let gameOver = false;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;

highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    food.innerHTML = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
};

const handleGameOver = () => {
    clearInterval(setIntervalId);
    modal.classList.toggle("visible");
};

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }

    // if (velocityX === 0 && velocityY === -1) {
    //     position = "up"
    // } else if (velocityX === 0 && velocityY === 1) {
    //     position = "down"
    // } else if (velocityX === -1 && velocityY === 0) {
    //     position = "left"
    // } else if (velocityX === 1 && velocityY === 0) {
    //     position = "right"
    // }
};

const initGame = () => {
    let htmlMarkup = ``;

    if (gameOver) return handleGameOver();

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);

        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (
            i !== 0 &&
            snakeBody[0][1] === snakeBody[i][1] &&
            snakeBody[0][0] === snakeBody[i][0]
        ) {
            gameOver = true;
        }
    }
    snake.innerHTML = htmlMarkup;

    if (velocityX === 0 && velocityY === -1) {
        document.querySelector(".head").classList = "head up";
    } else if (velocityX === 0 && velocityY === 1) {
        document.querySelector(".head").classList = "head down";
    } else if (velocityX === -1 && velocityY === 0) {
        document.querySelector(".head").classList = "head left";
    } else if (velocityX === 1 && velocityY === 0) {
        document.querySelector(".head").classList = "head right";
    }
};

changeFoodPosition();
initGame();
setIntervalId = setInterval(initGame, 200);
document.addEventListener("keydown", changeDirection);
newGame.addEventListener("click", () => {
    location.reload();
});
