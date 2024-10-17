// create audio player object
const audioPlayer = new Audio();
//select play pause button element
const playPauseButton = document.getElementById("play-button");

const progressSlider = document.getElementById("progress-slider");

const volumeSlider = document.getElementById("volume-slider");

const songProgress = document.getElementById("song-progress");
const songLength = document.getElementById("song-length");
const songList = ["assets/duck1.mp3", "assets/duck2.mp3", "assets/duck3mp3", "assets/duckChristmas.mp3", "assets.duck4.mp3", "assets.duck5.mp3"]
const songTitles = ["The Duck Song 1", "The Duck Song 2", "The Duck Song 3", "The Christmas Duck Story", "The Duck Song 4", "The Duck Song 5"]
const songImages = ["Duck Song 1.jpeg", "Duck Song 2.jpg", "Duck Song 3.jpeg", "Duck Christmas.jpeg", "Duck Song 4.jpeg", "Duck Song 5.jpeg"]

//audioPlayer.src is first song in playlist
audioPlayer.src = "assets/duck1.mp3";
audioPlayer.volume = 0.5;

let playing = false;
let updatingProgress = false;
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
    songLength.innerHTML = secondsToMMSS(audioPlayer.duration);
}

function onTimeUpdate(){
    if(!updatingProgress){
        progressSlider.value = audioPlayer.currentTime;
    }
    songProgress.innerHTML = secondsToMMSS(audioPlayer.currentTime);
}

function onEnd(){
    progressSlider.value = 0;
    playPauseButton.innerHTML = "Play";
    playing = false;
    songProgress.innerHTML = "00:00";
}

function onVolumeSliderChange(){
    audioPlayer.volume = volumeSlider.value * 0.01;
}

function onSongProgressChange(){
    audioPlayer.currentTime = progressSlider.value;
    updatingProgress = false;

}

function onProgressMouseDown(){
    updatingProgress = true;
}



function secondsToMMSS(seconds){
    const intergerSeconds = parseInt(seconds);
    let MM = parseInt(intergerSeconds / 60);
    if (MM < 10) MM = "0" + MM;
    let SS = intergerSeconds % 60;
    if (SS < 10) SS = "0" + SS;
    return MM + ":" + SS;
}

playPauseButton.onclick = onPlayPauseClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;
volumeSlider.onchange = onVolumeSliderChange;
progressSlider.onchange = onSongProgressChange;
progressSlider.onmousedown = onProgressMouseDown;