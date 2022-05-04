let rocketUp, rocketDown;

function activateTravel(event) {
    if(event.repeat) {
        return;
    }
	if (event.key === 'ArrowUp') {
        if(rocketUp > 1) {
            clearTimeout(rocketUp)
        }
        rocketUp = setTimeout(function() {
            let y = window.scrollY - 2;
            window.scrollTo(window.scrollX, y)
            activateTravel(event);
        }, 1)
    }
}

function deactivateTravel(event) {
    if (event.key === 'ArrowUp') {
        clearTimeout(rocketUp)
	}
	// if (event.key === 'ArrowDown') {
	// 	clearTimeout(rocketDown);
	// }
}

document.addEventListener('keydown', activateTravel);
document.addEventListener('keyup', deactivateTravel);