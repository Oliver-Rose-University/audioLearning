// create audio player object
const audioPlayer = new Audio();

// creates numerous variables, taking elements from the HTML
const playPauseButton = document.getElementById("play-button");
const progressSlider = document.getElementById("progress-slider");
const volumeSlider = document.getElementById("volume-slider");
const songProgress = document.getElementById("song-progress");
const songLength = document.getElementById("song-length");
// Makes multiple arrays to store data that will be used for a modular format of song selection
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

// Gets the data from the song as its length, and runs it through the secondsToMMSS function to convert it into minutes and seconds
function onLoadedMetadata(){
    console.log(audioPlayer.duration);
    progressSlider.max = audioPlayer.duration;
    songLength.innerHTML = secondsToMMSS(audioPlayer.duration);
}

// constantly updates the song timer bar
function onTimeUpdate(){
    if(!updatingProgress){
        progressSlider.value = audioPlayer.currentTime;
    }
    songProgress.innerHTML = secondsToMMSS(audioPlayer.currentTime);
}

// resets the song at the end and pauses it
function onEnd(){
    progressSlider.value = 0;
    playPauseButton.innerHTML = "Play";
    playing = false;
    songProgress.innerHTML = "00:00";
}

// changes volume
function onVolumeSliderChange(){
    audioPlayer.volume = volumeSlider.value * 0.01;
}

// changes progress in song, stops the bar from constantly moving about while holding it
function onSongProgressChange(){
    audioPlayer.currentTime = progressSlider.value;
    updatingProgress = false;

}

function onProgressMouseDown(){
    updatingProgress = true;
}


// converts time into minutes and seconds, in such a way that is visibly pleasing to display
function secondsToMMSS(seconds){
    const intergerSeconds = parseInt(seconds);
    let MM = parseInt(intergerSeconds / 60);
    if (MM < 10) MM = "0" + MM;
    let SS = intergerSeconds % 60;
    if (SS < 10) SS = "0" + SS;
    return MM + ":" + SS;
}

// swaps to the next song, changing the title, image and song according to arrays to make a modular system
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

    // swaps back to the previous song, looping if it is the first song
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

// links up multiple elements to functions, with conditions to activate
playPauseButton.onclick = onPlayPauseClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;
volumeSlider.onchange = onVolumeSliderChange;
progressSlider.onchange = onSongProgressChange;
progressSlider.onmousedown = onProgressMouseDown;
previousSong.onclick = playPreviousSong;
nextSong.onclick = playNextSong;