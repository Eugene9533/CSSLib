let speed = 10;
let starSpeed = 20;

document.addEventListener("mousemove", function (e) {
  let rocket = document.querySelector(".rocket");
  rocket.style.left = e.offsetX + "px";
  rocket.style.top = e.offsetY + "px";
});

document.addEventListener("mousedown", function () {
  let i = document.querySelectorAll("i");
  i.forEach((e) => {
    e.style.height = 100 + Math.random() * 200 + "px";
    e.style.animationDuration = Math.random() * 1 + "s";
  });
});

document.addEventListener("mouseup", function () {
  let i = document.querySelectorAll("i");
  i.forEach((e) => {
    e.style.height = Math.random() * 20 + "px";
    e.style.animationDuration = Math.random() * 10 + "s";
  });
});

function stars() {
  let count = 60;
  let scene = document.querySelector(".scene");
  let i = 0;
  while (i < count) {
    let star = document.createElement("i");
    let x = Math.floor(Math.random() * window.innerWidth);

    let duration = Math.random() * speed;
    let h = Math.random() * starSpeed;

    star.style.left = x + "px";
    star.style.width = 1 + "px";
    star.style.height = h + "px";
    star.style.animationDuration = duration + "s";

    scene.appendChild(star);
    i++;
  }
}

stars();
