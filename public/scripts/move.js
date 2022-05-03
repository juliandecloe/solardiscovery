let rocketUp, rocketDown;

document.addEventListener('keydown', event => {
    if (event.repeat) { 
		return; 
	} 
	if (event.keyCode === 'ArrowUp') {
        rocketUp = setTimeout(function() {
            window.scrollY++
        }, 10)
	}
	if (event.keyCode === 'ArrowDown') {
		rocketDown = setTimeout(function() {
            window.scrollY--
        }, 10)
	}
});
document.addEventListener('keyup', event => {
    if (event.keyCode === 'ArrowUp') {
		clearTimeout(rocketUp);
	}
	if (event.keyCode === 'ArrowDown') {
		clearTimeout(rocketDown);
	}
});