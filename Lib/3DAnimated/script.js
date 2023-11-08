let Y = 50;
let X = 0;
let dirX = 0;
let degS = 360;
let degE = 0;

let animate = document.querySelector(".city");
document.querySelector(
  ".city"
).style = `--degS:${degS}deg; --degE:${degE}deg; transform: rotateX(-30deg) rotateY(${degS}deg)`;

window.addEventListener("wheel", (e) => {
  let n = e.deltaY / 100;
  if (Y > 5 && Y < 100) {
    Y -= n;
  }
  console.log(Y);

  document.querySelector(".scale").style.transform = `scale(${Y / 50})`;

  if (Y === 5) Y = 6;
  if (Y === 100) Y = 99;
});

window.addEventListener("mousedown", () => {
  document.onmousemove = function (e) {
    dirX = X;
    X = e.clientX / 10;

    if (dirX > X) {
      degS -= 3;
    } else {
      degS += 3;
    }

    degE = degS - 360;

    document.querySelector(
      ".city"
    ).style = `--degS:${degS}deg; --degE:${degE}deg; transform: rotateX(-30deg) rotateY(${degS}deg)`;
  };

  animate.classList.toggle("animate");
  animate.classList.toggle("pause");
});

window.addEventListener("mouseup", () => {
  document.onmousemove = null;
  animate.classList.toggle("animate");
  animate.classList.toggle("pause");
});
