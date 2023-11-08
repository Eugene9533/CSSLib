let createBox = document.getElementsByClassName("createBox")[0];
let notes = document.getElementsByClassName("notes")[0];
let input = document.getElementById("userInput");
let i = 0;
let data = [];

createBox.addEventListener("keydown", content);

document.getElementById("create").addEventListener("click", function () {
  createBox.style.display = "block";
});

function content(e) {
  if (e.keyCode == "13") {
    divStyle(input.value);
    input.value = "";
    createBox.style.display = "none";
    data.push(
      document.querySelectorAll(".note")[
        document.querySelectorAll(".note").length - 1
      ].innerText
    );
    localStorage.setItem("stickyNotes", JSON.stringify(data));
  }
}

function color() {
  const randomColors = [
    "#c2ff3d",
    "#ff3de8",
    "#3dc2ff",
    "#04e022",
    "#bc83e6",
    "#ebb328",
  ];
  if (i > randomColors.length - 1) {
    i = 0;
  }
  return randomColors[i++];
}

function divStyle(text) {
  let div = document.createElement("div");
  div.className = "note";
  div.innerHTML = `<div class="details"><h3>${text}</h3></div>`;
  div.addEventListener("dblclick", function () {
    let index = data.indexOf(text);
    data.splice(index, 1);
    localStorage.setItem("stickyNotes", JSON.stringify(data));
    div.remove();
  });

  div.setAttribute("style", `background:${color()} `);
  notes.appendChild(div);
}

if (localStorage.getItem("stickyNotes")) {
  data = JSON.parse(localStorage.getItem("stickyNotes"));
  for (let i in data) {
    divStyle(data[i]);
  }
}
