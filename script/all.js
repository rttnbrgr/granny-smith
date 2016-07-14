//
// functions
//

function closeTheModal() {
	modal.classList.add('isHidden');
	single.classList.remove('isMini');
	modalOpen.innerHTML = 'info';
}
function openTheModal() {
	modal.classList.remove('isHidden');
	single.classList.add('isMini');
	modalOpen.innerHTML = 'close';
}
function toggleTheModal() {
	var modalIsHidden = modal.classList.contains('isHidden');
	modalIsHidden ? openTheModal() : closeTheModal() ;
}

//
// DOM references
//
var button = document.getElementById('js-button');
var wrapper = document.getElementById('single');
var modal = document.getElementById('js-modal');
var modalOpen = document.getElementById('js-modalOpen');
var modalClose = document.getElementById('js-modalClose');


//
// SOUNDCLOUD STRINGS
//
var trackId = 251059513;
var CLIENT_ID = 'e7ad18cc61078829bd889cce75510719';
var getTrackUrl = 'https://api.soundcloud.com/tracks/' + trackId + '?client_id=' + CLIENT_ID;





//
// soundmanager stuff
//
soundManager.onready(function() {		
	console.log('sm ready'); // SM2 is ready to go! 
});

// Initialize SDK
SC.initialize({
	client_id: CLIENT_ID
});	

// AJAX call to the soundcloud api
$.get(getTrackUrl).done(function(track){
	console.log(track);
	
	// get the avi; fix string; set it to avi src
	var avi = track.user.avatar_url;
	var avatarURL = avi.replace('-large', '-t200x200');
	document.getElementById('js-avatar').src = avatarURL;
	
	// do the same w/ artwork
	var art = track.artwork_url;
	var artworkURL = art.replace('-large', '-t500x500');
	document.getElementById('js-artwork').src = artworkURL;
	
	// Setup the sound && addEventListeners
	var sound = soundManager.createSound({
		id: 'caroline',
		url: track.stream_url + "?client_id=" + CLIENT_ID,
		stream: true,

		onpause: function() {
			console.log('sm pause');
			buttonText.innerHTML = 'PLAY';
			toggleTheModal();
		},
		onplay: function() {
			console.log('sm play');
			buttonText.innerHTML = 'PAUSE';
		},
		onresume: function() {
			console.log('sm onresume')
			buttonText.innerHTML = 'PAUSE';
		},
		onfinish: function() {
			console.log('sm finish');
			//- document.getElementById('finished').classList.remove('isHidden');
			toggleTheModal();
		},
	});		
	
	// add play/pause button
	button.addEventListener('click', function(e) {
		e.preventDefault();
		console.log('new button click');
		
		sound.togglePause();
		//- sound.togglePause();			
		//- soundManager.togglePause('caroline', {})
		//- document.getElementById('test-button').

	}, false);		

	sound.onplay
})

// 
// handle iFrame/embed controls
//
var iFramePlayButton = document.getElementsByClassName('playButton')[0];
// iFramePlayButton.addEventListener('click', function(){ 
//   console.log('paly buttn clcijakdfjkadsf');
// }, false)
var iFrame = document.getElementById('js-iframe');
iFrame.addEventListener('click', function() {
	// this.hide();
	console.log('iframe click');
})

// vars
var player = SC.Widget(document.getElementById('js-iframe'));
var button = document.getElementById('js-button');
var buttonText = button.children[0];
// btn click handler
//- button.addEventListener('click', function(e) {
//- 	e.preventDefault();
//- 	console.log('button click');
//- 	player.toggle();
//- }, false);

// 
// SOUNDCLOUD EVENTS 
//

// on ready, undim the play button
player.bind(SC.Widget.Events.READY, function() {
	console.log('is laoding');
	button.classList.remove('isLoading');
});

// on play
//- player.bind(SC.Widget.Events.PLAY, function(e){
//- 	console.log('play');
//- 	buttonText.innerHTML = 'PAUSE';
//- });

// on pause
//- player.bind(SC.Widget.Events.PAUSE, function(e){
//- 	console.log('pause');
//- 	buttonText.innerHTML = 'PLAY';
//- });

// on finish
//- player.bind(SC.Widget.Events.FINISH, function() {
//- 	document.getElementById('finished').classList.remove('isHidden');
//- });


//
// MODAL TOGGLE
//	
modalClose.addEventListener('click', closeTheModal);
modalOpen.addEventListener('click', toggleTheModal);
