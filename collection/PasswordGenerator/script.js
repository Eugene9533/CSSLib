const PS = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "~!@#$%^&*()_+-=[]{}|:;..,<>№",
};

const passwordLength = document.querySelector(".pass-length input");
const passwordDetails = document.querySelector(".pass-length .details span");
const passwordIndicator = document.querySelector(".pass-indicator");
const passwordInput = document.querySelector(".input-box input");
const copyButton = document.querySelector(".input-box span");

const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const shuffleString = (str) =>
    str
        .split("")
        .sort(function () {
            return 0.5 - Math.random();
        })
        .join("");

const updatePasswordIndicator = (l) => {
    passwordDetails.textContent = l;
    passwordIndicator.classList.remove("strong", "medium");
    if (l >= 20) passwordIndicator.classList.add("strong");
    else if (l >= 8) passwordIndicator.classList.add("medium");
};

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyButton.textContent = "check";
    copyButton.style.pointerEvents = "none";
    setTimeout(() => {
        copyButton.textContent = "copy_all";
        copyButton.style.pointerEvents = "auto";
    }, 1000);
};

const restorePasswordOptions = () => {
    if (localStorage.getItem("passwordOptions")) {
        const passwordOption = JSON.parse(localStorage.getItem("passwordOptions"));
        uppercase.checked = passwordOption["uppercase"];
        numbers.checked = passwordOption["numbers"];
        symbols.checked = passwordOption["symbols"];
        passwordLength.value = passwordOption.length;
    }
};

const savePasswordOptions = () => {
    const passwordOptions = {};
    passwordOptions["length"] = +passwordLength.value;
    passwordOptions["uppercase"] = uppercase.checked;
    passwordOptions["numbers"] = numbers.checked;
    passwordOptions["symbols"] = symbols.checked;

    localStorage.setItem("passwordOptions", JSON.stringify(passwordOptions));
};

const generatePassword = () => {
    savePasswordOptions();
    const length = +passwordLength.value;
    updatePasswordIndicator(length);

    let passString = shuffleString(PS.lowercase);
    if (uppercase.checked) passString = shuffleString(passString + PS.uppercase);
    if (numbers.checked) passString = shuffleString(passString + PS.numbers);
    if (symbols.checked) passString = shuffleString(passString + PS.symbols);

    let randomPassword = "";
    for (let i = 0; i < length; i++) {
        let random = randomInteger(0, passString.length - 1);
        randomPassword += passString[random];
    }
    passwordInput.value = randomPassword;
};

restorePasswordOptions();

passwordLength.oninput = generatePassword;
document.querySelector(".generate-btn").onclick = generatePassword;
generatePassword();

copyButton.onclick = copyPassword;
