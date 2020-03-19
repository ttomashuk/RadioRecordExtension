let playerComponent = null;

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
    isPlay: false,
    volume: 50,
    isMute: false
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        console.debug('request = ' + request.msg);    

        if (request.msg == "getStationList") {
            fetch('https://www.radiorecord.ru/radioapi/stations/')
                .then(response => response.json())
                .then(json => {
                    stationList = json.result;
                    sendResponse( { stationList:stationList, 
                                    currentStation:currentStation });
                })
                .catch(error => console.error(error));
        } else 
        if(request.msg == "onStationClick" && request.stationId >= 0) {
            currentStation = {
                id: request.stationId,
                title: stationList[request.stationId].title,
                artist:'',
                song:''
            };

            fetch('https://www.radiorecord.ru/radioapi/stations/now/')
                .then(response => response.json())
                .then(json => {
                    nowResponse = json.result;
                    updateCurrentStationInfo();
                    sendResponse(currentStation)
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
        }

      return true;
    });

    function updateCurrentStationInfo(){
        console.log('updateCurrentStationInfo staionId = ' + currentStation.id);
        currentStation.artist = nowResponse[currentStation.id].artist;
        currentStation.song = nowResponse[currentStation.id].song;
        currentStation.stream_320 = stationList[currentStation.id].stream_320;

        if($('#player').length && $('#player source').prop("src") != currentStation.stream_320) {
            $('#player').remove();    
            playerComponent = null;
        } 

        if(!$('#player').length) {
            $('body').append('<video id="player" controls="" autoplay="" name="media"><source id="aud" src="'+currentStation.stream_320+'" type="audio/mpeg"></video>');
            playerComponent = $("#player");
            applyPlayerParam();
        }

        $('#player').on('canplay', function(){
            console.log('canplays');
            console.log('src='+$('#player source').prop("src"));
        })

        $('#player').on('stalled', function(){
            console.log('stalled');
            console.log('src='+$('#player source').prop("src"));
        })
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
        }
    }