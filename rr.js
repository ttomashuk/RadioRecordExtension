<html><head>
<title>Radio Record</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<script src="/cdn-cgi/apps/head/6M5gzNKdGC0brTdt2lpQos4w9u4.js"></script><link rel="stylesheet" type="text/css" href="/player/css/player.css?v=96">
<link rel="stylesheet" type="text/css" href="/player/css/jquery.svg.css?v=10">
<link rel="stylesheet" type="text/css" href="/player/css/jquery-ui-slider.css">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover">
<meta content="IE=Edge" http-equiv="X-UA-Compatible">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js"></script>
<script src="/player/js/jquery-ui.js"></script>
<script type="text/javascript" src="/player/js/jquery.svg.js?v=1"></script>
<script type="text/javascript" src="/player/js/uppod.js?v=1"></script>
<script type="text/javascript" src="/player/js/audioplayer.js?v=2"></script>
<script type="text/javascript" src="/player/js/circle-progress.js?v=1"></script>
<script type="text/javascript" src="/player/js/jquery.mousewheel.js?v=1"></script>
<script type="text/javascript" src="https://vk.com/js/api/share.js?93" charset="windows-1251"></script>
<script src="vkuiconnect.js"></script>
</head><body>
<script>
vkuiConnect.send('VKWebAppInit');
</script>
<div id="sections" class="sections_home">
<a href="#" onclick="Section(0); return false;"><div id="sections_item" class="sections_item sections_item_0">РАДИО</div></a>
<a href="#" onclick="Section(1); Music('hide'); return false;"><div id="sections_item" class="sections_item sections_item_1 sections_item_2">ПОДКАСТЫ</div></a>
<a href="#" onclick="Section(1); return false;"><div id="sections_back" class="sections_back">НАЗАД<div id="sections_back_icon"></div></div></a>
</div>
<div id="wrap_content">
<div id="wi_content">
<div id="content" class="content scroll"><div id="content_padding">
<div id="lists" class="lists lists_stations"></div>
</div></div>
<div id="content" class="content scroll"><div id="content_padding">
<div id="lists" class="lists lists_podcasts"></div>
</div></div>
<div id="content" class="content">
<div id="info_podcast" class="scroll">
<div id="info_podcast_name"><div id="info_podcast_section">ПОДКАСТЫ</div><div id="info_podcast_title"></div></div>
<div id="info_podcast_tracks"><div id="lists" class="lists lists_podcasts_tracks"></div></div>
</div>
<div id="info_podcast_cover"></div>
</div>
</div>
</div>
<a href="#" onclick="Music('show'); return false;"><div id="music_mini">
<div id="music_mini_seek"></div>
<div id="music_mini_name"><div id="music_mini_artist">RECORD DANCE RADIO</div><div id="music_mini_song"></div></div>
<div id="music_mini_volume"></div>
<a href="#" onclick="Share(); return false;"><div id="music_mini_vk"></div></a>
<a href="#" onclick="onToggle(); return false;"><div id="music_mini_play"><div class="music_mini_play_progress"></div><div id="music_mini_play_circle"><div id="music_mini_play_ic"></div></div></div></a>
</div></a>
<div id="music">
<div id="music_cover"><div id="music_cover_blur"></div><div id="music_cover_img"></div></div>
<div id="music_seek"><div id="music_seek_time_0">00:00</div><div id="music_seek_time_1">00:00</div></div>
<div id="music_name"><div id="music_name_h"><div id="music_title">Radio Record</div><div id="music_artist"></div><div id="music_song"></div></div></div>
<div id="music_control">
<a href="#" onclick="onToggle(); return false;"><div id="music_play"><div class="music_play_progress"></div><div id="music_play_circle"><div id="music_play_ic"></div></div></div></a>
<a href="#" onclick="onSkip('prev'); return false;"><div id="music_skip_round" class="music_skip_round prev"><div id="music_skip" class="prev"></div></div></a>
<a href="#" onclick="onSkip('next'); return false;"><div id="music_skip_round" class="music_skip_round next"><div id="music_skip" class="next"></div></div></a>
</div>
<div id="music_volume"></div>
<a href="#" onclick="Share(); return false;"><div id="music_vk"></div></a>
<a href="#" onclick="Music('hide'); return false;"><div id="music_down_round"><div id="music_down"></div></div></a>
<div id="audioplayer"></div>
</div>
<div id="error">
<div id="error_message">
<div id="error_message_text">К сожалению, воспроизведение не поддерживается в приложении ВКонтакте для Android, но Вы можете воспользоваться альтернативным способом</div>
<a href="/player/?mobile=1" target="_blank"><div id="error_message_send">Перейти</div></a>
<a href="#" onclick="Error('hide'); return false;"><div id="error_message_hide">Отмена</div></a>
</div>
</div>
</body></html>
<script type="text/javascript">
var isMobile = {Android:function() {return navigator.userAgent.match(/Android/i);}, BlackBerry:function() {return navigator.userAgent.match(/BlackBerry/i);}, iOS:function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);}, Opera:function() {return navigator.userAgent.match(/Opera Mini/i);}, Windows:function() {return navigator.userAgent.match(/IEMobile/i);}, any:function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }};

