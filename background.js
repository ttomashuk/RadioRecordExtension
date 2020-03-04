let stationList = {};
let nowResponse = {};
let currentStation = {
    id:-1,
    title: '',
    artist:'',
    song:''
};


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");

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
        }

      return true;
    });

    function updateCurrentStationInfo(){
        console.log('updateCurrentStationInfo staionId = ' + currentStation.id);
        currentStation.artist = nowResponse[currentStation.id].artist;
        currentStation.song = nowResponse[currentStation.id].song;
        currentStation.stream_320 = stationList[currentStation.id].stream_320;

        if($('#player').length) {
            $('#player').remove();    
        }
        $('body').append('<video id="player" controls="" autoplay="" name="media"><source id="aud" src="'+currentStation.stream_320+'" type="audio/mpeg"></video>');
        $('#player').on('canplay', function(){
            console.log('canplays');
        })

    }