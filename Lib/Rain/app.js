let one = document.querySelector(".containerOne");
let two = document.querySelector(".containerTwo");
let three = document.querySelector(".containerThree");

function togg(n) {
  let clouds = document.getElementsByClassName("cl");
  for (let cloud of clouds) {
    if (!cloud.classList.contains("hidden")) cloud.classList.toggle("hidden");
  }
  n.classList.remove("hidden");
}

let radios = document.getElementsByName("cloud");
for (let radio of radios) {
  radio.onclick = function () {
    switch (radio.value) {
      case "1":
        togg(one);
        break;
      case "2":
        togg(two);
        break;
      case "3":
        togg(three);
        break;
    }
  };
}

function randomText() {
  let text = "qwertyuiopasdfghjklzxcvbnm";
  letter = text[Math.floor(Math.random() * text.length)];
  return letter;
}

function rainOne() {
  let cloud = document.querySelector(".containerOne .cloud");
  let e = document.createElement("div");
  let left = Math.floor(Math.random() * 300);
  let size = Math.random() * 1.5;
  let duration = Math.random() * 1;

  e.classList.add("textOne");
  cloud.appendChild(e);
  e.innerText = randomText();
  e.style.left = left + "px";
  e.style.fontSize = 0.5 + size + "em";
  e.style.animationDuration = 1 + duration + "s";

  setTimeout(function () {
    cloud.removeChild(e);
  }, 2000);
}

setInterval(function () {
  if (!document.querySelector(".containerOne").classList.contains("hidden"))
    rainOne();
}, 20);

function randomSymbol() {
  let text = "!@#$%^&*()_+=-";
  letter = text[Math.floor(Math.random() * text.length)];
  return letter;
}

function rainTwo() {
  let cloud = document.querySelector(".containerTwo .cloud");
  let e = document.createElement("div");
  let left = Math.floor(Math.random() * 290);
  let size = Math.random() * 1.5;
  let duration = Math.random() * 1;

  e.classList.add("textTwo");
  cloud.appendChild(e);
  e.innerText = randomSymbol();
  e.style.left = left + "px";
  e.style.fontSize = 0.5 + size + "em";
  e.style.animationDuration = 1 + duration + "s";

  setTimeout(function () {
    cloud.removeChild(e);
  }, 2000);
}

setInterval(function () {
  if (!document.querySelector(".containerTwo").classList.contains("hidden"))
    rainTwo();
}, 20);

function rainThree() {
  let cloud = document.querySelector(".containerThree .cloud");
  let e = document.createElement("div");
  let left = Math.floor(Math.random() * 310);
  let width = Math.random() * 5;
  let height = Math.random() * 50;
  let duration = Math.random() * 0.5;

  e.classList.add("drop");
  cloud.appendChild(e);
  e.style.left = left + "px";
  e.style.width = 0.5 + width + "px";
  e.style.height = 0.5 + height + "px";
  e.style.animationDuration = 1 + duration + "s";

  setTimeout(function () {
    cloud.removeChild(e);
  }, 2000);
}

setInterval(function () {
  if (!document.querySelector(".containerThree").classList.contains("hidden"))
    rainThree();
}, 20);
