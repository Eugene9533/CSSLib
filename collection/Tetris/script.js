const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");
const nextCanvas = document.getElementById("next");
const nextCtx = nextCanvas.getContext("2d");

const scale = 30;
const nextScale = 20;

const startButton = document.getElementById("startButton");
const pauseOverlay = document.getElementById("pauseOverlay");
const restartBtn = document.getElementById("restartBtn");
const gameOverElem = document.getElementById("gameOver");
const scoreElem = document.getElementById("score");
const levelElem = document.getElementById("level");

const arenaWidth = 12;
const arenaHeight = 20;

const colors = [null, "#FF0D72", "#0DC2FF", "#0DFF72", "#F538FF", "#FF8E0D", "#FFE138", "#3877FF"];

const arena = createMatrix(arenaWidth, arenaHeight);

const player = {
    pos: { x: 0, y: 0 },
    matrix: null,
    nextMatrix: null,
    score: 0,
    level: 1,
};

let gameStarted = false;
let gameOver = false;
let paused = false;
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

let fadeRows = [];
const fadeDuration = 500;
let fadeStartTime = 0;
let rowCount = 0;

let bag = [];
let bagIndex = 0;

ctx.scale(scale, scale);
nextCtx.scale(nextScale, nextScale);

startButton.addEventListener("click", () => {
    document.getElementById("startOverlay").style.display = "none";
    gameStarted = true;
    update();
});

restartBtn.addEventListener("click", restart);

document.addEventListener("keydown", (event) => {
    if (event.key === "p" || event.key === "з" || event.key === "З" || event.key === "P") {
        paused = !paused;
        pauseOverlay.style.display = paused ? "flex" : "none";

        if (!paused) {
            lastTime = performance.now();
            dropCounter = 0;
        }
        return;
    }

    if (gameOver || paused) return;

    if (event.key === "ArrowLeft") {
        player.pos.x--;
        if (collide(arena, player)) player.pos.x++;
    } else if (event.key === "ArrowRight") {
        player.pos.x++;
        if (collide(arena, player)) player.pos.x--;
    } else if (event.key === "ArrowDown") {
        playerDrop();
    } else if (event.key === "ArrowUp") {
        rotate(player.matrix, 1);
        if (collide(arena, player)) rotate(player.matrix, -1);
    }
});

function createMatrix(w, h) {
    const matrix = [];
    while (h--) matrix.push(new Array(w).fill(0));
    return matrix;
}

function createPiece(type) {
    switch (type) {
        case "T":
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ];
        case "O":
            return [
                [2, 2],
                [2, 2],
            ];
        case "L":
            return [
                [0, 3, 0],
                [0, 3, 0],
                [0, 3, 3],
            ];
        case "J":
            return [
                [0, 4, 0],
                [0, 4, 0],
                [4, 4, 0],
            ];
        case "I":
            return [
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
            ];
        case "S":
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0],
            ];
        case "Z":
            return [
                [7, 7, 0],
                [0, 7, 7],
                [0, 0, 0],
            ];
    }
}

function createBag() {
    const pieces = "TJLOSZI";
    bag = (pieces + pieces).split("");
    shuffleArray(bag);
    bagIndex = 0;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function drawGrid() {
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 0.04;

    for (let x = 0; x <= arenaWidth; x++) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, arenaHeight);
        ctx.stroke();
    }

    for (let y = 0; y <= arenaHeight; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(arenaWidth, y);
        ctx.stroke();
    }
}

function drawMatrix(context, matrix, offset) {
    matrix.forEach((row, y) =>
        row.forEach((value, x) => {
            if (value !== 0) {
                let alpha = 1;
                if (fadeRows.length) {
                    const fadeRow = fadeRows.find((fr) => fr.row === y + offset.y);
                    if (fadeRow) alpha = fadeRow.alpha;
                }
                context.globalAlpha = alpha;

                context.fillStyle = colors[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
                context.strokeStyle = "#fff";
                context.lineWidth = 0.05;
                context.strokeRect(x + offset.x, y + offset.y, 1, 1);

                context.globalAlpha = 1;
            }
        })
    );
}

function draw() {
    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
    drawGrid();
    drawMatrix(ctx, arena, { x: 0, y: 0 });
    drawMatrix(ctx, player.matrix, player.pos);
    drawNext();
}

function drawNext() {
    const w = nextCanvas.width / nextScale;
    const h = nextCanvas.height / nextScale;
    nextCtx.fillStyle = "#fafafa";
    nextCtx.fillRect(0, 0, w, h);

    if (player.nextMatrix) {
        const m = player.nextMatrix;
        const offsetX = Math.floor((w - m[0].length) / 2);
        const offsetY = Math.floor((h - m.length) / 2);
        drawMatrix(nextCtx, m, { x: offsetX, y: offsetY });
    }
}

function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;

    for (let y = 0; y < m.length; y++) {
        for (let x = 0; x < m[y].length; x++) {
            if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
    }

    if (dir > 0) matrix.forEach((row) => row.reverse());
    else matrix.reverse();
}

function playerDrop() {
    player.pos.y++;

    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        rowCount = arenaSweep();
        if (rowCount > 0) {
            dropInterval = 1500;
        } else {
            updateDropInterval();
        }
        resetPlayer();
    }

    dropCounter = 0;
}

