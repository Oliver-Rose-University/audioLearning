// create audio player object
const audioPlayer = new Audio();

// creates numerous variables, taking elements from the HTML
const playPauseButton = document.getElementById("play-button");
const progressSlider = document.getElementById("progress-slider");
const volumeSlider = document.getElementById("volume-slider");
const songProgress = document.getElementById("song-progress");
const songLength = document.getElementById("song-length");
let mixtapeBackground = document.getElementById("div1");
const nextSong = document.getElementById("next");
const previousSong = document.getElementById("previous");
let songCounter = 0;
const songTitle = document.getElementById("song-title");
const songImage = document.getElementById("song-image");
// stores if any of the sliders are changing
let sliderIsChanging = false;


const songsInfo = [
    {
        audioSource: "assets/duck1.mp3",
        title: "The Duck Song 1",
        imageSource: "assets/Duck Song 1.jpeg",
        colour: "cornflowerblue",
        border: "black",
        imageBorder: "black"
    },
    {
        audioSource: "assets/duck2.mp3",
        title: "The Duck Song 2",
        imageSource: "assets/Duck Song 2.jpg",
        colour: "cornflowerblue",
        border: "black",
        imageBorder: "black"

    },
    {
        audioSource: "assets/duck3.mp3",
        title: "The Duck Song 3",
        imageSource: "assets/Duck Song 3.jpeg",
        colour: "cornflowerblue",
        border: "black",
        imageBorder: "black"

    },
    {
        audioSource: "assets/duckChristmas.mp3",
        title: "The Christmas Duck Song",
        imageSource: "assets/Duck christmas.jpeg",
        colour: "white",
        border: "grey",
        imageBorder: "grey"

    },
    {
        audioSource: "assets/duck4.mp3",
        title: "The Duck Song 4",
        imageSource: "assets/Duck Song 4.jpeg",
        colour: "cornflowerblue",
        border: "black",
        imageBorder: "black"

    },
    {
        audioSource: "assets/duck5.mp3",
        title: "The Duck Song 5",
        imageSource: "assets/Duck Song 5.jpeg",
        colour: "orange",
        border: "orangered",
        imageBorder: "orangered"

    }
];





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
    playNextSong();
    onPlayPauseClick();
}

// changes volume
function onVolumeSliderChange(){
    audioPlayer.volume = volumeSlider.value * 0.01;
    sliderIsChanging = false;
}

// changes progress in song, stops the bar from constantly moving about while holding it
function onSongProgressChange(){
    audioPlayer.currentTime = progressSlider.value;
    updatingProgress = false;
    sliderIsChanging = false;

}

function onProgressMouseDown(){
    updatingProgress = true;
    sliderIsChanging = true;
}

function onVolumeMouseDown(){
    sliderIsChanging = true;
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
    if (songCounter === songsInfo.length - 1)
        songCounter = 0;
    else
        songCounter++;

    
    audioPlayer.src = songsInfo[songCounter].audioSource;
    songTitle.innerHTML = songsInfo[songCounter].title;
    songImage.src = songsInfo[songCounter].imageSource;

    
    mixtapeBackground.style.backgroundColor =  songsInfo[songCounter].colour;
    mixtapeBackground.style.borderColor =  songsInfo[songCounter].border;
    songImage.style.borderColor = songsInfo[songCounter].imageBorder;
    console.log(songsInfo[songCounter])
    }

    // swaps back to the previous song, looping if it is the first song
function playPreviousSong(){
    if (songCounter === 0)
        songCounter = songsInfo.length - 1;
    
    else
        songCounter--;
    audioPlayer.src = songsInfo[songCounter].audioSource;
    songTitle.innerHTML = songsInfo[songCounter].title;
    songImage.src = songsInfo[songCounter].imageSource;

    mixtapeBackground.style.backgroundColor =  songsInfo[songCounter].colour;
    mixtapeBackground.style.borderColor =  songsInfo[songCounter].border;
    songImage.style.borderColor = songsInfo[songCounter].imageBorder;
    console.log(songsInfo[songCounter])


}

// links up multiple elements to functions, with conditions to activate
playPauseButton.onclick = onPlayPauseClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;
volumeSlider.onchange = onVolumeSliderChange;
progressSlider.onchange = onSongProgressChange;
progressSlider.onmousedown = onProgressMouseDown;
volumeSlider.onmousedown = onVolumeMouseDown;
previousSong.onclick = playPreviousSong;
nextSong.onclick = playNextSong;