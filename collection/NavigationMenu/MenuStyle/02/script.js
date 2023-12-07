let listTwo = document.querySelectorAll(".bodyTwo .list");
function activeTwo() {
    listTwo.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
}
listTwo.forEach((item) => item.addEventListener("click", activeTwo));
