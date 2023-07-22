const images = [
  'url("clr/clr01.png")',
  'url("clr/clr02.png")',
  'url("clr/clr03.png")',
  'url("clr/clr04.png")',
  'url("clr/clr05.png")',
  'url("clr/clr06.png")',
  'url("clr/clr07.png")',
  'url("clr/clr08.png")',
  'url("clr/clr09.png")',
  'url("clr/clr10.png")',
  'url("clr/clr11.png")',
  'url("clr/clr12.png")',
  'url("clr/clr13.png")',
  'url("clr/clr14.png")',
  'url("clr/clr15.png")',
  'url("clr/clr16.png")',
];

let body = document.querySelector("body");
body.onclick = function (e) {
  let x = e.pageX - e.target.offsetLeft;
  let y = e.pageY - e.target.offsetTop;

  let splash = document.createElement("span");
  splash.style.left = x + "px";
  splash.style.top = y + "px";

  let bg = images[Math.floor(Math.random() * images.length)];
  if (Math.floor(Math.random() * 10) > 6) {
    splash.style.zIndex = 3;
  }

  splash.style.backgroundImage = bg;

  this.appendChild(splash);

  setTimeout(() => {
    splash.remove();
  }, 6000);
};
