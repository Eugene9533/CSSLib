let one = document.querySelector(".containerOne");
let two = document.querySelector(".containerTwo");
let three = document.querySelector(".containerThree");

function togg(n) {
    let clouds = document.getElementsByClassName("cl");
    for (let cloud of clouds) {
        if (!cloud.classList.contains("hidden"))
            cloud.classList.toggle("hidden");
    }
    n.classList.remove("hidden");
}

let radios = document.getElementsByName("cloud");
for (let radio of radios) {
    radio.onclick = function () {
        switch (radio.value) {
            case "1":
                togg(one);
                break;
            case "2":
                togg(two);
                break;
            case "3":
                togg(three);
                break;
        }
    };
}
