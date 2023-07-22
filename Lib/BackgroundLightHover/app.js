function addDots() {
  let count = 2000;
  let i = 0;
  while (i < count) {
    let span = document.createElement("span");
    let s = document.querySelector("section");

    s.appendChild(span);
    i++;
  }
}

addDots();
