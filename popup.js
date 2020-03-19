let playerState = {};

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
    chrome.runtime.sendMessage({msg: "getStationList"}, function(state) {
        console.log('getStationList = '+state.currentStation.id);
        updateCurrentStationInfo(state.currentStation);
        
        $(state.stationList).each(function(index) {
            $("#station_list").append('<li id="station_'+index+'"><img src="'+this.icon_png +'" width="20" height="20">' + this.title + '</li>')
            $("#station_"+index).on("click", function(){onStationClick(index);});
        });
    });

    chrome.runtime.sendMessage({msg:"getPlayerState"}, function(state){
        playerState = state;
        updatePlayerState();
    });
}

$(document).ready(function() {
    var btn = $(".play-btn");
    btn.click(function() {
      btn.toggleClass("paused");
      return false;
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

function updatePlayerState() {
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
}

function toggleVolumeBtn(){
    chrome.runtime.sendMessage({msg:'toggleSound'}, function(state){
        playerState = state;
        updatePlayerState();
    });
}

function onVolumeChange(volume){
    chrome.runtime.sendMessage({msg:"volumeChanged", volume: volume}, function(state) {
        playerState = state;
        updatePlayerState();
    });
}

function moveVolumeSlider(e) {
    if(e.originalEvent.wheelDelta < 0) {
        onVolumeChange(playerState.volume<10?0:playerState.volume-10);
    } else {
        onVolumeChange(playerState.volume>90?100:playerState.volume+10);
    }
    e.preventDefault();
}