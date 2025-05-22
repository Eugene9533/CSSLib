function addReturnButton() {
    fetch("../../../src/elements/return_button/index.html")
        .then((resp) => resp.text())
        .then((data) => {
            document.querySelector(".return").innerHTML = data;
        });

    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "../../../src/elements/return_button/style.css";
    document.getElementsByTagName("head")[0].appendChild(link);
}
addReturnButton();
