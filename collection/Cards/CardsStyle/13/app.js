let containerThirteen = document.querySelector(".containerThirteen");
const dataThirteen = [
    { id: 1, name: "Someone", profession: "Seo expert" },
    { id: 2, name: "Someone", profession: "Magician" },
    { id: 3, name: "Someone", profession: "Graphic designer" },
    { id: 4, name: "Someone", profession: "Actress" },
];

function getAverageColour(img) {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.drawImage(img, 0, 0, 5, 5);
    const [r, g, b] = ctx.getImageData(0, 0, 5, 5).data;
    return `rgba(${r}, ${g}, ${b}, 0.8)`;
}

function createCard(data) {
    let div = document.createElement("div");
    div.className = "box";
    div.setAttribute("data-color", `clr${data.id}`);
    div.innerHTML = `<div class="image imgBx${data.id}"><img src="../Cards/CardsStyle/13/images/img${data.id}.png" alt="img${data.id}"></div>
                     <div class="glass">
                         <h3>${data.name}<br><span>${data.profession}</span></h3>
                         <ul>
                             <a href="#" style="--i:1;"><ion-icon name="logo-linkedin"></ion-icon></a>
                             <a href="#" style="--i:2;"><ion-icon name="logo-whatsapp"></ion-icon></a>
                             <a href="#" style="--i:3;"><ion-icon name="logo-instagram"></ion-icon></a>
                         </ul>
                     </div>`;
    containerThirteen.appendChild(div);
}

for (let i = 0; i < dataThirteen.length; i++) {
    createCard(dataThirteen[i]);

    let img = document.querySelector(`.imgBx${i + 1} img`);
    setTimeout(() => {
        let color = getAverageColour(img);
        let div = document.querySelector(`.box[data-color="clr${i + 1}"`);
        div.setAttribute("b", color);
    }, 200);
}

const boxThirteen = document.querySelectorAll(".box");
const bodyThirteen = document.querySelector(".bodyThirteen");

boxThirteen.forEach((i) => {
    i.addEventListener("mouseover", () => {
        bodyThirteen.style.background = i.getAttribute("b");
    });
    i.addEventListener("mouseout", () => {
        bodyThirteen.style.background = "#111";
    });
});
