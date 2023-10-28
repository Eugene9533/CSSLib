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
