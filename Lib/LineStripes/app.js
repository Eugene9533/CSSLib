function stripesBlue() {
  let sizeW = Math.random() * 30;
  let e = document.createElement("div");
  e.classList.add("lines");
  document.querySelector(".container").appendChild(e);
  e.style.right = (Math.random() * innerWidth) / 2 + "px";
  e.style.width = 3 + sizeW + "px";
  e.style.background =
    "hsl(" + Math.floor(Math.random() * -130) + "deg, 100%, 50%)";
  setTimeout(function () {
    document.querySelector(".container").removeChild(e);
  }, 2000);
}

function stripesRed() {
  let sizeW = Math.random() * 30;
  let e = document.createElement("div");
  e.classList.add("lines");
  document.querySelector(".container").appendChild(e);
  e.style.left = (Math.random() * innerWidth) / 2 + "px";
  e.style.width = 3 + sizeW + "px";
  e.style.background =
    "hsl(" + Math.floor(Math.random() * 40) + "deg, 100%, 50%)";
  setTimeout(function () {
    document.querySelector(".container").removeChild(e);
  }, 2000);
}

setInterval(function () {
  stripesBlue();
  stripesRed();
}, 60);
