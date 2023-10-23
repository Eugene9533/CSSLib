const letter = {
  RuLower: [
    "ё",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "-",
    "=",
    "",
    "",
    "й",
    "ц",
    "у",
    "к",
    "е",
    "н",
    "г",
    "ш",
    "щ",
    "з",
    "х",
    "ъ",
    "\\",
    "",
    "ф",
    "ы",
    "в",
    "а",
    "п",
    "р",
    "о",
    "л",
    "д",
    "ж",
    "э",
    "",
    "",
    "я",
    "ч",
    "с",
    "м",
    "и",
    "т",
    "ь",
    "б",
    "ю",
    ".",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  RuShift: [
    "Ё",
    "!",
    '"',
    "№",
    ";",
    "%",
    ":",
    "?",
    "*",
    "(",
    ")",
    "_",
    "+",
    "",
    "",
    "Й",
    "Ц",
    "У",
    "К",
    "Е",
    "Н",
    "Г",
    "Ш",
    "Щ",
    "З",
    "Х",
    "Ъ",
    "/",
    "",
    "Ф",
    "Ы",
    "В",
    "А",
    "П",
    "Р",
    "О",
    "Л",
    "Д",
    "Ж",
    "Э",
    "",
    "",
    "Я",
    "Ч",
    "С",
    "М",
    "И",
    "Т",
    "Ь",
    "Б",
    "Ю",
    ",",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  EnLower: [
    "`",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "-",
    "=",
    "",
    "",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "[",
    "]",
    "\\",
    "",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    ";",
    "'",
    "",
    "",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    ",",
    ".",
    "/",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  EnShift: [
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "+",
    "",
    "",
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "{",
    "}",
    "|",
    "",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    ":",
    '"',
    "",
    "",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "<",
    ">",
    "?",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
};
const specButton = [
  btn("Space"),
  btn("Enter"),
  btn("Backspace"),
  btn("Tab"),
  btn("ArrowLeft"),
  btn("ArrowRight"),
  btn("Delete"),
];
const pattern = /[А-яЁё№]+/;
let glass = document.querySelector(".bg");
let button = document.querySelectorAll(".btn");
let en = document.querySelectorAll(".en");
let enNum = document.querySelectorAll(".enNum");
let ru = document.querySelectorAll(".ru");
let input = document.querySelector("textarea");
let position = 0;
let elPress = false;
let pressTimer;
let arrChars = [];

// Запрет кнопок

window.onkeydown = (event) => {
  if (event.key == "Tab" || event.key == "Alt") {
    event.preventDefault();
  }
};

// События на клавиши + подсветка

document.addEventListener("keydown", function (event) {
  if (event.repeat) return;
  arrChars.push(event.code);

  switch (btn(event.code).id) {
    case "CapsLock":
      break;
    case "Tab":
      input.value += "\t";
    default:
      if (arrChars.includes(btn(event.code).id)) CheckedAdd(btn(event.code));
  }
});

document.addEventListener("keyup", function (event) {
  if (
    (arrChars[0] == "AltLeft" || arrChars[0] == "ShiftLeft") &&
    (arrChars[1] == "AltLeft" || arrChars[1] == "ShiftLeft") &&
    arrChars.length == 2
  )
    switchLang();
  if (btn(event.code).id == "CapsLock") {
    Checked(btn("CapsLock"));
  } else {
    if (btn(event.code).id == event.code) CheckedRemove(btn(event.code));
  }
  // arrChars.filter(function (f) { return f !== `${event.code}` });
  arrChars.length = 0;
});

// Авто смена языка при вводе

input.addEventListener("input", () => {
  let letter = input.value[input.value.length - 1];
  if (pattern.test(letter) && en[0].classList.contains("visVisible"))
    switchLang();
  let patternEn = /[A-z#]+/;
  if (patternEn.test(letter) && ru[0].classList.contains("visVisible"))
    switchLang();
});

// Назначение символов

for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("click", () => {
    input.focus();
    // Ckecked стили
    if (button[i].id == "CapsLock") {
      Checked(button[i]);
    }
    if (button[i].id == "ShiftLeft" || button[i].id == "ShiftRight") {
      Checked2(btn("ShiftLeft"), btn("ShiftRight"));
    }
    if (button[i].id == "ControlLeft" || button[i].id == "ControlRight") {
      Checked2(btn("ControlLeft"), btn("ControlRight"));
    }
    if (button[i].id == "AltLeft" || button[i].id == "AltRight") {
      Checked2(btn("AltLeft"), btn("AltRight"));
    }

    // Смена языка
    if (
      (btn("ShiftLeft").classList.contains("checked") ||
        btn("ShiftRight").classList.contains("checked")) &&
      (btn("AltLeft").classList.contains("checked") ||
        btn("AltRight").classList.contains("checked"))
    ) {
      setTimeout(() => {
        switchLang();
        btn("ShiftLeft").classList.remove("checked");
        btn("ShiftRight").classList.remove("checked");
        btn("AltLeft").classList.remove("checked");
        btn("AltRight").classList.remove("checked");
      }, 100);
    }

    // Буквы, цифры и символы
    if (en[0].classList.contains("visHidden")) {
      if (
        btn("CapsLock").classList.contains("checked") &&
        btn("ShiftLeft").classList.contains("checked")
      ) {
        input.value += letter.RuShift[i].toLowerCase();
      } else if (btn("CapsLock").classList.contains("checked")) {
        input.value += letter.RuLower[i].toUpperCase();
      } else if (btn("ShiftLeft").classList.contains("checked")) {
        input.value += letter.RuShift[i];
      } else {
        input.value += letter.RuLower[i];
      }
    } else {
      if (
        btn("CapsLock").classList.contains("checked") &&
        btn("ShiftLeft").classList.contains("checked")
      ) {
        input.value += letter.EnShift[i].toLowerCase();
      } else if (btn("CapsLock").classList.contains("checked")) {
        input.value += letter.EnLower[i].toUpperCase();
      } else if (btn("ShiftLeft").classList.contains("checked")) {
        input.value += letter.EnShift[i];
      } else {
        input.value += letter.EnLower[i];
      }
    }
  });
}

// Cпециальные кнопки

for (let i = 0; i < specButton.length; i++) {
  specButton[i].addEventListener("mousedown", function (e) {
    f();
    async function f() {
      if (e.button === 0) {
        CheckedAdd(btn(e.target.id));
        elPress = e.target;
        input.focus();
        setTimeout(() => {
          switch (e.target.id) {
            case "Space":
              if (elPress) {
                pressTimer = setInterval(function () {
                  buttonSpace();
                }, 40);
                console.log(input.selectionStart);
              }
              break;
            case "Enter":
              if (elPress) {
                pressTimer = setInterval(function () {
                  buttonEnter();
                }, 60);
              }
              break;
            case "Backspace":
              if (elPress) {
                pressTimer = setInterval(function () {
                  buttonBackspace();
                }, 40);
              }
              break;
            case "Tab":
              if (elPress) {
                pressTimer = setInterval(function () {
                  buttonTab();
                }, 100);
              }
              break;
            case "Delete":
              if (elPress) {
                pressTimer = setInterval(function () {
                  buttonDelete();
                }, 40);
              }
              break;
            case "ArrowLeft":
              if (elPress) {
                input.focus();
                pressTimer = setInterval(function () {
                  if (input.selectionStart > 0)
                    position = input.selectionStart - 1;
                  input.setSelectionRange(position, position);
                }, 40);
              }
              break;
            case "ArrowRight":
              if (elPress) {
                input.focus();
                pressTimer = setInterval(function () {
                  if (input.selectionEnd < input.value.length)
                    position = input.selectionEnd + 1;
                  input.setSelectionRange(position, position);
                }, 40);
              }
              break;
            default:
              break;
          }
        }, 500);
        switch (e.target.id) {
          case "Space":
            buttonSpace();
            break;
          case "Enter":
            buttonEnter();
            break;
          case "Backspace":
            buttonBackspace();
            break;
          case "Tab":
            buttonTab();
            break;
          case "Delete":
            buttonDelete();
            break;
          case "ArrowLeft":
            if (input.selectionStart > 0) position = input.selectionStart - 1;
            input.setSelectionRange(position, position);
            break;
          case "ArrowRight":
            if (input.selectionEnd < input.value.length)
              position = input.selectionEnd + 1;
            input.setSelectionRange(position, position);
            break;
          default:
            break;
        }
      }
    }
  });
}

document.addEventListener(
  "mouseup",
  function (e) {
    if (e.target === elPress || (elPress !== false && e.button === 0)) {
      clearInterval(pressTimer);
      elPress = false;
      CheckedRemove(btn(e.target.id));
    }
  },
  true
);

// Переключение языка

function switchLang() {
  if (en[0].classList.contains("visVisible")) {
    en.forEach((item) => {
      item.classList.remove("visVisible");
      item.classList.add("visHidden");
    });
    ru.forEach((item) => {
      item.classList.remove("visHidden");
      item.classList.add("visVisible");
    });
    enNum.forEach((item) => {
      item.classList.remove("visHidden");
      item.classList.add("visVisible");
    });
  } else {
    en.forEach((item) => {
      item.classList.remove("visHidden");
      item.classList.add("visVisible");
    });
    ru.forEach((item) => {
      item.classList.remove("visVisible");
      item.classList.add("visHidden");
    });
    enNum.forEach((item) => {
      item.classList.remove("visVisible");
      item.classList.add("visHidden");
    });
  }
}

// Checked стиль

function Checked(item) {
  if (item.classList.contains("checked")) {
    item.classList.remove("checked");
  } else {
    item.classList.add("checked");
  }
}

function Checked2(item1, item2) {
  if (
    item1.classList.contains("checked") ||
    item2.classList.contains("checked")
  ) {
    item1.classList.remove("checked");
    item2.classList.remove("checked");
  } else {
    item1.classList.add("checked");
    item2.classList.add("checked");
  }
}

function CheckedAdd(item) {
  if (!item.classList.contains("checked")) item.classList.add("checked");
}
function CheckedRemove(item) {
  if (item.classList.contains("checked")) item.classList.remove("checked");
}

// Инициалицация кнопок

function btn(i) {
  return document.getElementById(i);
}

// Таймер

function wait(ms) {
  const start = Date.now();
  let now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}

// Специальные кнопки

function buttonSpace() {
  input.focus();
  position = input.selectionEnd;
  input.value =
    input.value.slice(0, input.selectionStart) +
    " " +
    input.value.slice(input.selectionEnd);
  input.setSelectionRange(position + 1, position + 1);
}

function buttonEnter() {
  input.focus();
  position = input.selectionStart;
  input.value =
    input.value.slice(0, input.selectionStart) +
    "\n" +
    input.value.slice(input.selectionEnd);
  input.setSelectionRange(position + 1, position + 1);
}
function buttonTab() {
  input.focus();
  position = input.selectionStart;
  input.value =
    input.value.slice(0, input.selectionStart) +
    "\t" +
    input.value.slice(input.selectionEnd);
  input.setSelectionRange(position + 1, position + 1);
}

function buttonBackspace() {
  input.focus();
  position = input.selectionStart;
  if (position > 0) {
    input.value =
      input.value.slice(0, input.selectionStart - 1) +
      input.value.slice(input.selectionEnd);
    input.setSelectionRange(position - 1, position - 1);
  }
}

function buttonDelete() {
  input.focus();
  position = input.selectionStart;
  input.value =
    input.value.slice(0, input.selectionStart) +
    input.value.slice(input.selectionEnd + 1);
  input.setSelectionRange(position, position);
}

function Asdr() {
  if (glass.classList.contains("play")) {
    glass.classList.add("back");
  } else if (glass.classList.contains("back")) {
    glass.classList.remove("back");
    glass.classList.add("play");
  }
}

let el = document.querySelector("textarea");

document.querySelector(".keyboard").onmousedown = function (e) {
  if (document.activeElement === el) {
    e.preventDefault();
  }
};
