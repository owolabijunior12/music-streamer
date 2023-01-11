let nowPlaying = document.querySelector(".now-playing");
let trackArt = document.querySelector(".track-art");
let trackNname = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");
let playpauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");
let seekSlider = document.querySelector(".seek_slider");
let volumeSlider = document.querySelector(".volume_slider");
let currTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");
let trackIndex = 0;
let isPlaying = false;
let updateTimer;
let currTrack = document.createElement('audio');
let trackList = [
        {
            name: "ZINOLEESKY to the world",
            artist: "Dj Mendy",
            image: "./image/Snapchat-463281015.jpg",
            path: "./music/DJ-Selex-Best-Of-Zinoleesky-Mixtape-(TrendyBeatz.com).mp3"
        },
        {
            name: "Shipping Lanes",
            artist: "Dj SBM",
            image: "Image URL",
            path: "./music/Rema - Bounce (Prod By Don Jazzy) Via_ 9jaflaver.com.mp3",
        },
        {
            name: "Don't call me",
            artist: "Zinoleeky ft Iboytech",
            image: "my img",
            path: "./music/Zinoleesky-Ft-Lil-Kesh-Dont-Call-Me-(TrendyBeatz.com).mp3",
        },
        {
            name: "Caro",
            artist: "Zinoleeky,naira marley ft Iboytech",
            image: "my img",
            path: "./music/Zinoleesky-Caro-ft.-Naira-Marley.mp3",
        },
        {
            name: "Kilometer",
            artist: "Zinoleeky,Buju ft Iboytech",
            image: "./image/Snapchat-1885722510.jpg",
            path: "./music/Zinoleesky-Kilometer-Remix-Ft-Buju-(TrendyBeatz.com).mp3",
        },
        {
            name: "Joromi",
            artist: "Zinoleeky ft Iboytech",
            image: "./image/IMG_20220223_061903_796.jpg",
            path: "./music/Zinoleesky-–-Joromi.mp3",
        },
        {
            name: "Mapariwo",
            artist: "Zinoleeky ft Iboytech",
            image: "my img",
            path: "./music/Zinoleesky-Mapariwo.mp3",
        }
];
console.log(trackList);

function loadTrack(trackIndex) {
    
    clearInterval(updateTimer);
    resetValues();
   
    
    currTrack.src = trackList[trackIndex].path;
    currTrack.load();
   
    
    trackArt.style.backgroundImage =
       "url(" + trackList[trackIndex].image + ")";
    trackNname.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
    nowPlaying.innerHTML =`<marquee behavior="move" direction="left">PLAYING Iboytech ${(trackIndex + 1)} OF ${trackList.length}</marquee>`
       "PLAYING Iboytech " + (trackIndex + 1) + " OF " + trackList.length;
   
    
    
    updateTimer = setInterval(seekUpdate, 1000);
   
    
    
    currTrack.addEventListener("ended", nextTrack);

  }
  console.log(loadTrack(trackIndex));

  
function resetValues() {
    currTime.textContent = "00:00";
    currTime.style.fontSize ="19px"
    totalDuration.textContent = "00:00";
    totalDuration.style.fontSize = "19px"
    seekSlider.value = 0;
}


function playpauseTrack() {
    if (!isPlaying){
       playTrack();  
    } else pauseTrack();
   
}
    function playTrack() {
    currTrack.play();
    isPlaying = true;
    playpauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
    
function pauseTrack() {    
    currTrack.pause();
    isPlaying = false;
    playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
    
function nextTrack() {    
    if (trackIndex < trackList.length - 1){
        trackIndex += 1;
    }else{
         trackIndex = 0;
    }    
    loadTrack(trackIndex);
    playTrack();
}
    
function prevTrack() {    
    if (trackIndex > 0){
           trackIndex -= 1;
    }else{
        trackIndex = trackList.length - 1;
    } 
    loadTrack(trackIndex);
    playTrack();
}


function seekTo() {
    seekTo = currTrack.duration * (seekSlider.value / 100);
    currTrack.currentTime = seekTo;
}
console.log(seekTo());
function setVolume() {    
    currTrack.volume = volumeSlider.value / 100;
}
    
function seekUpdate() {
    let seekPosition = 0;
    if (!isNaN(currTrack.duration)) {
        seekPosition = currTrack.currentTime * (100 / currTrack.duration);
        seekSlider.value = seekPosition;
        let currentMinutes = Math.floor(currTrack.currentTime / 60);
        let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currTrack.duration / 60);
        let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        currTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
loadTrack(trackIndex)