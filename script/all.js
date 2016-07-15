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

function setAvi(scObject, target) {
	var avatarURL = scObject.user.avatar_url.replace('-large', '-t200x200');
	target.src = avatarURL;
}
function setArt(scObject, target) {
	var artworkURL = scObject.artwork_url.replace('-large', '-t500x500');
	target.src = artworkURL;
}

//
// DOM references
//
var button = document.getElementById('js-button');
var audioButton = document.getElementById('js-button');
var buttonText = button.children[0];
// modal
var modal = document.getElementById('js-modal');
var modalOpen = document.getElementById('js-modalOpen');
var modalClose = document.getElementById('js-modalClose');
// single stuff
var wrapper = document.getElementById('single');
var singleAvi = document.getElementById('js-avatar');
var singleArtwork = document.getElementById('js-artwork');

//
// SOUNDCLOUD STRINGS
//
var trackId = 251059513; // caroline by aminé
var CLIENT_ID = 'e7ad18cc61078829bd889cce75510719';
var getTrackUrl = 'https://api.soundcloud.com/tracks/' + trackId + '?client_id=' + CLIENT_ID;


//
// soundmanager stuff
//
soundManager.onready(function() {		
	console.log('sm ready'); // SM2 is ready to go! 
	audioButton.classList.remove('isLoading');
});

// Initialize SDK
SC.initialize({
	client_id: CLIENT_ID
});	

// create the soundcloud track object
var scTrack;

// AJAX call to the soundcloud api
var theTrack = $.get(getTrackUrl).done(function(track){
	
	// save the object
	scTrack = track;

	// set the artwork and avi
	setAvi(track, singleAvi);
	setArt(track, singleArtwork);
			
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
		onload: function() {
			document.getElementById('js-avatar').classList.remove('a--pulse');
			document.getElementById('js-avatar').classList.add('a--spin');
		},
		whileloading: function() {
			// document.body.style.backgroundColor = "teal"
		},
		whileplaying: function() {
			// document.body.style.backgroundColor = "orange"
			// document.getElementById('js-avatar').classList.add('a--spin')
		}
	});		
	
	// add play/pause button
	button.addEventListener('click', function(e) {
		e.preventDefault();
		console.log('new button click');
		
		document.getElementById('js-avatar').classList.add('a--pulse')
		sound.togglePause();
		//- sound.togglePause();			
		//- soundManager.togglePause('caroline', {})
		//- document.getElementById('test-button').

	}, false);
})


//
// MODAL TOGGLE
//	
modalClose.addEventListener('click', closeTheModal);
modalOpen.addEventListener('click', toggleTheModal);
