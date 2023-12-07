let toggleMenuThree = document.querySelector(".bodyThree .toggleMenu");
let navigationThree = document.querySelector(".bodyThree .navigation");
toggleMenuThree.onclick = function () {
    navigationThree.classList.toggle("active");
};