AudioPlayer();

function AudioPlayer() {
  vars={ comment:"Radio Record", file:"http://air2.radiorecord.ru:805/rr_320", m:"audioplayer", uid:"audioplayer", st:"uppodaudio" };
  AudioPlayer = new Uppod(vars);
  document.getElementById('audioplayer').addEventListener('play', AudioPlayerPlay, false);
  document.getElementById('audioplayer').addEventListener('stop', AudioPlayerStop, false);
  document.getElementById('audioplayer').addEventListener('pause', AudioPlayerPause, false);
  document.getElementById('audioplayer').addEventListener('end', AudioPlayerEnd, false);
  document.getElementById('audioplayer').addEventListener('player_error', AudioPlayerError, false);
};

$('.music_mini_play_progress').circleProgress({value:0, size:40, thickness:2, fill:{color:"#FF6000"}, startAngle:0 });
$('.music_play_progress').circleProgress({value:0, size:60, thickness:2, fill:{color:"#FF6000"}, startAngle:0 });
$('#wi_content').css({'width':'' + window.innerWidth * 3+ 'px'});
$('.content').css({'width':'' + parseInt(window.innerWidth) + 'px'});
$('#music').css({'height':'' + parseInt(window.innerHeight) + 'px'});
$('.content').css({'height':'' + parseInt(window.innerHeight) - parseInt(120) + 'px'});

window.addEventListener("orientationchange", function() {
  $('#wi_content').css({'width':'' + window.innerWidth * 3+ 'px'});
  $('.content').css({'width':'' + parseInt(window.innerWidth) + 'px'});
  $('#music').css({'height':'' + parseInt(window.innerHeight) + 'px'});
  $('.content').css({'height':'' + parseInt(window.innerHeight) - parseInt(120) + 'px'});
});

if (navigator.userAgent.search(/Firefox/) > 0) {
  $('.scroll').bind('mousewheel', function (e) {
    var nt = $(this).scrollTop()-(e.deltaY*e.deltaFactor*3);
    e.preventDefault(); 
    e.stopPropagation(); 
    $(this).stop(true).animate({scrollTop :nt}, 200, 'easeOutQuad');
  });
}


var station = {prefix:'rr', playlist:[]}; //prefix.station
var track = {i:null, podcast_id:null}; //i.array, id.podcasts
var playlist = {on:[], podcast:[], podcast_id:null}; //Плейлист играет сейчас, подготовленный для проигрывания
var share = {title:null, image:null, podcast:null}; //Информация о играющем треке для Поделиться
var user_stations = [];
var volume = 1; AudioPlayer.Volume(volume);
var mouse_seek = 0;
var section_id = 0;

getStations();


Section(0); Music('radio'); getStationsNow(); getPodcasts();

function onStation(prefix) {
  if (station['prefix'] == prefix) {
    onToggle();
  } else {
    station['prefix'] = prefix; track['i'] = null;
    AudioPlayer.Play("http://air.radiorecord.ru:805/"+prefix+"_320"); AudioPlayerPlay();
    getStationsNow();
    Music('radio');
    $.ajax({type:'GET', dataType:'json', url:'//www.radiorecord.ru/radioapi/stations/', success:function(data) {
      for (i = 0; i < data.result.length; i++) {
       if (data.result[i].prefix == prefix) {
         $('#music_title').html(data.result[i].title);
       }
      }
    }});
  }
};

