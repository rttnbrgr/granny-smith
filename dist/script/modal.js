//
// MODAL TOGGLE
//	
var modal = document.getElementById('finished');
var wrapper = document.getElementById('single');
var modalOpen = document.getElementById('js-modalOpen');
var modalClose = document.getElementById('js-modalClose');

modalClose.addEventListener('click', function(){
	modal.classList.add('isHidden');
	single.classList.remove('isMini');
})

// clikc buy and it shows modal
modalOpen.addEventListener('click', function(e){
	e.preventDefault();
	single.classList.add('isMini');
	modal.classList.remove('isHidden');
})