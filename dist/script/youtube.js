// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//
// Video DOM Refs
//
var videoOpen = document.getElementById('js-videoOpen');
var videoClose = document.getElementById('js-videoClose');
var videoTarget = document.getElementById('js-videoTarget');
var single = document.getElementById('single');
var carolineVideo;

// Setup Watch Button Event 
videoOpen.addEventListener('click', function(e) {
	e.preventDefault();
	console.log('video click');
	// does the video exist
	// var videoExists = carolineVideo.B;
	!carolineVideo ? addYoutubeVideo(videoTarget, '3j8ecF8Wt4E') : console.log('exists');	
	document.getElementById('single').classList.add('isPlayingVideo');
})

videoClose.addEventListener('click', function() {
	closeVideo();
	carolineVideo.pauseVideo()
});



function addYoutubeVideo(vTarget, vCode) {

	// default youtube settings
	ytSettings = {
		vHeight: 1280,
		vWidth: 720,
		vars: {
			'controls': 0,
			'modestBranding': 0,
			'showinfo': 0,
			'rel': 0,
			'autoplay': 1,
		}
	}	
	
	// add new video
	carolineVideo = new YT.Player(vTarget, {
		height: ytSettings.vHeight,
		width: ytSettings.vWidth,
		videoId: vCode,
		playerVars: ytSettings.vars,
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange,
			'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
      'onError': onPlayerError
		}
	});
}

function closeVideo(e) {
	single.classList.remove('isPlayingVideo');
}

function toggleVideo(e){
	
	// check if the video is visible
	var isVideoVisible = single.classList.contains('isPlayingVideo');
	
	// if the video is hidden, it should not be playing.
	// add the isPlaying class and play/ the video
	isVideoVisible ? single.classList.remove('isPlayingVideo') : single.classList.add('isPlayingVideo');

	// if the video is playing, pause it and vice versa
	!carolineVideo ? console.log('no video to toggle') : ( isVideoVisible ? carolineVideo.pauseVideo() : carolineVideo.playVideo() );
}


//
// YOUTUBE EVENTS
//
function onPlayerReady(event) {
	console.log('onPlayerReady');
}
function onPlayerStateChange(event) {
	console.log('state change');
}
function onPlayerPlaybackQualityChange(event) {
	console.log('playback quality change');
}
function onPlayerError(event) {
	console.log('on player error')
}

