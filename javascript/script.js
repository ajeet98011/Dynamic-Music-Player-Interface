var seeking = false;

// music src
var dir = "music/";

// music list
var playlist = ["Jashn-E-Bahaaraa", "Tera Chehra Title Track Full (Audio) Song Adnan Sami Pop Album Songs (320 kbps)", "Vida Karo _ Amar Singh Chamkila _ Diljit Dosanjh, Imtiaz Ali, A. R. Rahman, Arijit, Jonita, Irshad", "Ruaan Full Song _ Tiger 3 _ Salman Khan, Katrina Kaif _ Pritam, Arijit Singh, Irshad Kamil, New Song", "Phir Chala - Official Lyric Video _ Ginny Weds Sunny _ Payal Dev _ Jubin Nautiyal", "DARD Lyrical  SARBJIT  Randeep Hooda, Aishwarya Rai Bachchan  Sonu Nigam, Jeet Gannguli, Jaani", "maana-ke-hum-yaar-nahin-duet-full-song-meri-pyaari-bindu-ayushmann-parineeti-sonu-nigam-128-ytshorts.savetube.me", "Chori Kiya Re Jiya Full Song Dabangg  Lyrical Video  Salman Khan, Sonakshi Sinha", "Official Video_ Humnava Mere Song  Jubin Nautiyal  Manoj Muntashir  Rocky - Shiv  Bhushan Kumar", "Tere Hawaale (Full Video) Laal Singh Chaddha  Aamir,Kareena  Arijit,Shilpa  Pritam,Amitabh,Advait", "Murshida  Audio Song  Begum Jaan  Arijit SIngh  Vidya Balan  Anu Malik", "Ishq Sufiyana Lyrical  The Dirty Picture  Emraan Hashmi,Vidya Balan  Vishal - Shekhar", "ishq-bulaava-full-video-hasee-toh-phasee-parineeti-sidharth-sanam-puri-shipra-goyal-128-ytshorts.savetube.me", ];

var playlist_index = 0;

// extension for different browser
var ext = ".mp3";
var agent = navigator.userAgent.toLowerCase();
if (agent.indexOf("firefox") != -1 || agent.indexOf("opera") != -1) {
    ext = ".ogg";
}

// access  all button

var mainppbtn = document.querySelector("#playpausebtn");
var nextbtn = document.querySelector("#nextbtn");
var prevbtn = document.querySelector("#prevbtn");
var repeatbtn = document.querySelector("#repeat");
var randombtn = document.querySelector("#random");

// progress bar or seekslider
var seekslider = document.querySelector("#seekslider");
var currenttimetext = document.querySelector("#currenttimetext");
var durationtimetext = document.querySelector("#durationtimetext");
var mName = document.querySelector("#mName");
var aName = document.querySelector("#aName");

var audio = new Audio();
audio.src = dir + playlist[0] + ext;
audio.loop = false;

// Music Name

var title = ["Jashn-E-Bahaaraa", "Tera Chehra", "Vida Karo", "Ruaan Full Song _ Tiger 3", "Phir Chala", "DARD Lyrical  SARBJIT ", "Mana Ki Hum Yarr Nahi", "Chori-kiya-re-jiya", "Humnava Mere", "Tere-Hawale", "Murshida", "Ishq-Sufiyan", "Ishq-Bulava"];

// image array
var poster = [
    "images/Ajeet.jpg",
    "images/Ajeet1.jpg",
    "images/Ajeet2.jpg",
    "images/Ajeet3.jpg",
    "images/Ajeet4.jpg",
    "images/Ajeet5.jpg",
    "images/Ajeet6.jpg",
    "images/Ajeet7.jpg",
    "images/Ajeet8.jpg",
    "images/Ajeet9.jpg",
    "images/Ajeet10.jpg",
    "images/Ajeet11.jpg",
    "images/Ajeet12.jpg",
];

// Artist Name

var artist = ["Javed Ali", "Adnan sami", "A. R. Rahman, Pritam, Arijit Singh", "Arijit  singh ", "Jubin Nautiyal", "Sonu nigam", "Ayushman-Khurana", "Salman Ali", "Jublin-Nautiyal", "Arijit,Shilpa  Pritam,Amitabh,Advait", "Arijit SIngh Vidya Balan Anu Malik", "Vishal - Shekhar", "Sanam-Puri-Shipra-Goyal"];

