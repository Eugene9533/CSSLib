let elements = document.querySelector(".cards.elements");
let sites = document.querySelector(".cards.sites");

(async function () {
  let data = await fetch("./dataElements.json");
  let parseData = await data.json();

  async function createCards(parseData) {
    for (let item of parseData) {
      let div = document.createElement("div");
      div.className = item.id;
      div.innerHTML = `<a href=${item.href}>
                        <div class="container" style="background-image: url(${item.img})">
                          <div class="description">
                            <div class="text">${item.description}</div>
                          </div>
                        </div>
                      </a>`;
      elements.appendChild(div);
    }
  }

  createCards(parseData);
})();

(async function () {
  let data = await fetch("./dataSites.json");
  let parseData = await data.json();

  async function createSites(parseData) {
    for (let item of parseData) {
      let div = document.createElement("div");
      div.className = item.id;
      div.innerHTML = `<a href=${item.href}>
                        <div class="container" style="background-image: url(${item.img})">
                          <div class="description">
                            <div class="text">${item.description}</div>
                          </div>
                        </div>
                      </a>`;
      sites.appendChild(div);
    }
  }

  createSites(parseData);
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
  }, 100);
};
