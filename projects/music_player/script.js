let currentSongIndex = 0;
let audio = document.getElementById("mainSong");
let musicTime = document.querySelector(".allTime");
let SongName = document.querySelector(".songname");
let Artist = document.querySelector(".artist");
let musicCover = document.querySelector(".cover");
let playBtn = document.querySelector(".playsong");
let nextBtn = document.querySelector(".nextsong");
let backBtn = document.querySelector(".backsong");
let prBar = document.querySelector(".prBar");
let crTime = document.querySelector(".currentTime");
let prFill = document.querySelector(".prFill");
let playlist = document.querySelector('.playlist-container');

let musiclist = [
    {id: 1, name: 'Creep', artist: 'RadioHead', url: 'assets/song/creep.mp3', icon: 'assets/cover/creep.jpg', time: '3:55'},
    {id: 2, name: 'Basement', artist: 'covet', url: 'assets/song/basement.mp3', icon: 'assets/cover/basement.jpg', time: '3:47'},
    {id: 3, name: 'Battle Symphony', artist: 'Linkin Park', url: 'assets/song/battlesymphony.mp3', icon: 'assets/cover/battlesymphony.jpg', time: '3:36'},
    {id: 4, name: 'In The End', artist: 'Linkin Park', url: 'assets/song/intheend.mp3', icon: 'assets/cover/intheend.jpg', time: '3:36'},
    {id: 5, name: 'Emptiness Machine', artist: 'Linkin Park', url: 'assets/song/emptinessmachine.mp3', icon: 'assets/cover/emptinessmachine.jpg', time: '3:47'}
];

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, "0");
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

function playSong(index, frompl,ft) {
    let currentSong = musiclist[index];
    audio.src = currentSong.url;
    musicCover.src = currentSong.icon;
    SongName.textContent = currentSong.name;
    Artist.textContent = currentSong.artist;
    if (ft === false){
        audio.play();
    }

	if(frompl === true){
		playBtn.src = "assets/icon/pause.png";
	}

    audio.addEventListener("timeupdate", () => {
        crTime.textContent = formatTime(audio.currentTime);
        let progress = (audio.currentTime / audio.duration) * 100;
        prFill.style.width = `${progress}%`;
    });

    audio.addEventListener("loadedmetadata", () => {
        musicTime.textContent = formatTime(audio.duration);
    });
}

function updatePlaylistUI() {
    playlist.innerHTML = `<div class="playlist-header">
        <h1>My Playlist</h1>
      </div>`;
    musiclist.forEach((song, index) => {
        let songItem = document.createElement('div');
        songItem.classList.add('song-item');
        songItem.innerHTML = `
            <div class="song-info">
                <div class="song-number">${index + 1}</div>
                <img src="${song.icon}" alt="${song.name}">
                <div>
                    <div class="song-title">${song.name}</div>
                    <div class="song-artist">${song.artist}</div>
                    <div class="song-duration">${song.time}</div>
                </div>
            </div>`;
        songItem.addEventListener("click", () => {
            currentSongIndex = index;
            playSong(currentSongIndex, true,false);
        });
        playlist.appendChild(songItem);
    });
}

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.src = "assets/icon/pause.png";
    } else {
        audio.pause();
        playBtn.src = "assets/icon/play.png";
    }
});

nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % musiclist.length;
    playSong(currentSongIndex);
});

backBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + musiclist.length) % musiclist.length;
    playSong(currentSongIndex);
});

prBar.addEventListener("click", (e) => {
    let clickPosition = e.offsetX / prBar.offsetWidth;
    audio.currentTime = clickPosition * audio.duration;
});

audio.addEventListener("ended", () => {
    nextBtn.click();
});

updatePlaylistUI();
playSong(currentSongIndex,false,true);
