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
        console.log('===='+state.currentStation.id);
        updateCurrentStationInfo(state.currentStation);
        
        $(state.stationList).each(function(index) {
            $("#station_list").append('<li id="station_'+index+'"><img src="'+this.icon_png +'" width="20" height="20">' + this.title + '</li>')
            $("#station_"+index).on("click", function(){onStationClick(index);});
        });
    });
}