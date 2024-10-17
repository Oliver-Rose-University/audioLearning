// create audio player object
const audioPlayer = new Audio();
//select play pause button element
const playPauseButton = document.getElementById("play-button");

const progressSlider = document.getElementById("progress-slider");
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
    progressSlider.max = audioPlayer.duration;
}

function onTimeUpdate(){
    progressSlider.value = audioPlayer.currentTime;
}

function onEnd(){
    progressSlider.value = 0
    playPauseButton.innerHTML = "Play"
    playing = false;

}

playPauseButton.onclick = onPlayPauseClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;