function onTrack(i, podcasts) {
  if (track['i'] == i && track['podcast_id'] == podcasts) {
    onToggle();
  } else {
    if (podcasts != null && track['podcast_id'] != podcasts) {
      track['podcast_id'] = podcasts;
      playlist['on'] = playlist['podcast'].slice(0);
    }
    var data = playlist['on'];
    if (i < data.length) {
      track['i'] = i; station['prefix'] = null;
      AudioPlayer.Play(data[i].link); AudioPlayerPlay();
      Title(data[i].artist, data[i].song, data[i].cover);
      Music('track');
    $('#music_title').html("");
    } else {
      onTrack(0, null);
    }
  }
};

function getStations() {
  $.ajax({type:'GET', dataType:'json', url:'//www.radiorecord.ru/radioapi/stations/', success:function(datas) {
    data = datas.result;
    $('.lists_stations').html('');
    var stations_list_user = [], stations_list = [];
    for (i = 0; i < data.length; i++) {
      if (user_stations.indexOf(data[i].prefix) != -1) {
        stations_list_user.push({prefix:data[i].prefix, title:data[i].title, icon:data[i].icon, news:data[i].new, bind:1});
      } else {
        stations_list.push({prefix:data[i].prefix, title:data[i].title, icon:data[i].icon, news:data[i].new, bind:0});
      }
    }
    station['playlist'] = stations_list_user.concat(stations_list);
    var datalist = station['playlist'];
    for (i = 0; i < datalist.length; i++) {
      $(".lists_stations").append('<a href="" onclick="onStation(\''+datalist[i].prefix+'\'); return false;"><div id="station" class="station station_'+datalist[i].prefix+'"><div id="station_circle"><div id="station_circle_border"></div><div class="station_circle_progress station_circle_progress_'+datalist[i].prefix+'"></div><div id="station_circle_icon"><div id="station_icon" class="station_icon_'+i+'"></div></div><div class="station_new_'+datalist[i].prefix+'"></div></div><div id="station_title">'+datalist[i].title+'</div></div></a>');
      $('.station_icon_'+i).svg({loadURL: datalist[i].icon.replace("http://","//")+'?v=4'});
      if (datalist[i].news == true) { $('.station_new_'+datalist[i].prefix).html('<div id="station_new">NEW</div>'); }
      if (datalist[i].bind == 1) { $('.station_'+datalist[i].prefix).addClass('bind'); }
    }
    $('.station_circle_progress').circleProgress({value:0, size:88, thickness:2, fill:{color:"#FF6000"}, startAngle:0 });
    if (station['prefix'] && AudioPlayer.getStatus() == 1) { AudioPlayerPlay(); }
  }});
};

function getStationsNow() {
  $.ajax({type:'GET', dataType:'json', url:'https://www.radiorecord.ru/radioapi/stations/now/', success:function(datas) {
    data = datas.result;
    for (i = 0; i < data.length; i++) {
      if (station['prefix'] == data[i].prefix) {
        Title(data[i].artist, data[i].song, data[i].image600);
      }
    }
  }});
};
var TimerStationsNow = setInterval(function() {
  getStationsNow();
}, 30000);

function getPodcasts() {
  $.ajax({type:'GET', dataType:'json', url:'//www.radiorecord.ru/radioapi/podcasts/', success:function(datas) {
    $('.lists_podcasts').html('');
    data = datas.result;
    if (data != null) {
      for (i = 0; i < data.length; i++) {
        $(".lists_podcasts").append('<a href="#" onclick="getPodcastsTracks(\''+data[i].id+'\'); return false;"><div id="podcast" class="podcast podcast_'+data[i].id+'"><div id="podcast_cover" class="podcast_cover_'+i+'"></div><div id="podcast_title">'+data[i].name.toUpperCase()+'</div></div></a>');
        $('.podcast_cover_'+i).css({'backgroundImage':'url('+data[i].cover.replace("http://","//")+')'});
      }
          }
  }});
};

