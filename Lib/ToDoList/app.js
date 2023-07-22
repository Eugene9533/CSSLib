let data = [];
let done = [];

let inputBox = document.querySelector("#inputBox");
let list = document.querySelector("#list");

inputBox.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    addItem(this.value);

    data.push(this.value);
    done.push(0);
    localStorage.setItem("toDoList", JSON.stringify(data));
    localStorage.setItem("toDoListDone", JSON.stringify(done));

    this.value = "";
  }
});

function addItem(inputBox) {
  let listItem = document.createElement("li");
  listItem.innerHTML = `${inputBox}<i></i>`;

  listItem.addEventListener("click", function () {
    let index = data.indexOf(inputBox);
    this.classList.toggle("done");
    if (this.classList.contains("done")) {
      done[index] = 1;
    } else {
      done[index] = 0;
    }
    localStorage.setItem("toDoListDone", JSON.stringify(done));
  });

  listItem.querySelector("i").addEventListener("click", function () {
    let index = data.indexOf(inputBox);
    data.splice(index, 1);
    done.splice(index, 1);
    localStorage.setItem("toDoList", JSON.stringify(data));
    localStorage.setItem("toDoListDone", JSON.stringify(done));
    listItem.remove();
  });

  list.appendChild(listItem);
}

if (localStorage.getItem("toDoList")) {
  data = JSON.parse(localStorage.getItem("toDoList"));
  done = JSON.parse(localStorage.getItem("toDoListDone"));
  for (let i in data) {
    addItem(data[i]);
  }
  for (let i in done) {
    let li = document.querySelectorAll("li");
    if (done[i] == 1) {
      li[i].classList.toggle("done");
    }
  }
}
