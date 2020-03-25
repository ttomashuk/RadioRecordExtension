const REFRESH_PLAY_NOW_TIME = 5000; //ms

let playerComponent = null;

let playNowInterval = null;

let stationList = {};
let nowResponse = {};
let currentStation = {
    id:-1,
    title: '',
    artist:'',
    song:'',
    qualityStream:''
};

let playerState = {
    state: PLAYER_STATE.STOP,
    volume: 50,
    isMute: false
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('request = ' + request.msg);    

        if (request.msg == "getStationList") {
            fetch('https://www.radiorecord.ru/radioapi/stations/')
                .then(response => response.json())
                .then(json => {
                    stationList = json.result;
                    sendResponse( { stationList:stationList, 
                                    currentStation:currentStation,
                                    playerState: playerState});
                })
                .catch(error => console.error(error));
        } else 
        if(request.msg == "onStationClick" && request.stationId >= 0) {
            currentStation.id = request.stationId;
            getPlayNowList().then(()=>{
                startPlay();
                sendResponse(currentStation);
            })
            .catch(error => console.error(error));
        } else if(request.msg == "getPlayerState") {
            sendResponse(playerState);
        } else if(request.msg == "volumeChanged") {
            updateVolume(request.volume);
            sendResponse(playerState);
        } else if(request.msg == "toggleSound") {
            toggleSound();
            sendResponse(playerState);
        } else if(request.msg == "togglePlay") {
            togglePlay();
            sendResponse(playerState);
        } else if(request.msg == "onStopBtnPressed") {
            stopPlay();
            sendResponse(playerState);
        }

      return true;
    });

    function updateCurrentStationInfo(){
        console.log('updateCurrentStationInfo staionId = ' + currentStation.id);
        if(currentStation.id < 0) return;
        currentStation.title = stationList[currentStation.id].title;
        currentStation.artist = nowResponse[currentStation.id].artist;
        currentStation.song = nowResponse[currentStation.id].song;
        currentStation.stream_320 = stationList[currentStation.id].stream_320;
    }

    function startPlay() {
        if($('#player').length && $('#player source').prop("src") != currentStation.stream_320) {
            removePlayer();
        } 

        if(!$('#player').length) {
            $('body').append('<video id="player" controls="" autoplay="" name="media"><source id="aud" src="'+currentStation.stream_320+'" type="audio/mpeg"></video>');
            playerComponent = $("#player");
            playerState.state = PLAYER_STATE.LOADING;
            applyPlayerParam();
            updatePlayerStationView();
            startPlayNowInterval();
        }

        $('#player').on('playing', function(){
            playerState.state = PLAYER_STATE.PLAY;
            updatePlayerStationView();
        })

        updateCurrentStationInfo();
        // $('#player').on('stalled', function(){
        //     console.log('stalled');
        //     console.log('src='+$('#player source').prop("src"));
        // })
    }

    function removePlayer() {
        if($('#player').length) {
            let audio = $('#player').get(0);
            audio.pause(0);
            let tmp = audio.src;
            audio.src = "";
            audio.load();
            $('#player').remove();    
            playerComponent = null;
            clearPlayNowInterval();
        } 
    }

    function togglePlay() {

        console.log("togglePlay: currentStation.stationId = " + currentStation.id);

        if(playerState.state == PLAYER_STATE.PLAY) {
            playerState.state = PLAYER_STATE.PAUSE;
        }else if(playerState.state == PLAYER_STATE.PAUSE) {
            playerState.state = PLAYER_STATE.PLAY;
        } else if(playerState.state == PLAYER_STATE.STOP) {
            if(currentStation.id > 0) startPlay();
        }
        applyPlayerParam();
    }

    function stopPlay() {
        playerState.state = PLAYER_STATE.STOP;
        applyPlayerParam();
    }


    function toggleSound() {
        playerState.isMute = !playerState.isMute;
        applyPlayerParam();
    }

    function updateVolume(volume) {
        if(volume >= 0 && volume <= 100) {
            playerState.volume = volume;
            if(playerState.isMute) toggleSound();
            applyPlayerParam();
        }
    }
    
    function applyPlayerParam(){
        if(playerComponent) {
            playerComponent.prop("muted", playerState.isMute);
            playerComponent.prop("volume", playerState.volume/100);

            switch (playerState.state) {
                case PLAYER_STATE.PLAY:
                    playerComponent.trigger("play");
                    break;
            
                case PLAYER_STATE.PAUSE:
                    playerComponent.trigger("pause");
                    break;
            
                case PLAYER_STATE.STOP:
                    removePlayer();
                    break;
            }
        }
    }


function startPlayNowInterval() {
    if(!playNowInterval)
        playNowInterval = setInterval(getPlayNowList, REFRESH_PLAY_NOW_TIME);
}

function clearPlayNowInterval() {
    clearInterval(playNowInterval);
    playNowInterval = null;
}

function getPlayNowList(){
    console.log('getPlayNowList request');
    return fetch('https://www.radiorecord.ru/radioapi/stations/now/')
                .then(response => response.json())
                .then(json => {
                    nowResponse = json.result;
                    updateCurrentStationInfo();
                    updateStationInfoView();
                })
                .catch(error => console.error(error));
}

function updateStationInfoView() {
    chrome.runtime.sendMessage({msg:"currentStationInfoChanged", currentStation:currentStation});
}

function updatePlayerStationView() {
    chrome.runtime.sendMessage({msg:"playerStateChanged", state:playerState});
}

// chrome.runtime.onConnect.addListener(function (externalPort) {
//     externalPort.onDisconnect.addListener(function () {
//       console.log("onDisconnect")
//       // Do stuff that should happen when popup window closes here
//     })
  
//     console.log("onConnect")
//   })