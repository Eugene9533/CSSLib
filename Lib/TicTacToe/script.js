const selectBox = document.querySelector(".select-box");
const selectXbtn = selectBox.querySelector(".playerX");
const selectObtn = selectBox.querySelector(".playerO");
const playBoard = document.querySelector(".play-board");
const allBox = document.querySelectorAll("section span");
const players = document.querySelector(".players");
const resultBox = document.querySelector(".result-box");
const wonText = resultBox.querySelector(".won-text");
const replayBtn = resultBox.querySelector("button");

let playerXicon = `<div class="cross">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"> 
  <line class="l_1" x1="10" y1="10" x2="70" y2="70"/>
  <line class="l_2" x1="70" y1="10" x2="10" y2="70"/></svg></div>`;
let playerOicon = `<div class="circle">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <circle class="c" cx="40" cy="40" r="30"/></svg></div>`;
let playerSign = "X";
let runBot = true;

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXbtn.onclick = () => {
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
    };
    selectObtn.onclick = () => {
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player");
        playBoard.style.pointerEvents = "none";
        setTimeout(() => {
            bot(runBot);
        }, 1000);
    };
};

function clickedBox(element) {
    if (players.classList.contains("player")) {
        element.innerHTML = playerOicon;
        players.classList.add("active");
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = playerXicon;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    let randomDelayTime = (Math.random() * 1000 + 200).toFixed();
    setTimeout(() => {
        bot(runBot);
    }, randomDelayTime);
}

function bot(runBot) {
    if (runBot) {
        playerSign = "O";
        let array = [];
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if (array.length > 0) {
            if (players.classList.contains("player")) {
                allBox[randomBox].innerHTML = playerXicon;
                players.classList.remove("active");
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                allBox[randomBox].innerHTML = playerOicon;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
    }
}

function getClass(idname) {
    return document.querySelector(".box" + idname).id;
}

function checkThreeClasses(v1, v2, v3, sign) {
    if (getClass(v1) == sign && getClass(v2) == sign && getClass(v3) == sign)
        return true;
}

function selectWinner() {
    if (
        checkThreeClasses(1, 2, 3, playerSign) ||
        checkThreeClasses(4, 5, 6, playerSign) ||
        checkThreeClasses(7, 8, 9, playerSign) ||
        checkThreeClasses(1, 4, 7, playerSign) ||
        checkThreeClasses(2, 5, 8, playerSign) ||
        checkThreeClasses(3, 6, 9, playerSign) ||
        checkThreeClasses(1, 5, 9, playerSign) ||
        checkThreeClasses(3, 5, 7, playerSign)
    ) {
        runBot = false;
        bot(runBot);
        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    } else {
        if (
            getClass(1) != "" &&
            getClass(2) != "" &&
            getClass(3) != "" &&
            getClass(4) != "" &&
            getClass(5) != "" &&
            getClass(6) != "" &&
            getClass(7) != "" &&
            getClass(8) != "" &&
            getClass(9) != ""
        ) {
            runBot = false;
            bot(runBot);
            setTimeout(() => {
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700);
            wonText.textContent = `Match has been drawn!`;
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload();
};
