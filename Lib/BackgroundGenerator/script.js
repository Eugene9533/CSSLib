let container = document.querySelector(".container");
let main = document.querySelectorAll(".main");

for (let i = 0; i <= 80; i++) {
  let blocks = document.createElement("div");
  blocks.classList.add("block");
  container.appendChild(blocks);
}

function circle() {
  container.classList.toggle("circle");
}

function generate() {
  anime({
    targets: ".block",
    translateX: function () {
      return anime.random(-900, 900);
    },
    translateY: function () {
      return anime.random(-500, 500);
    },
    scale: function () {
      return anime.random(1, 5);
    },
  });
}

generate();

function tes() {
  main.forEach((elem) => elem.classList.toggle("hidden"));
}

function download() {
  let btn = document.querySelectorAll("button");
  let body = document.querySelector("body");
  let container = document.querySelectorAll(".container");
  let main = document.querySelectorAll(".main");
  let tes = document.getElementById("demo");

  let containerArr = Array.from(container);
  let mainArr = Array.from(main);

  let arr = [body, containerArr, mainArr, tes];
  arr = arr.flat();

  arr.forEach((elem) => {
    if (elem == body) {
      elem.setAttribute("style", `overflow:auto`);
    }
    elem.setAttribute(
      "style",
      `width:${window.screen.width}px; height:${window.screen.height}px`
    );
  });

  btn.forEach((elem) => elem.classList.add("hidden"));

  domtoimage
    .toPng(document.querySelector("html"), {
      width: window.screen.width,
      height: window.screen.height,
    })
    .then(function (dataUrl) {
      let link = document.createElement("a");
      link.download = "background.png";
      link.href = dataUrl;
      link.click();
    })
    .then(() => {
      btn.forEach((elem) => elem.classList.remove("hidden"));
      arr.forEach((elem) => {
        elem.setAttribute("style", ``);
      });
    });
}
