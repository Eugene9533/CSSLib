const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const toolBtns = document.querySelectorAll(".tool");
const fillColor = document.querySelector("#fill-color");
const sizeSlider = document.querySelector("#size-slider");
const colorBtns = document.querySelectorAll(".colors .option");
const colorPicker = document.querySelectorAll("#color-picker");
const clearCanvas = document.querySelector(".clear-canvas");
const saveImg = document.querySelector(".save-img");
const undo = document.querySelector(".undo");
const redo = document.querySelector(".redo");

let prevMouseX, prevMouseY, snapshot;
let isDrawing = false;
let selectedTool = "brush";
let brushWidth = 5;
let selectedColor = "#000";
let restoreArray = [];
let restoreArrayRedo = [];
let index = -1;

const setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
};

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

const drawRect = (e) => {
    if (!fillColor.checked) {
        return ctx.strokeRect(
            e.offsetX,
            e.offsetY,
            prevMouseX - e.offsetX,
            prevMouseY - e.offsetY
        );
    }
    ctx.fillRect(
        e.offsetX,
        e.offsetY,
        prevMouseX - e.offsetX,
        prevMouseY - e.offsetY
    );
};

const drawCircle = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(
        Math.pow(prevMouseX - e.offsetX, 2) +
            Math.pow(prevMouseY - e.offsetY, 2)
    );
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawLine = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
};

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawing = (e) => {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);
    if (selectedTool === "brush" || selectedTool === "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (selectedTool === "rectangle") {
        drawRect(e);
    } else if (selectedTool === "circle") {
        drawCircle(e);
    } else if (selectedTool === "triangle") {
        drawTriangle(e);
    } else {
        drawLine(e);
    }
};

toolBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
    });
});

sizeSlider.addEventListener("change", () => (brushWidth = sizeSlider.value));

colorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document
            .querySelector(".options .selected")
            .classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window
            .getComputedStyle(btn)
            .getPropertyValue("background-color");
    });
});

colorPicker.forEach((e) => {
    e.addEventListener("change", () => {
        e.parentElement.style.background = e.value;
        e.parentElement.click();
    });
});

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBackground();
    restoreArray = [];
    restoreArrayRedo = [];
    index = -1;
    redo.classList.remove("unlock");
    undo.classList.remove("unlock");
});

saveImg.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    restoreArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index++;
    restoreArrayRedo = [];
    undo.classList.add("unlock");
    redo.classList.remove("unlock");
});

undo.addEventListener("click", () => {
    if (index <= 0) {
        if (restoreArray.length != 0) restoreArrayRedo.push(restoreArray.pop());
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setCanvasBackground();
        restoreArray = [];
        index = -1;
        undo.classList.remove("unlock");
    } else {
        index -= 1;
        restoreArrayRedo.push(restoreArray.pop());
        ctx.putImageData(restoreArray[index], 0, 0);
    }
    if (restoreArrayRedo.length != 0) redo.classList.add("unlock");
});

redo.addEventListener("click", () => {
    if (restoreArrayRedo.length != 0) {
        index++;
        ctx.putImageData(restoreArrayRedo[restoreArrayRedo.length - 1], 0, 0);
        restoreArray.push(restoreArrayRedo.pop());
        undo.classList.add("unlock");
    }
    if (restoreArrayRedo.length == 0) {
        redo.classList.remove("unlock");
    }
});
