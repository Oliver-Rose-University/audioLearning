// create audio player object
const audioPlayer = new Audio();
//select play pause button element
const playPauseButton = document.getElementById("play-button");

const progressSlider = document.getElementById("progress-slider");

const volumeSlider = document.getElementById("volume-slider");

const songProgress = document.getElementById("song-progress");
const songLength = document.getElementById("song-length");
const songList = ["assets/duck1.mp3", "assets/duck2.mp3", "assets/duck3.mp3", "assets/duckChristmas.mp3", "assets/duck4.mp3", "assets/duck5.mp3"]
const songTitles = ["The Duck Song 1", "The Duck Song 2", "The Duck Song 3", "The Christmas Duck Story", "The Duck Song 4", "The Duck Song 5"]
const songImages = ["assets/Duck Song 1.jpeg", "assets/Duck Song 2.jpg", "assets/Duck Song 3.jpeg", "assets/Duck Christmas.jpeg", "assets/Duck Song 4.jpeg", "assets/Duck Song 5.jpeg"]
const nextSong = document.getElementById("next");
const previousSong = document.getElementById("previous");
let songCounter = 0;
const songTitle = document.getElementById("song-title");
const songImage = document.getElementById("song-image");


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

function playNextSong(){
    if (songCounter === songList.length - 1)
        songCounter = 0;
    else
        songCounter++;
    audioPlayer.src = songList[songCounter];
    songTitle.innerHTML = songTitles[songCounter];
    songImage.src = songImages[songCounter];
    console.log(songImages[songCounter])
    }

function playPreviousSong(){
    if (songCounter === 0)
        songCounter = songList.length - 1;
    
    else
        songCounter--;
    audioPlayer.src = songList[songCounter]
    songTitle.innerHTML = songTitles[songCounter]
    songImage.src = songImages[songCounter];
    console.log(songImages[songCounter])


}


playPauseButton.onclick = onPlayPauseClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;
volumeSlider.onchange = onVolumeSliderChange;
progressSlider.onchange = onSongProgressChange;
progressSlider.onmousedown = onProgressMouseDown;
previousSong.onclick = playPreviousSong;
nextSong.onclick = playNextSong;