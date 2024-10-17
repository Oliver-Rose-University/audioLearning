// create audio player object
const audioPlayer = new Audio();
//select play pause button element
const playPauseButton = document.getElementById("play-button");
//audioPlayer.src is first song in playlist
audioPlayer.src = "assets/duck1.mp3";

let playing = false;
//play music if not playing, if playing do not play sound
function onPlayPauseClick(){
    if (playing){
        audioPlayer.pause();
        playPauseButton.innerHTML = "Play";
        playing = false;
    }
    else{
        audioPlayer.play();
        playPauseButton.innerHTML = "Pause";
        playing = true;
    }
}

function onLoadedMetadata(){
    console.log(audioPlayer.duration);
}

playPauseButton.onclick = onPlayPauseClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;