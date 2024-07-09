let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let slider = document.querySelector(".slider");

next.addEventListener("click", function () {
    next.style = "pointer-events: none";
    let slides = document.querySelectorAll(".slides");
    slider.appendChild(slides[0]);
    setTimeout(() => {
        next.style = "pointer-events: auto";
    }, 500);
});

prev.addEventListener("click", function () {
    prev.style = "pointer-events: none";
    let slides = document.querySelectorAll(".slides");
    slider.prepend(slides[slides.length - 1]);
    setTimeout(() => {
        prev.style = "pointer-events: auto";
    }, 250);
});
