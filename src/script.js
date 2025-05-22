let css = document.querySelector(".cards.css");
let site = document.querySelector(".cards.site");
let ga = document.querySelector(".cards.ga");
let visibleCards = sessionStorage.getItem("visibleCards") || 0;

// Creating dom elements

(async function () {
    let data = await fetch("./src/dataElements.json");
    let parseData = await data.json();

    // Creating elements by type

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

        // Typical card design

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

// On-page location tracking

window.addEventListener("scroll", function () {
    window.requestAnimationFrame(function () {
        sessionStorage.setItem("scrollPosition", document.documentElement.scrollTop);
    });
});

// Boot settings

window.onload = function () {
    setTimeout(function () {
        if (localStorage.getItem("darkTheme") == "true") changeStyle();
        document.body.style = "display: block";
        window.scrollTo({
            top: +sessionStorage.getItem("scrollPosition"),
            behavior: "smooth",
        });
    }, 50);
};

// Cards display

function showElem() {
    function onEntry(entry) {
        entry.forEach((change) => {
            if (change.isIntersecting) {
                if (!change.target.classList.contains("show")) sessionStorage.setItem("visibleCards", ++visibleCards);
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

// Setting visible cards

function sessionStorageVisibleCards() {
    let elementsCard = document.querySelectorAll(".card");
    for (let i = 0; i < visibleCards; i++) {
        elementsCard[i].classList.add("show");
    }
}

// Switching color mode

document.querySelector(".style").addEventListener("click", () => {
    changeStyle();
    if (document.body.classList.contains("dark-theme-body")) {
        localStorage.setItem("darkTheme", "true");
    } else {
        localStorage.setItem("darkTheme", "false");
    }
});

function changeStyle() {
    const dark = document.querySelector(".dark");
    const light = document.querySelector(".light");
    const container = document.querySelectorAll(".container");
    const description = document.querySelectorAll(".description");
    const text = document.querySelectorAll(".text");
    const h1 = document.querySelectorAll("h1");
    const h2 = document.querySelectorAll("h2");
    const line = document.querySelectorAll(".line");
    const footer = document.querySelector("footer");
    const i = document.querySelectorAll("i");

    dark.classList.toggle("active");
    light.classList.toggle("active");

    document.body.classList.toggle("dark-theme-body");
    footer.classList.toggle("dark-theme-footer");

    description.forEach((e) => {
        e.classList.toggle("dark-theme-description");
    });

    text.forEach((e) => {
        e.classList.toggle("dark-theme-text");
    });

    container.forEach((e) => {
        e.classList.toggle("dark-theme-container");
    });

    h1.forEach((e) => {
        e.classList.toggle("dark-theme-h1");
    });

    h2.forEach((e) => {
        e.classList.toggle("dark-theme-h2");
    });

    line.forEach((e) => {
        e.classList.toggle("dark-theme-line");
    });

    i.forEach((e) => {
        e.classList.toggle("dark-theme-i");
    });
}
