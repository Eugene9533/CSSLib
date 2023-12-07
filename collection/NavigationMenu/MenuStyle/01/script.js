let markerOne = document.querySelector(".bodyOne #indicator");
let navOne = document.querySelector(".bodyOne nav");
let itemOne = document.querySelectorAll(".bodyOne nav a");

navOne.onclick = function () {
    markerOne.classList.toggle("change");
};

function indicatorOne(e) {
    markerOne.style.left = e.offsetLeft + "px";
    markerOne.style.width = e.offsetWidth + "px";
    markerOne.style.display = "block";
    markerOne.style.filter = "hue-rotate(" + Math.random() * 360 + "deg)";
}

itemOne.forEach((link) => {
    link.addEventListener("click", (e) => {
        indicatorOne(e.target);
    });
});

function addActiveClass() {
    itemOne.forEach((i) => i.classList.remove("active"));
    this.classList.add("active");
}

itemOne.forEach((i) => i.addEventListener("click", addActiveClass));
