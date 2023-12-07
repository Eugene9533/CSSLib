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
