let cards = document.querySelectorAll(".main");
let num = 0;
let btn = true;
let len = cards.length - 1;

let counter = () => {
    document.querySelector(".counter").innerHTML = `${num + 1}/${len + 1}`;
    if (num <= 8)
        document.querySelector(".counter").innerHTML = `0${num + 1}/${len + 1}`;
    if (len <= 8)
        document.querySelector(".counter").innerHTML = `0${num + 1}/0${
            len + 1
        }`;
};

counter();

document.querySelector(".next").onclick = () => {
    if (btn) {
        btn = false;
        setTimeout(() => {
            btn = true;
        }, 1000);
        if (num >= len) {
            cards[num].style = "left: -100%; z-index: 1";
            num = 0;
            cards[num].style = "left: 0%; z-index: 5";
            cards[num + 1].style = "left: 100%;";
            counter();
            return;
        }
        cards[num].style = "left: -100%; z-index: 1";
        cards[num + 1].style = "left: 0%; z-index: 5";
        if (cards[num + 2]) cards[num + 2].style = "left: 100%;";
        num++;
        if (num == len) cards[0].style = "left: 100%;";
    }
    counter();
};

document.querySelector(".prev").onclick = () => {
    if (btn) {
        btn = false;
        setTimeout(() => {
            btn = true;
        }, 1000);
        if (num <= 0) {
            cards[num].style = "left: 100%; z-index: 1";
            num = len;
            cards[num].style = "left: 0%; z-index: 5";
            cards[num - 1].style = "left: -100%;";
            counter();
            return;
        }
        cards[num].style = "left: 100%; z-index: 1";
        cards[num - 1].style = "left: 0%; z-index: 5";
        if (cards[num - 2]) cards[num - 2].style = "left: -100%;";
        num--;
        if (num == 0) cards[len].style = "left: -100%;";
    }
    counter();
};
