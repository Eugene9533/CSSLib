let css = document.querySelector(".cards.css");
let site = document.querySelector(".cards.site");
let ga = document.querySelector(".cards.ga");
let getC = JSON.parse(sessionStorage.getItem("visibleCards"));
let setC = 0;

if (getC > setC) setC = getC;

(async function () {
    let data = await fetch("./dataElements.json");
    let parseData = await data.json();

    async function createCards(parseData) {
        for (let item of parseData) {
            switch (item.type) {
                case "css":
                    card(item, css);
                    break;
                case "ga":
                    card(item, ga);
                    break;
                case "site":
                    card(item, site);
                    break;
                default:
                    break;
            }
        }

        function card(item, type) {
            let div = document.createElement("div");
            div.className = `card ${item.type}`;
            div.innerHTML = `<a href=${item.href}>
                        <div class="container" style="background-image: url(${item.img})">
                          <div class="description">
                            <div class="text">${item.description}</div>
                          </div>
                        </div>
                      </a>`;
            type.appendChild(div);
        }
    }

    createCards(parseData);
    sessionStorageVisibleCards();
    showElem();
})();

window.addEventListener("scroll", function () {
    window.requestAnimationFrame(function () {
        sessionStorage.setItem(
            "scrollPosition",
            document.documentElement.scrollTop
        );
    });
});

window.onload = function () {
    setTimeout(function () {
        window.scrollTo({
            top: +sessionStorage.getItem("scrollPosition"),
            behavior: "smooth",
        });
    }, 50);
};

function showElem() {
    function onEntry(entry) {
        entry.forEach((change) => {
            if (change.isIntersecting) {
                if (!change.target.classList.contains("show"))
                    sessionStorage.setItem(
                        "visibleCards",
                        JSON.stringify(++setC)
                    );
                change.target.classList.add("show");
            }
        });
    }

    let options = {
        threshold: [0.5],
    };
    let observer = new IntersectionObserver(onEntry, options);
    let elementsCard = document.querySelectorAll(".card");

    for (let e of elementsCard) {
        observer.observe(e);
    }
}

function sessionStorageVisibleCards() {
    let elementsCard = document.querySelectorAll(".card");
    let elem = getC;
    if (elementsCard.length < getC) elem = elementsCard.length;
    for (let i = 0; i < elem; i++) {
        elementsCard[i].classList.add("show");
    }
}
