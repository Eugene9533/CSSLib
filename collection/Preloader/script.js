let i = 0;
const h2 = document.querySelector("h2");
const container = document.querySelector(".container");
const body = document.querySelector("body");
const number = document.querySelector(".number");
const percentBar = document.querySelector(".percentBar");

let interval = setInterval(() => {
    number.innerHTML = i + "<span>%</span>";
    percentBar.style.width = i + "%";
    i++;
    if (i > 100) {
        clearInterval(interval);
        setTimeout(() => {
            container.style = "opacity: 0; visibility: hidden;";
            body.style.background = "#03a9f4";
            h2.style = "opacity: 1; visibility: visible;";
        });
    }
}, 50);