// function for music detail
function fetchMusicDetail() {
    document.querySelector("#image").setAttribute("src", poster[playlist_index]);
    mName.innerHTML = title[playlist_index];
    aName.innerHTML = artist[playlist_index];
    audio.src = dir + playlist[playlist_index] + ext;
    audio.play();
}

mName.innerHTML = title[playlist_index];
aName.innerHTML = artist[playlist_index];



// Add event listener for the main play/pause button click
mainppbtn.addEventListener("click", function playpause() {
    if (audio.paused) {
        audio.play();
        document.querySelector(".playpause").classList.add("active");
    } else {
        audio.pause();
        document.querySelector(".playpause").classList.remove("active");
    }
});

// Add event listener for space button press
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        if (audio.paused) {
            audio.play();
            document.querySelector(".playpause").classList.add("active");
        } else {
            audio.pause();
            document.querySelector(".playpause").classList.remove("active");
        }
    }
});

// function on next btn

nextbtn.addEventListener("click", function nextSong() {
    document.querySelector(".playpause").classList.add("active");
    playlist_index++;
    if (playlist_index > playlist.length - 1) {
        playlist_index = 0;
    }
    fetchMusicDetail();
})

// function on prev btn

prevbtn.addEventListener("click", function prevSong() {
    document.querySelector(".playpause").classList.add("active");
    playlist_index--;
    if (playlist_index < 0) {
        playlist_index = playlist.length - 1;
    }
    fetchMusicDetail();
})

seekslider.addEventListener("mousedown", function(event) {
    seeking = true;
    seek(event);
});

seekslider.addEventListener("mousemove", function(event) {
    seek(event);
});

seekslider.addEventListener("mouseup", function() {
    seeking = false;
})

// function for loop

repeatbtn.addEventListener("click", function loop() {
        if (audio.loop) {
            audio.loop = false;
            document.querySelector(".loop").classList.remove("active");
        } else {
            audio.loop = true;
            document.querySelector(".loop").classList.add("active");
        }
    })
    //  Event for suffle
function getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.floor(Math.random() * step1);
    return step2;
}

randombtn.addEventListener("click", function random() {
    let randomIndex = getRandomNumber(0, playlist.length - 1);
    playlist_index = randomIndex;
    fetchMusicDetail();
    document.querySelector(".playpause").classList.add("active");
});



function seek(event) {
    if (audio.duration == 0) {
        null
    } else {
        if (seeking) {
            seekslider.value = event.clientx - seekslider.offsetLeft;
            seekto = audio.duration * (seekslider.value / 100);
            audio.currentTime = seekto;
        }
    }
}



audio.addEventListener('timeupdate', function() {
    seekTimeUpdate();
});

audio.addEventListener("ended", function() {
    if (playlist_index == (playlist.length - 1)) {
        playlist_index = 0;
    } else {
        playlist_index++;
    }
    fetchMusicDetail();
});



function seekTimeUpdate() {
    if (audio.duration) {
        var nt = audio.currentTime * (100 / audio.duration);
        seekslider.value = nt;
        var curmins = Math.floor(audio.currentTime / 60);
        var cursecs = Math.floor(audio.currentTime - curmins * 60);
        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);
        if (cursecs < 10) {
            cursecs = "0" + cursecs;
        }
        if (dursecs < 10) {
            dursecs = "0" + dursecs;
        }
        if (curmins < 10) {
            curmins = "0" + curmins;
        }
        if (durmins < 10) {
            durmins = "0" + durmins;
        }
        currenttimetext.innerHTML = curmins + ":" +
            cursecs;
        durationtimetext.innerHTML = durmins + ":" + dursecs;
    } else {
        currenttimetext.innerHTML = "00" + ":" + "00";
        durationtimetext.innerHTML = "00" + ":" + "00";
    }
}

var repeatBtn = document.getElementById("repeat");

// Add click event listener to the button
repeatBtn.addEventListener("click", function() {
    // Toggle the button's class to change appearance
    this.classList.toggle("active");
});