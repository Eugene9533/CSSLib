const emojis = [
  "&#128512",
  "&#128512",
  "&#128514",
  "&#128514",
  "&#128525",
  "&#128525",
  "&#128540",
  "&#128540",
  "&#129397",
  "&#129397",
  "&#128128",
  "&#128128",
  "&#128152",
  "&#128152",
  "&#128077",
  "&#128077",
];
let shuf_emojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));
for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuf_emojis[i];

  box.onclick = function () {
    this.classList.add("boxOpen");
    setTimeout(function () {
      if (document.querySelectorAll(".boxOpen").length > 1) {
        if (
          document.querySelectorAll(".boxOpen")[0].innerHTML ==
          document.querySelectorAll(".boxOpen")[1].innerHTML
        ) {
          document.querySelectorAll(".boxOpen")[0].classList.add("boxMatch");
          document.querySelectorAll(".boxOpen")[1].classList.add("boxMatch");
          document.querySelectorAll(".boxOpen")[1].classList.remove("boxOpen");
          document.querySelectorAll(".boxOpen")[0].classList.remove("boxOpen");
          if (document.querySelectorAll(".boxMatch").length == emojis.length) {
            document.querySelector(".modal").classList.remove("hidden");
          }
        } else {
          document.querySelectorAll(".boxOpen")[1].classList.remove("boxOpen");
          document.querySelectorAll(".boxOpen")[0].classList.remove("boxOpen");
        }
      }
    }, 500);
  };

  document.querySelector(".game").appendChild(box);
}

document.querySelector(".reset").onclick = function () {
  window.location.reload();
  document.querySelector(".modal").classList.add("hidden");
};
