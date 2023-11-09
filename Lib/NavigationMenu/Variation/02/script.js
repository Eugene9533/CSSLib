let list = document.querySelectorAll(".bodyTwo .list");
function active() {
    list.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
}
list.forEach((item) => item.addEventListener("click", active));
