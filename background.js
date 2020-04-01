const REFRESH_PLAY_NOW_TIME = 5000; //ms
const STREAM_STR = 'stream_';

let playerComponent = null;

let playNowInterval = null;

let stationList = {};
let nowResponse = {};
let currentStation = {
    id:-1,
    title: '',
    artist:'',
    song:'',
    qualityStreams:[32, 64, 128, 320]
};

let playerState = {
    state: PLAYER_STATE.STOP,
    volume: 50,
    isMute: false,
    quality: 128
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
        } else if(request.msg == "qualityStreamChanged") {
            qualityStreamChanged(request.quality);
            startPlay();
            sendResponse(playerState);
        }

      return true;
    });

    function updateCurrentStationInfo(){
        console.log('updateCurrentStationInfo staionId = ' + currentStation.id);
        if(currentStation.id < 0) return;
        buildQualityStrimList();
        currentStation.title = stationList[currentStation.id].title;
        currentStation.artist = nowResponse[currentStation.id].artist;
        currentStation.song = nowResponse[currentStation.id].song;

        currentStation.qualityStreams.forEach(qualityStream => {
            currentStation[''+STREAM_STR+qualityStream] = stationList[currentStation.id][''+STREAM_STR+qualityStream];
        });
    }

    function startPlay() {
        updateCurrentStationInfo();

        if($('#player').length && $('#player source').prop("src") != currentStation[STREAM_STR+playerState.quality]) {
            removePlayer();
        } 

        if(!$('#player').length) {
            $('body').append('<video id="player" controls="" autoplay="" name="media"><source id="aud" src="'+currentStation[STREAM_STR+playerState.quality]+'" type="audio/mpeg"></video>');
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

         $('#player').on('stalled', function(){
            console.log('stalled');
            console.log('src='+$('#player source').prop("src"));
            reloadPlayer();
        })
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

    function reloadPlayer(){
        stopPlay();
        startPlay();
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
                .catch(error => {
                    console.error("ERRROR:" + error);
                });
}

function updateStationInfoView() {
    chrome.runtime.sendMessage({msg:"currentStationInfoChanged", currentStation:currentStation});
}

function updatePlayerStationView() {
    chrome.runtime.sendMessage({msg:"playerStateChanged", state:playerState});
}

function buildQualityStrimList() {
    currentStation.qualityStreams = [];
    let stInf = stationList[currentStation.id];
    for(var prop in stInf){
        if(prop.indexOf(STREAM_STR) > -1) {
            currentStation.qualityStreams.push(prop.substr(STREAM_STR.length,prop.length));
        }
    }
}

function qualityStreamChanged(quality) {
    if( currentStation.qualityStreams.find((el)=> {return el == quality;}) ){
        if(playerState.quality != quality ) {
            playerState.quality = quality;
            reloadPlayer();
        }
    }
}

// chrome.runtime.onConnect.addListener(function (externalPort) {
//     externalPort.onDisconnect.addListener(function () {
//       console.log("onDisconnect")
//       // Do stuff that should happen when popup window closes here
//     })
  
//     console.log("onConnect")
//   })