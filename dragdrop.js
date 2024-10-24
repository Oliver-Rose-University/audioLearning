const audioplayer = document.getElementsByClassName("div1");

function onDrop(event) {
    //bring fancyGlasses to these positions
    draggedImage.style.left = event.clientX - offsetX + "px";
    draggedImage.style.top = event.clientY - offsetY + "px";
    console.log("Element has been dropped");
}

function onDragOver(event) {
    event.preventDefault();
    console.log("Something is being dragged over me!");
}

let offsetX = 0;
let offsetY = 0;
let draggedImage = undefined;

function onDragStart(event) {
    draggedImage = event.target;

    const style = window.getComputedStyle(draggedImage, null);

    offsetX = event.clientX - parseInt(style.left);
    offsetY = event.clientY - parseInt(style.top);
    console.log("I'm being Dragged");
}

dropZone.ondrop = onDrop;
dropZone.ondragover = onDragOver;

for (let div1 of audioplayer) {
    audioplayer.ondragstart = onDragStart;
    audioplayer.ondragover = onDragOver;
    audioplayer.ondrop = onDrop;
}