function getPodcastsTracks(id) {
  $.ajax({type:'GET', dataType:'json', url:'//www.radiorecord.ru/radioapi/podcast/?id='+id, success:function(datas) {
    $('#info_podcast_cover').css({'backgroundImage':'url('+datas.result.cover.replace("http://","https://")+')'});
    $('#info_podcast_title').html(datas.result.name.toUpperCase());
    $('.lists_podcasts_tracks').html("");
    data = datas.result.items;
    if (data != null) {
      for (i = 0; i < data.length; i++) {
        $(".lists_podcasts_tracks").append('<a href="#" onclick="onTrack(\''+i+'\', \''+id+'\'); return false;"><div id="track" class="track track_'+i+'"><div id="track_circle"><div id="track_circle_border"></div><div class="track_circle_progress track_circle_progress_'+i+'"></div><div id="track_play"></div></div><div id="track_title" class="track_title_'+i+'"></div><div id="track_time" class="track_time_'+i+'"></div></div></a>');
        if (data[i].title == datas.result.name) { $('.track_title_'+i).html(data[i].song); } else { $('.track_title_'+i).html(data[i].title+' - '+data[i].song); }
        if (data[i].time != 0) { $('.track_time_'+i).html(time_music(data[i].time)); }
        if (track['i'] == i && track['podcast_id'] == id && AudioPlayer.getStatus() == 1) { $('.track_'+i).addClass('select'); };
        playlist['podcast'][i] = {artist:data[i].title, song:data[i].song, link:data[i].link, cover:datas.result.cover};
      }
      $('.track_circle_progress').circleProgress({value:0, size:40, thickness:2, fill:{color:"#FF6000"}, startAngle:0 });
      if (track['podcast_id'] == id && AudioPlayer.getStatus() == 1) { $('.track_circle_progress_'+track['i']).circleProgress({ value:1 }); }
      Section(2);
      playlist['podcast_id'] = id;
      $('#info_podcast').scrollTop(0);
    }
  }});
};

function Title(artist, song, cover) {
  if (artist) {
    $('#music_mini_artist').html(artist.toUpperCase());
    $('#music_mini_song').html(song);
    $('#music_artist').html(artist.toUpperCase());
    $('#music_song').html(song);
      }
  if (cover) {
    $('#music_cover_blur').css({'backgroundImage':'url('+cover+')'});
    $('#music_cover_img').css({'backgroundImage':'url('+cover+')'});
  }
  share['podcast'] = 0;
  if (track['i']) {
    var record = ['5758', '6229'];
    var record_club = ['5988', '5975', '5774', '5978', '5987', '5761', '5983', '6160', '5760', '5977', '5762', '5980', '6213', '6231', '6033', '5770', '5764', '5771', '6172', '5981', '6171', '5984', '5986', '5995', '6175', '5985', '5982', '5773', '5871'];
    var search_title = null;
    if (record.indexOf(track['podcast_id']) != '-1') { search_title = 'Radio Record'; }
    if (record_club.indexOf(track['podcast_id']) != '-1') { search_title = 'Record Club'; }
    if (song && search_title) { song = search_title+' '+song; share['podcast'] = 1; }
  }
  share['title'] = artist; if (song) { share['title'] += ' - '+song }
  share['image'] = cover;
};

function Share() {
  if (share['podcast'] == 1) {
    var url = encodeURIComponent('https://vk.com/audios-1959?q= '+encodeURIComponent(share['title']));
  } else {
    var url = encodeURIComponent('https://vk.com/search?per_page=200&q='+encodeURIComponent(share['title'])+'&section=audio');
  }
  var title = 'Мне понравился трек '+encodeURIComponent(share['title']);
  var image = share['image'];
    window.open('https://vk.com/share.php?url='+url+'&title='+title+'&image='+image+'&noparse=true', '', 'width=650,height=600,top='+((screen.height-600)/2)+',left='+((screen.width-650)/2)+'');
  };

function Music(section) {
  if (section == 'show') {
    $("#music").removeClass('hide').addClass('show');
  } else if (section == 'hide') {
    $("#music").addClass('hide');
  } else if (section == 'radio') {
    $('#music_seek').hide();
    $('#music_mini_seek').hide();
    $('.music_skip_round').hide();
  } else if (section == 'track') {
    $('#music_seek').show();
    $('#music_mini_seek').show();
    $('.music_skip_round').show();
  }
};


function onToggle() {
  if (AudioPlayer.getStatus() == 0 || AudioPlayer.getStatus() == 2) {
    if (station['prefix']) {
      AudioPlayer.Play("http://air.radiorecord.ru:805/"+station['prefix']+"_320?rand="+Rand());
    } else {
      AudioPlayer.Play();
    }
  } else {
    AudioPlayer.Pause();
  }
};

