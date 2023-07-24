let cards = document.querySelector(".cards");

(async function () {
  let data = await fetch("./data.json");
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
      cards.appendChild(div);
    }
  }

  createCards(parseData);
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
