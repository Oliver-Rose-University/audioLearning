const audioplayer = document.getElementById("div1");
const dropZone = document.getElementById("body");

function onDrop(event) {
    audioplayer.style.left = event.clientX - offsetX + "px";
    audioplayer.style.top = event.clientY - offsetY + "px";
    console.log("Element has been dropped");
}

function onDragOver(event) {
    event.preventDefault();
    console.log("Something is being dragged over me!");
}

let offsetX = 0;
let offsetY = 0;

function onDragStart(event) {
    const style = window.getComputedStyle(audioplayer, null);

    offsetX = event.clientX - parseInt(style.left);
    offsetY = event.clientY - parseInt(style.top);
    console.log("I'm being Dragged");
}

dropZone.ondrop = onDrop;
dropZone.ondragover = onDragOver;


audioplayer.ondragstart = onDragStart;
audioplayer.ondragover = onDragOver;
audioplayer.ondrop = onDrop;