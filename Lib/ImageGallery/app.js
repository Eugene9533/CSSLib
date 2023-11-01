let box = document.querySelector(".box");

document.onmousemove = () => {
    let speed = (event.clientX - window.innerWidth / 2) / 50;

    // if (speed > 0) {
    //     if (speed < 16)
    //         box.style = `animation-duration: ${
    //             20 - speed + 1
    //         }s; --ss:${0}deg; --se:${360}deg;`;
    // } else {
    //     if (speed > -16)
    //         box.style = `animation-duration: ${
    //             20 + speed + 1
    //         }s; --ss:${0}deg; --se:${-360}deg;`;
    // }
    // box.style = `--ss:${speed * 18}deg;`;
    //     box.style = `--ss:${(speed + 1) * 18}deg; --se:${
    //         (speed + 1) * 18 + 360
    //     }deg,`;
};
