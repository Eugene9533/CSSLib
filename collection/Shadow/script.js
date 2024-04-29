let text = document.querySelectorAll("#text");
let light = document.getElementById("light");
let a = document.querySelectorAll("#text");

document.addEventListener("mousemove", (event) => {
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    light.style.left = mouseX + "px";
    light.style.top = mouseY + "px";

    text.forEach((elem) => {
        let newShadow = "";
        let distanceX = mouseX - elem.offsetLeft - elem.offsetWidth / 2;
        let distanceY = mouseY - elem.offsetTop - elem.offsetHeight / 2;

        for (let i = 0; i < 200; i++) {
            let shadowX = -distanceX * (i / 200);
            let shadowY = -distanceY * (i / 200);
            let opacity = 1 - i / 100;
            newShadow += `${
                newShadow ? "," : ""
            }${shadowX}px ${shadowY}px 0 rgba(33, 33, 33,${opacity})`;
        }
        elem.style.textShadow = newShadow;
    });
});