function onSkip(id) {
  if (station['prefix'] != null) {
    var station_i = station['playlist'].indexOf(station['playlist'].find(item => item.prefix === station['prefix']));
    if (id == 'next') {
      var i = parseInt(station_i) + parseInt(1);
    } else {
      var i = parseInt(station_i) - parseInt(1);
    }
    if (i < 0) { i = parseInt(station['playlist'].length) - parseInt(1); }
    if (i >= station['playlist'].length) { i = 0 }
    setTimeout(function() { onStation(station['playlist'][i]['prefix']); }, 100);
  } else if (track['i'] != null) {
    if (id == 'next') {
      var i = parseInt(track['i']) + parseInt(1);
    } else {
      var i = parseInt(track['i']) - parseInt(1);
    }
    if (i < 0) { i = 0; }
    setTimeout(function() { onTrack(i, null); }, 100);
  }
};


function AudioPlayerEnd() {
  if (track['i'] != null) {
    onSkip('next');
  }
};
function AudioPlayerPlay() {
  $('#music_mini_play').removeClass('play');
  if (station['prefix'] != null) {
    $('.station').removeClass('select');
    $('.station_'+station['prefix']).addClass('select');
    $('.station_circle_progress').circleProgress({ value:0 });
    $('.station_circle_progress_'+station['prefix']).circleProgress({ value:1 });
    $('.track').removeClass('select');
  }
  if (track['i'] != null && playlist['podcast_id'] == track['podcast_id']) {
    $('.track').removeClass('select');
    $('.track_'+track['i']).addClass('select');
    $('.station').removeClass('select');
    $('.track_circle_progress').circleProgress({ value:0 });
    $('.track_circle_progress_'+track['i']).circleProgress({ value:1 });
  }
  $('#music_mini_play').addClass('play');
  $('#music_play').addClass('play');
  $('.music_mini_play_progress').circleProgress({ value:1 });
  $('.music_play_progress').circleProgress({ value:1 });
};
function AudioPlayerStop() {
  if (station['prefix'] != null) {
    $('.station_'+station['prefix']).removeClass('select');
  }
  if (track['i'] != null && playlist['podcast_id'] == track['podcast_id']) {
    $('.track_'+track['i']).removeClass('select');
    $('.track_circle_progress_'+track['i']).circleProgress({ value:0 });
  }
  $('#music_mini_play').removeClass('play');
  $('#music_play').removeClass('play');
  $('.music_mini_play_progress').circleProgress({ value:0 });
  $('.music_play_progress').circleProgress({ value:0 });
};
function AudioPlayerPause() {
  if (station['prefix'] != null) {
    $('.station_'+station['prefix']).removeClass('select');
  }
  if (track['i'] != null && playlist['podcast_id'] == track['podcast_id']) {
    $('.track_'+track['i']).removeClass('select');
    $('.track_circle_progress_'+track['i']).circleProgress({ value:0 });
  }
  $('#music_mini_play').removeClass('play');
  $('#music_play').removeClass('play');
  $('.music_mini_play_progress').circleProgress({ value:0 });
  $('.music_play_progress').circleProgress({ value:0 });
};

function AudioPlayerError() {
  if (isMobile.Android()) {
    Error('show');
  }
};

var TimerSeek = setInterval(function() {
  if (mouse_seek == 0) {
    if (track['i'] != null || AudioPlayer.Duration() > 0) {
      var current = AudioPlayer.CurrentTime();  
      var duration = AudioPlayer.Duration();
      var play = current/duration * 100;
      if (play != 100) {
        $("#music_seek").slider("value", play*100);
        $("#music_mini_seek").slider("value", play*100);
        $('#music_seek_time_0').html(time_music(AudioPlayer.CurrentTime()));
        $('#music_seek_time_1').html(time_music(AudioPlayer.Duration()));
      }
    } else {
      $("#music_seek").slider("value", 0);
      $("#music_mini_seek").slider("value", 0);
    }
  }
}, 1000);

var TimerVolume = setInterval(function() {
  AudioPlayer.Volume(volume);
}, 100);

