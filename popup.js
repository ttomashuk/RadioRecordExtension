let playerState = {};

let playPauseBtn = null;
let stopBtn = null;
let volumeBtn = null;
let volumeSlider = null;


var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";


function onStationClick(stationId) {
    console.log('onStationClick = '+stationId);
    
    chrome.runtime.sendMessage({msg:"onStationClick", stationId: stationId}, function(currentStation){
        updateCurrentStationInfo(currentStation);
    });
}

function updateCurrentStationInfo(currentStation){
    console.log('--------- updateCurrentStationInfo -------- ');
    $("#title").html(currentStation.title);
    $("#artist").html(currentStation.artist);
    $("#song").html(currentStation.song);
}

window.onload = function() {
    chrome.runtime.sendMessage({msg: "getStationList"}, function(responce) {
        console.log('getStationList = '+responce.currentStation.id);
        updateCurrentStationInfo(responce.currentStation);
        updatePlayerState(responce.playerState);
        
        $(responce.stationList).each(function(index) {
            $("#station_list").append('<li id="station_'+index+'"><img src="'+this.icon_png +'" width="20" height="20">' + this.title + '</li>')
            $("#station_"+index).on("click", function(){onStationClick(index);});
        });
    });

    chrome.runtime.sendMessage({msg:"getPlayerState"}, updatePlayerState);
}

$(document).ready(function() {
    playPauseBtn = $("#play-btn");
    playPauseBtn.click(function() {
        chrome.runtime.sendMessage({msg:"togglePlay"}, updatePlayerState);
    });

    stopBtn = $('#stop-btn');
    stopBtn.click(function(){
        chrome.runtime.sendMessage({msg:'onStopBtnPressed'}, updatePlayerState);
    });

    volumeBtn = $("#volume-btn");
    volumeBtn.on("click", function(event,ui){
        toggleVolumeBtn();
    });

    volumeSlider = $("#volume-slider");
    volumeSlider.on("input", function(event, ui) {
        onVolumeChange(Number.parseInt(event.target.value));
    });
    volumeSlider.on("mouseover", function(){
        volumeSlider.bind(mousewheelevt, moveVolumeSlider);
    });
});

function updatePlayerState(state) {
    if(state) {
        playerState = state;
    } else {
        return;
    }

    if(playerState.isMute) {
       playerState.volume = 0; 
    }
    if(playerState.volume <= 0) { 
        volumeBtn.css('background-position', '-87px 0');
    } 
    else if (playerState.volume <= 25) {
        volumeBtn.css('background-position', '-58px 0');
    } 
    else if (playerState.volume <= 75) {
        volumeBtn.css('background-position', '-29px 0');
    } 
    else {
        volumeBtn.css('background-position', '0 0');
    };

    volumeSlider.prop('value', playerState.isMute ? 0 : playerState.volume);

    switch (playerState.state) {
        case PLAYER_STATE.PLAY:
            playPauseBtn.addClass("paused");
            stopBtn.show();
            $('#loader').hide();
            break;
    
        case PLAYER_STATE.PAUSE:
            playPauseBtn.removeClass("paused");
            break;
    
        case PLAYER_STATE.LOADING:
            stopBtn.hide();
            $('#loader').show();
            break;
        case PLAYER_STATE.STOP:
            playPauseBtn.removeClass("paused");
            stopBtn.show();
            $('#loader').hide();
            break;
    }
}

function toggleVolumeBtn(){
    chrome.runtime.sendMessage({msg:'toggleSound'}, updatePlayerState);
}

function onVolumeChange(volume){
    chrome.runtime.sendMessage({msg:"volumeChanged", volume: volume}, updatePlayerState);
}

function moveVolumeSlider(e) {
    if(e.originalEvent.wheelDelta < 0) {
        onVolumeChange(playerState.volume<10?0:playerState.volume-10);
    } else {
        onVolumeChange(playerState.volume>90?100:playerState.volume+10);
    }
    e.preventDefault();
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        console.log('POPUP: request.msg = ' + request.msg);

        if (request.msg == "currentStationInfoChanged") {
            updateCurrentStationInfo(request.currentStation);
        } else if(request.msg == "playerStateChanged") {
            updatePlayerState(request.state);
        }

      return true;
    });

    // var port = chrome.runtime.connect();