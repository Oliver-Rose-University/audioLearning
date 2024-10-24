// defines the audiplayer, which is the element we will be moving
const audioplayer = document.getElementById("div1");
// defines the dropzone, which is the entire page
const dropZone = document.getElementById("body");
// runs when the picked-up object is dropped, adjusting its position
function onDrop(event) {
    audioplayer.style.left = event.clientX - offsetX + "px";
    audioplayer.style.top = event.clientY - offsetY + "px";
    console.log("Element has been dropped");
}
// is used for bugtesting purposes
function onDragOver(event) {
    event.preventDefault();
    console.log("Something is being dragged over me!");
}
// defines the variables that will be used to change the positiom
let offsetX = 0;
let offsetY = 0;
// runs when you begin to move the audio player
function onDragStart(event) {
    if(sliderIsChanging){
        event.preventDefault();
        return;
    }
    else{ 
        const style = window.getComputedStyle(audioplayer, null);

        offsetX = event.clientX - parseInt(style.left);
        offsetY = event.clientY - parseInt(style.top);
        console.log("I'm being Dragged");
    }
}

// more definitions of events to functions
dropZone.ondrop = onDrop;
dropZone.ondragover = onDragOver;


audioplayer.ondragstart = onDragStart;
audioplayer.ondragover = onDragOver;
audioplayer.ondrop = onDrop;