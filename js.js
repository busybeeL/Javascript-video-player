// call initialiseMediaPlayer when page is roaded. 
document.addEventListener("DOMContentLoaded", function(){
    initialiseMediaPlayer();
}, false);

// declare empty variables 
var mediaPlayer;
var playPauseBtn;
var muteBtn;
var replay;

// initialise custome player 
function initialiseMediaPlayer(){
    // define variables as taking element 
    mediaPlayer = document.getElementById('media-video');
    playPauseBtn = document.getElementById('play-pause-button');
    muteBtn = document.getElementById('mute-button');
    replay = document.getElementById('replay-button');
    mediaPlayer.controls = false;

    //progressBar = document.getElementById('progress-bar');
    //mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);

    //when play button is clicked change play icon to pause icon 
    //also change attributes to pause
    mediaPlayer.addEventListener('play', function(){
        changeButtonType(playPauseBtn, 'pause');
        playPauseBtn.style.background = "url(./pause.png)no-repeat center";
        playPauseBtn.style.backgroundSize = "10px 15px";

    }, false);

    //when pause button is clicked change pause icon to play icon 
    //also change attributes to play
    mediaPlayer.addEventListener('pause', function(){
        changeButtonType(playPauseBtn, 'play');
        playPauseBtn.style.background = "url(./play.png)center no-repeat";
        playPauseBtn.style.backgroundSize = "80%";
    }, false);

    // when it's mute or unmute change it to each other 
    mediaPlayer.addEventListener('volumechange', function(e){
        if(mediaPlayer.muted) {
            changeButtonType(muteBtn, 'unmute');
        } else {
            changeButtonType(muteBtn, 'mute');
        }
    }, false);

    // when video ended show replay button 
    mediaPlayer.addEventListener("ended",function(){
        //var a = document.getElementById('replay-button');
        replay.style.display = 'inline-block'
    });

    // show percentage of video on the progress bar 
    mediaPlayer.ontimeupdate = function(){
        var percentage = (mediaPlayer.currentTime / mediaPlayer.duration) * 100;
        $("#custom-seekbar span").css("width", percentage+"%");
    };

    // progress bar control event 
    $("#custom-seekbar").on("click", function(e){
        var offset = $(this).offset();
        var left = (e.pageX - offset.left);
        var totalWidth = $("#custom-seekbar").width();
        var percentage = ( left / totalWidth );
        var vidTime = mediaPlayer.duration * percentage;
        mediaPlayer.currentTime = vidTime;
    });

    muteBtn.style.background ="url(./mute.png)center no-repeat";
    muteBtn.style.backgroundSize = "20px";
    muteBtn.style.marginLeft ="5px";
};

// play button toggle 
function togglePlayPause(){
    if(mediaPlayer.paused || mediaPlayer.ended) {
        changeButtonType(playPauseBtn, 'pause');
        mediaPlayer.play();
        replay.style.display = 'none'

    }
    else {
        changeButtonType(playPauseBtn, 'play')
        mediaPlayer.pause();
    }
};

// function for changing button attribute 
function changeButtonType(btn, value){
    btn.title = value;
    btn.innerHTML = value;
    btn.className = value;
}

// when stop button is clicked reset current play time and show replay button, change button type... 
function stopPlayer(){
    mediaPlayer.pause();
    mediaPlayer.currentTime = 0;
    replay.style.display = 'inline-block'
    changeButtonType(playPauseBtn, 'play');
}

// increase and decrease volume 
function changeVolume(direction) {
    if(direction === '+') mediaPlayer.volume += mediaPlayer.volume == 1 ? 0 : 0.1;
    else mediaPlayer.volume -= (mediaPlayer.volume == 0 ? 0 : 0.1);
    mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);
}


function toggleMute(){
    var btn = document.getElementById('mute-button');
    if(mediaPlayer.muted){
        changeButtonType(btn, 'mute');
        mediaPlayer.muted = false;
        btn.style.background = "url(./mute.png)no-repeat center";
        btn.style.backgroundSize = "20px";
        btn.style.marginLeft = "5px";
    }else {
        changeButtonType(btn, 'unmute');
        mediaPlayer.muted = true;
        btn.style.background = "url(./sound.png)no-repeat center";
        btn.style.backgroundSize = "10px";
        btn.style.marginLeft = "0";

    }
}



function replayMedia(){
    resetPlayer();
    mediaPlayer.play();
    replay.style.display = "none";
}

function resetPlayer(){
    //progressBar.value = 0;
    mediaPlayer.currentTime = 0;
    //changeButtonType(playPauseBtn, 'play');
}



//function updateProgressBar(){
//    var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
//    progressBar.value = percentage;
//    progressBar.innerHTML = percentage + "% played";
//};

