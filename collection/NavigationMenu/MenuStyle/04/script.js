const markerFour = document.querySelector(".bodyFour #marker");
const itemFour = document.querySelectorAll(".bodyFour nav a");

function indicatorFour(e) {
    markerFour.style.left = e.offsetLeft + "px";
    markerFour.style.width = e.offsetWidth + "px";
}

itemFour.forEach((link) => {
    link.addEventListener("click", (e) => {
        indicatorFour(e.target);
    });
});
