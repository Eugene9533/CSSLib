let cards = document.querySelectorAll(".main");
let num = 0;
let btn = true;
let len = cards.length - 1;

let counter = () => {
  document.querySelector(".counter").innerHTML = `${num + 1}/${len + 1}`;
  if (num <= 8)
    document.querySelector(".counter").innerHTML = `0${num + 1}/${len + 1}`;
};

counter();

document.querySelector(".next").onclick = () => {
  if (btn) {
    btn = false;
    setTimeout(() => {
      btn = true;
    }, 500);
    if (num >= len) {
      cards[num].style.left = "-100%";
      cards[num].style.width = "0vw";
      cards[0].style.right = "0%";
      cards[0].style.width = "100vw";
      num = 0;
      counter();
      return;
    }
    cards[len].style.left = "0%";
    cards[num].style.width = "0vw";
    cards[num + 1].style.width = "100vw";
    num++;

    if (num == len) cards[0].style.right = "-100%";
  }
  counter();
};

cards[len].style.left = "-100%";

document.querySelector(".prev").onclick = () => {
  if (btn) {
    btn = false;
    setTimeout(() => {
      btn = true;
    }, 500);
    if (num <= 0) {
      cards[num].style.right = "-100%";
      cards[num].style.width = "0vw";
      cards[len].style.left = "0%";
      cards[len].style.width = "100vw";
      num = len;
      counter();
      return;
    }
    cards[0].style.right = "0%";
    cards[num].style.width = "0vw";
    cards[num - 1].style.width = "100vw";
    num--;
    if (num == 0) cards[len].style.left = "-100%";
  }
  counter();
};