function arenaSweep() {
    let cleared = 0;
    outer: for (let y = arena.length - 1; y >= 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (!arena[y][x]) continue outer;
        }
        if (!fadeRows.some((fr) => fr.row === y)) {
            fadeRows.push({ row: y, alpha: 1 });
            cleared++;
        }
    }
    return cleared;
}

function updateDropInterval() {
    dropInterval = 1000 - (player.level - 1) * 100;
    if (dropInterval < 100) dropInterval = 100;
}

function resetPlayer() {
    player.matrix = player.nextMatrix || createPiece(randomPiece());
    player.nextMatrix = createPiece(randomPiece());
    player.pos.y = 0;
    player.pos.x = Math.floor(arenaWidth / 2) - Math.floor(player.matrix[0].length / 2);

    if (collide(arena, player)) {
        gameOver = true;
        showGameOver();
    }
    drawNext();
}

function randomPiece() {
    if (bagIndex >= bag.length) createBag();
    return bag[bagIndex++];
}

function updateScore() {
    scoreElem.textContent = player.score;
    levelElem.textContent = player.level;
}

function update(time = 0) {
    if (!gameStarted) return;
    if (paused) {
        requestAnimationFrame(update);
        return;
    }
    if (gameOver) return;

    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) playerDrop();

    if (fadeRows.length > 0) {
        if (fadeStartTime === 0) fadeStartTime = time;
        const elapsed = time - fadeStartTime;
        const progress = 1 - elapsed / fadeDuration;
        fadeRows.forEach((fr) => (fr.alpha = Math.max(0, progress)));

        if (elapsed >= fadeDuration) {
            fadeRows
                .map((fr) => fr.row)
                .sort((a, b) => b - a)
                .forEach((row) => {
                    arena.splice(row, 1);
                    arena.unshift(new Array(arenaWidth).fill(0));
                });
            fadeRows = [];

            let points = 0;
            if (rowCount === 1) points = 50;
            else if (rowCount === 2) points = 100;
            else if (rowCount === 3) points = 300;
            else if (rowCount === 4) points = 1000;

            player.score += points;
            const newLevel = Math.floor(player.score / 500) + 1;
            if (newLevel > player.level) player.level = newLevel;

            updateScore();
            updateDropInterval();

            fadeRows = [];
            fadeStartTime = 0;
            rowCount = 0;
        }
        draw();
        return requestAnimationFrame(update);
    }

    if (dropCounter > dropInterval) playerDrop();

    draw();
    requestAnimationFrame(update);
}

function showGameOver() {
    gameOverElem.style.display = "flex";
    let playerName = prompt("Введите ваше имя (макс. 10 символов):", "Player") || "Player";
    playerName = playerName.trim().slice(0, 10);
    updateHighscores(playerName, player.score);
    renderHighscores();
}

function restart() {
    gameOver = false;
    arena.forEach((row) => row.fill(0));
    player.score = 0;
    player.level = 1;
    updateScore();
    fadeRows = [];
    rowCount = 0;
    fadeStartTime = 0;
    dropInterval = 1000;
    resetPlayer();
    gameOverElem.style.display = "none";
    lastTime = 0;
    update();
}

function getHighscores() {
    return JSON.parse(localStorage.getItem("tetrisHighscores") || "[]");
}

function updateHighscores(name, score) {
    name = name.trim().slice(0, 10);
    const highscores = getHighscores();
    highscores.push({ name, score });
    highscores.sort((a, b) => b.score - a.score);
    const top10 = highscores.slice(0, 10);
    localStorage.setItem("tetrisHighscores", JSON.stringify(top10));
}

function renderHighscores() {
    const list = document.getElementById("highscoreList");
    list.innerHTML = "";
    const highscores = getHighscores();

    for (let i = 0; i < highscores.length; i++) {
        const li = document.createElement("li");

        let num = i + 1;
        if (num < 10) num = `0${num}`;

        li.innerHTML = `<div id="playerName">${num}. ${highscores[i].name}</div>
                        <div id="playerScore">${highscores[i].score}</div>`;

        list.appendChild(li);
    }
}

createBag();
resetPlayer();
updateScore();
update();