$('#music_seek').slider({ animate:true, range:'min', max:10000, value:0 });
$('#music_seek').on( "slidestart", function(event, ui) { mouse_seek = 1; } );
$('#music_seek').on( "slidestop", function(event, ui) {
  var seek = ui.value / 100 * AudioPlayer.Duration() / 100;
  AudioPlayer.Seek(seek);
  mouse_seek = 0;
});

$('#music_mini_seek').slider({ animate:true, range:'min', max:10000, value:0 });
$('#music_mini_seek').on( "slidestart", function(event, ui) { mouse_seek = 1; } );
$('#music_mini_seek').on( "slidestop", function(event, ui) {
  var seek = ui.value / 100 * AudioPlayer.Duration() / 100;
  AudioPlayer.Seek(seek);
  mouse_seek = 0;
});


$('#music_volume').slider({ animate:true, range:'min', value:100 });
$('#music_volume').on("slide", function(event, ui) {
  var val = ui.value/100;
  volume = val.toFixed(1);
  AudioPlayer.Volume(volume);
  $("#music_mini_volume").slider("value", ui.value);
});

$('#music_mini_volume').slider({ animate:true, range:'min', value:100 });
$('#music_mini_volume').on("slide", function(event, ui) {
  var val = ui.value/100;
  volume = val.toFixed(1);
  AudioPlayer.Volume(volume);
  $("#music_volume").slider("value", ui.value);
});


function Error(section) {
  if (section == 'show') {
    $("#error").animate({opacity:'show'}, 100);
  } else if (section == 'hide') {
    $("#error").animate({opacity:'hide'}, 100);
  }
};

function Section(id) {
  var w = window.innerWidth * id;
  $('#wi_content').css({'transform':'translate(-'+w+'px, 0)', '-webkit-transform':'translate(-'+w+'px, 0)', '-ms-transform':'translate(-'+w+'px, 0)'});
  $('.sections_item').removeClass('select');
  $('.sections_item_'+id).addClass('select');
  if (id == 2) {
    $('.sections_back').show();
    $('.sections_item').hide();
  } else {
    $('.sections_item').show();
    $('.sections_back').hide();
  }
  section_id = id;
};

var startx_sections = 0;
var dist_sections = 0;

var touch_content = document.getElementById('wrap_content');
touch_content.addEventListener('touchstart', function(event) { touchSections('start', event); }, false);
touch_content.addEventListener('touchmove', function(event) { touchSections('move', event); }, false);
touch_content.addEventListener('touchend', function(event) { touchSections('end', event); }, false);

function touchSections(section, event) {
  if (section == 'start') { var touchobj = event.changedTouches[0]; startx_sections = parseInt(touchobj.clientX); dist_sections = 0; }
  if (section == 'move') { var touchobj = event.changedTouches[0]; dist_sections = parseInt(touchobj.clientX) - startx_sections; }
  if (section == 'end') {
    if (dist_sections > 100 && section_id > 0) {
      var id = parseInt(section_id) - parseInt(1);
      Section(id);
    } else if (dist_sections < -100 && section_id < 2) {
      if (section_id == 1 && playlist['podcast_id'] == null) {} else {
      var id = parseInt(section_id) + parseInt(1);
      Section(id);
      }
    }
  }
};

var touch_music = document.getElementById('music');
touch_music.addEventListener('touchstart', function(event) { touchMusic('start', event); }, false);
touch_music.addEventListener('touchmove', function(event) { touchMusic('move', event); }, false);
touch_music.addEventListener('touchend', function(event) { touchMusic('end', event); }, false);

function touchMusic(section, event) {
  if (section == 'start') { var touchobj = event.changedTouches[0]; startx_sections = parseInt(touchobj.clientY); dist_sections = 0; }
  if (section == 'move') { var touchobj = event.changedTouches[0]; dist_sections = parseInt(touchobj.clientY) - startx_sections; }
  if (section == 'end') {
    if (dist_sections > 100) {
      Music('hide');
    }
  }
};

function Rand() {
  return Math.floor(Math.random() * (99999999 - 0 + 1)) + 0;
};

function time_music(time) {
  var m = Math.floor(time / 60);
  var s = Math.floor(time % 60);
  if (s < 10) {
    s = '0'+s;
  }
  return m+':'+s;
};
function time_history(time) {
  var ch = new Date(time * 1000).getHours();
  var m = new Date(time * 1000).getMinutes();
  if (m < 10) {
    m = '0'+m;
  }
  return ch+':'+m;
};



</script>