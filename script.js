

//============ START GAME ============//

var mainTitle = document.querySelector('.start h3');
var startButton = document.querySelector('.start button');
var firstTime = false;

function countDown() {
	startButton.classList.add('fade');
	if(!firstTime) {
		firstTime = true;
		mainTitle.textContent = 'Ontwijk de sterren...';
		setTimeout(function() {
			mainTitle.textContent = 'Schiet de kometen...';
			setTimeout(function() {
				mainTitle.textContent = 'Collect VR munten voor punten...';
				setTimeout(function() {
					mainTitle.textContent = 'Have fun!';
					setTimeout(function() {
						mainTitle.classList.add('fade');
						moveTargets(0);
						moveTargets(1);
						moveTargets(2);
						moveTargets(3);
						moveTargets(4);
						scoreCounter();
						moveComet();
						moveCoin();
					}, 2000);
				}, 2000);
			}, 2000);
		}, 2000);
	} else {
		mainTitle.classList.add('fade');
		moveTargets(0);
		moveTargets(1);
		moveTargets(2);
		moveTargets(3);
		moveTargets(4);
		scoreCounter();
		moveComet();
		moveCoin();
	}	
}

startButton.addEventListener('click', countDown);

//============ STARS ============//

var targetImg = document.querySelectorAll('.target');
var moveStars, increaseSpeed;
var deathChecker = false;


function moveTargets(target) {
	var timerSpeed = 1;
	var targetSpeed = 1;
	increaseSpeed = setInterval(function() {	
		timerSpeed = 1;
		if(targetSpeed >= 10) {
			targetSpeed = 10;
			clearInterval(increaseSpeed)
		} else {
			targetSpeed += 0.5;
		}
	}, 10000);

	var targetPos = Math.floor(Math.random() * (-100 + 1500 + 1) - 1500);
	targetImg[target].style.top = targetPos + 'px';
	var spaceX = 20 - ((targetImg[0].width / window.innerWidth) * 100);
	targetImg[0].style.left = Math.floor(Math.random() * spaceX) + '%';
	targetImg[1].style.left = 20 + Math.floor(Math.random() * spaceX) + '%';
	targetImg[2].style.left = 40 + Math.floor(Math.random() * spaceX) + '%';
	targetImg[3].style.left = 60 + Math.floor(Math.random() * spaceX) + '%';
	targetImg[4].style.left = 80 + Math.floor(Math.random() * spaceX) + '%';
	if(target == 0) {
		var randoSize = Math.floor(Math.random() * 3);
		if(randoSize == 1) {
			targetImg[0].classList.remove('starsize1','starsize2');
		}
		else if(randoSize == 2) {
			targetImg[0].classList.remove('starsize2');
			targetImg[0].classList.add('starsize1');
		} else if(randoSize == 3) {
			targetImg[0].classList.remove('starsize1');
			targetImg[0].classList.add('starsize2');
		}
	} else if(target == 1) {
		var randoSize = Math.floor(Math.random() * 3);
		if(randoSize == 1) {
			targetImg[1].classList.remove('starsize1','starsize2');
		}
		else if(randoSize == 2) {
			targetImg[1].classList.remove('starsize2');
			targetImg[1].classList.add('starsize1');
		} else if(randoSize == 3) {
			targetImg[1].classList.remove('starsize1');
			targetImg[1].classList.add('starsize2');
		}
	} else if(target == 2) {
		var randoSize = Math.floor(Math.random() * 3);
		if(randoSize == 1) {
			targetImg[2].classList.remove('starsize1','starsize2');
		}
		else if(randoSize == 2) {
			targetImg[2].classList.remove('starsize2');
			targetImg[2].classList.add('starsize1');
		} else if(randoSize == 3) {
			targetImg[2].classList.remove('starsize1');
			targetImg[2].classList.add('starsize2');
		}
	} else if(target == 3) {
		var randoSize = Math.floor(Math.random() * 3);
		if(randoSize == 1) {
			targetImg[3].classList.remove('starsize1','starsize2');
		}
		else if(randoSize == 2) {
			targetImg[3].classList.remove('starsize2');
			targetImg[3].classList.add('starsize1');
		} else if(randoSize == 3) {
			targetImg[3].classList.remove('starsize1');
			targetImg[3].classList.add('starsize2');
		}
	} else if(target == 4) {
		var randoSize = Math.floor(Math.random() * 3);
		if(randoSize == 1) {
			targetImg[4].classList.remove('starsize1','starsize2');
		}
		else if(randoSize == 2) {
			targetImg[4].classList.remove('starsize2');
			targetImg[4].classList.add('starsize1');
		} else if(randoSize == 3) {
			targetImg[4].classList.remove('starsize1');
			targetImg[4].classList.add('starsize2');
		}
	}

	function moveInterval() {
		moveStars = setTimeout(function() { 
			if (targetImg[target].offsetTop > window.screen.height) {
				targetPos = Math.floor(Math.random() * (-100 + 1500 + 1) - 1500);
				targetImg[target].style.top = targetPos + 'px';
				if(target == 0) {
					targetImg[0].style.left = Math.floor(Math.random() * spaceX) + '%';
					var randoSize = Math.floor(Math.random() * 3);
					if(randoSize == 1) {
						targetImg[0].classList.remove('starsize1','starsize2');
					}
					else if(randoSize == 2) {
						targetImg[0].classList.remove('starsize2');
						targetImg[0].classList.add('starsize1');
					} else if(randoSize == 3) {
						targetImg[0].classList.remove('starsize1');
						targetImg[0].classList.add('starsize2');
					}
				} else if(target == 1) {
					targetImg[1].style.left = 20 + Math.floor(Math.random() * spaceX) + '%';
					var randoSize = Math.floor(Math.random() * 3);
					if(randoSize == 1) {
						targetImg[1].classList.remove('starsize1','starsize2');
					}
					else if(randoSize == 2) {
						targetImg[1].classList.remove('starsize2');
						targetImg[1].classList.add('starsize1');
					} else if(randoSize == 3) {
						targetImg[1].classList.remove('starsize1');
						targetImg[1].classList.add('starsize2');
					}
				} else if(target == 2) {
					targetImg[2].style.left = 40 + Math.floor(Math.random() * spaceX) + '%';
					var randoSize = Math.floor(Math.random() * 3);
					if(randoSize == 1) {
						targetImg[2].classList.remove('starsize1','starsize2');
					}
					else if(randoSize == 2) {
						targetImg[2].classList.remove('starsize2');
						targetImg[2].classList.add('starsize1');
					} else if(randoSize == 3) {
						targetImg[2].classList.remove('starsize1');
						targetImg[2].classList.add('starsize2');
					}
				} else if(target == 3) {
					targetImg[3].style.left = 60 + Math.floor(Math.random() * spaceX) + '%';
					var randoSize = Math.floor(Math.random() * 3);
					if(randoSize == 1) {
						targetImg[3].classList.remove('starsize1','starsize2');
					}
					else if(randoSize == 2) {
						targetImg[3].classList.remove('starsize2');
						targetImg[3].classList.add('starsize1');
					} else if(randoSize == 3) {
						targetImg[3].classList.remove('starsize1');
						targetImg[3].classList.add('starsize2');
					}
				} else if(target == 4) {
					targetImg[4].style.left = 80 + Math.floor(Math.random() * spaceX) + '%';
					var randoSize = Math.floor(Math.random() * 3);
					if(randoSize == 1) {
						targetImg[4].classList.remove('starsize1','starsize2');
					}
					else if(randoSize == 2) {
						targetImg[4].classList.remove('starsize2');
						targetImg[4].classList.add('starsize1');
					} else if(randoSize == 3) {
						targetImg[4].classList.remove('starsize1');
						targetImg[4].classList.add('starsize2');
					}
				}
			}
			targetPos += targetSpeed;
			targetImg[target].style.top = targetPos + 'px';
			moveInterval();
			if((targetImg[target].offsetTop + 40 >= rocketImg.offsetTop && targetImg[target].offsetTop < rocketImg.offsetTop + 80) && (targetImg[target].offsetLeft + 40 >= rocketImg.offsetLeft && targetImg[target].offsetLeft < rocketImg.offsetLeft + 100)) {
				targetImg[target].classList.add('hide');
				death();
			}
		}, timerSpeed);
	}
	moveInterval()
}

function death() {
	deathChecker = true;
	rocketImg.src = 'img/explosion.gif';
	setTimeout(function() {
		targetPos = Math.floor(Math.random() * (-100 + 1500 + 1) - 1500);
		for(var i = 0; i < targetImg.length; i++) {
			targetImg[i].style.top = targetPos + 'px';
			targetImg[i].classList.remove('hide');
		}
		clearInterval(coinMovement)
		clearTimeout(moveStars);
		for(var i = 0; i < moveStars; i++) {
			clearTimeout(i);
		}
		clearInterval(increaseSpeed)
		timerSpeed = 10;
		targetSpeed = 1;
		rocketImg.src = "img/rocket.png";
		rocketPos = 47;
		rocketImg.style.left = rocketPos + '%';
		mainTitle.classList.remove('fade');
		mainTitle.textContent = 'GAME OVER';
		startButton.classList.remove('fade');
		startButton.textContent = 'RETRY';
		deathChecker = false;
		clearInterval(cometMovement)
		cometLeft = -300;
		cometTop = -300;
		cometImg.style.left = cometLeft + 'px';
		cometImg.style.top = cometTop + 'px';
		cometImg.classList.remove('hide');
		coinTop = -200;
		coinImg.style.top = coinTop + 'px';
		bulletCheck = setInterval(bulletInterval, 1);
	}, 2000)
}


//============ ROCKET ============//


var rocketImg = document.querySelector('.rocket');
var rocketPos = 47;

var rocketLeft;
var rocketRight;

function startmovingRocket(event) {
	if (event.repeat) { 
		return; 
	} 
	if (event.keyCode == 37) {
		moveLeft();
	}
	if (event.keyCode == 39) {
		moveRight();
	}
}

function moveLeft() {
	rocketLeft = setTimeout(function() {
		if(!deathChecker) {
			rocketPos = rocketPos - 0.5;
			rocketImg.style.left = rocketPos + "%";
		}
		if (rocketImg.offsetLeft <= -20) {
			rocketPos = -1;
			rocketImg.style.left = rocketPos + '%';
			clearTimeout(rocketLeft);
		}
		if(rocketLeft > 1) {
			clearTimeout(rocketLeft);
		}
		moveLeft();
	}, 10)
}

function moveRight() {
	rocketRight = setTimeout(function() {
		if(!deathChecker) {
			rocketPos = rocketPos + 0.5;
			rocketImg.style.left = rocketPos + "%";
		}
		if ((rocketImg.offsetLeft / window.innerWidth) * 100 >= 100 - ((rocketImg.width / window.innerWidth) * 100)) {
			rocketPos = 100 - ((rocketImg.width / window.innerWidth) * 100) + 1;
			rocketImg.style.left = rocketPos + '%';
			clearTimeout(rocketRight);
		}
		if(rocketRight > 1) {
			clearTimeout(rocketRight);
		}
		moveRight();
	}, 10)
}

function endmovingRocket(event) {
	if (event.keyCode == 37) {
		clearTimeout(rocketLeft);
	}
	if (event.keyCode == 39) {
		clearTimeout(rocketRight);
	}
}

function resizeWindow() {
  if ((rocketImg.offsetLeft / window.innerWidth) * 100 >= 100 - ((rocketImg.width / window.innerWidth) * 100)) {
  	rocketPos = 100 - ((rocketImg.width / window.innerWidth) * 100) + 1.2;
  	rocketImg.style.left = rocketPos + '%';
  }
}

document.addEventListener('keydown', startmovingRocket);
document.addEventListener('keyup', endmovingRocket);
window.addEventListener('resize', resizeWindow);


//============ BULLET ============//

var shootRepeat, endBullet, bulletTop, bulletImg;
var bulletImg = document.querySelectorAll('.bullet');
var cometDeath = false;
var bulletCheck = setInterval(bulletInterval, 1);

function bulletInterval() {
	if(bulletImg.length >= 1) {
		checkBullet(0);
	}
	if(bulletImg.length >= 2) {
		checkBullet(1);
	}
	if(bulletImg.length >= 3) {
		checkBullet(2);
	}
	if(bulletImg.length >= 4) {
		checkBullet(3);
	}
	if(bulletImg.length >= 5) {
		checkBullet(4);
	}
	if(bulletImg.length >= 6) {
		checkBullet(5);
	}
	if(bulletImg.length >= 7) {
		checkBullet(6);
	}
	if(bulletImg.length >= 8) {
		checkBullet(7);
	}
	if(bulletImg.length >= 9) {
		checkBullet(8);
	}	
	if(bulletImg.length >= 10) {
		checkBullet(9);
	}
	if (document.hidden) {
	    clearTimeout(shootRepeat);
	    clearTimeout(rocketRight);
	    clearTimeout(rocketLeft);
	}
}

function startShooting(event) {
	if(!deathChecker) {
		if (event.repeat) { 
			return; 
		} 
	    if (event.keyCode == 32) {
	    	shootBullet();
	    }
	}
}

function shootBullet() {
	var newBullet = document.createElement('img');
	newBullet.src = 'img/bullet.png';
	document.body.appendChild(newBullet);
	newBullet.style.left = rocketImg.offsetLeft + 48 + 'px'; 
	newBullet.classList.add('bullet'); 
	bulletImg = document.querySelectorAll('.bullet');
	if(shootRepeat > 1) {
		clearTimeout(shootRepeat);
	}		
	shootRepeat = setTimeout(function() {
		shootBullet();
	}, 250);
}

function checkBullet(el) {
	var rect = bulletImg[el].getBoundingClientRect() ;
	if(rect.top < -100) {
		bulletImg[el].parentNode.removeChild(bulletImg[el]);
	}
	if(cometImg.classList.contains('cometflip')) {
		if((rect.top <= cometImg.offsetTop + 300 && rect.top + 30 > cometImg.offsetTop + 220) && (rect.left > cometImg.offsetLeft && rect.left < cometImg.offsetLeft + 80)) {
			if(!cometDeath) {
				clearInterval(cometMovement)
				cometImg.src = 'img/explosion.gif';
				cometDeath = true;
				setTimeout(function() {
					cometLeft = -300;
					cometTop = -300;
					cometImg.style.left = cometLeft + 'px';
					cometImg.style.top = cometTop + 'px';
					cometImg.src = 'img/comet.gif';
					cometDeath = false;
				}, 2000);
			}
		}
	} else {
		if((rect.top <= cometImg.offsetTop + 300 && rect.top + 30 > cometImg.offsetTop + 220) && (rect.left > cometImg.offsetLeft + 220 && rect.left < cometImg.offsetLeft + 300)) {
			if(!cometDeath) {
				clearInterval(cometMovement)
				cometImg.src = 'img/explosion.gif';
				cometDeath = true;
				setTimeout(function() {
					cometLeft = -300;
					cometTop = -300;
					cometImg.style.left = cometLeft + 'px';
					cometImg.style.top = cometTop + 'px';
					cometImg.src = 'img/comet.gif';
					cometDeath = false;
				}, 2000);
			}
		}
	}
	

}

function stopShooting(event) {
	if (event.keyCode == 32) {
		clearTimeout(shootRepeat);
	}
}

document.addEventListener('keydown', startShooting);
document.addEventListener('keyup', stopShooting);


//============ HIDE MOUSE ============//

var mouseTimer;

function toggleMouse() {
	document.body.classList.remove('hidemouse');
	clearTimeout(mouseTimer);
	mouseTimer = setTimeout(function() {
		document.body.classList.add('hidemouse');
	}, 5000)
}

window.addEventListener('mousemove', toggleMouse);


//============ SCORE ============//

var score;
var scoreInt;
var scoreText = document.querySelector('.score');
var highscoreText = document.querySelector('.highscore');
var highscoreStore = localStorage.getItem('highscore minigame');
if(highscoreStore == undefined || highscoreStore == null) {
    var highscore = 0;
} else {
    var highscore = parseInt(highscoreStore);
    highscorePlace();
}


function scoreCounter() {
	highscoreStore = localStorage.getItem('highscore minigame');
	if(highscoreStore > 0) {
    	highscore = parseInt(highscoreStore);
    	highscorePlace();
	}

	score = 0;
	scoreInt = setInterval(function() {
		score += 1;
		if(score < 10) {
			scoreText.textContent = 'SCORE: 00000' + score;
		} else if(score < 100) {
			scoreText.textContent = 'SCORE: 0000' + score;
		} else if(score < 1000) {
			scoreText.textContent = 'SCORE: 000' + score;
		} else if(score < 10000) {
			scoreText.textContent = 'SCORE: 00' + score;
		} else if(score < 100000) {
			scoreText.textContent = 'SCORE: 0' + score;
		} else {
			scoreText.textContent = 'SCORE: ' + score;
		}
		if(score > highscore) {
			highscore = score;
			highscorePlace();
			localStorage.setItem('highscore minigame', highscore);
		}
	}, 100);
}

function highscorePlace() {
	if(highscore < 10) {
		highscoreText.textContent = 'HIGHSCORE: 00000' + highscore;
	} else if(highscore < 100) {
		highscoreText.textContent = 'HIGHSCORE: 0000' + highscore;
	} else if(highscore < 1000) {
		highscoreText.textContent = 'HIGHSCORE: 000' + highscore;
	} else if(highscore < 10000) {
		highscoreText.textContent = 'HIGHSCORE: 00' + highscore;
	} else if(highscore < 100000) {
		highscoreText.textContent = 'HIGHSCORE: 0' + highscore;
	} else {
		highscoreText.textContent = 'HIGHSCORE: ' + highscore;
	}
}


//============ COMET ============//

var cometImg = document.querySelector('.comet');
var cometLeft, cometTop;
var cometInt, cometMovement;

function moveComet() {
	var randocometTime = Math.floor(Math.random() * (20 - 5 + 1) + 5);
	cometInt = setTimeout(function() {
		clearInterval(cometMovement)
		var randoComet = Math.floor(Math.random() * 6);
		if(randoComet == 1) {
			cometImg.classList.remove('cometflip');
			cometTop = -500;
			cometLeft = -500;
			cometMovement = setInterval(function() {
				cometLeft += 1.4;
				cometTop += 1;
				cometImg.style.left = cometLeft + 'px';
				cometImg.style.top = cometTop + 'px';
				if((cometImg.offsetTop + 300 >= rocketImg.offsetTop && cometImg.offsetTop + 220 < rocketImg.offsetTop + 80) && (cometImg.offsetLeft + 220 < rocketImg.offsetLeft + 70 && cometImg.offsetLeft + 300 > rocketImg.offsetLeft + 30)) {
					cometImg.classList.add('hide');
					death();
				}
				if(cometImg.offsetTop > window.screen.height || cometImg.offsetLeft > window.innerWidth) {
					clearInterval(cometMovement)
					cometLeft = -500;
					cometTop = -500;
					cometImg.style.left = cometLeft + 'px';
					cometImg.style.top = cometTop + 'px';
				}
			}, 1)
		} else if(randoComet == 2) {
			cometImg.classList.remove('cometflip');
			cometTop = -400;
			cometLeft = -300;
			cometMovement = setInterval(function() {
				cometLeft += 1;
				cometTop += 1.5;
				cometImg.style.left = cometLeft + 'px';
				cometImg.style.top = cometTop + 'px';
				if((cometImg.offsetTop + 300 >= rocketImg.offsetTop && cometImg.offsetTop + 220 < rocketImg.offsetTop + 80) && (cometImg.offsetLeft + 220 < rocketImg.offsetLeft + 70 && cometImg.offsetLeft + 300 > rocketImg.offsetLeft + 30)) {
					cometImg.classList.add('hide');
					death();
				}
				if(cometImg.offsetTop > window.screen.height || cometImg.offsetLeft > window.innerWidth) {
					clearInterval(cometMovement)
					cometLeft = -300;
					cometTop = -300;
					cometImg.style.left = cometLeft + 'px';
					cometImg.style.top = cometTop + 'px';
				}
			}, 1)
		} else if(randoComet == 3) {
			cometTop = -300;
			cometLeft = 500;
			cometMovement = setInterval(function() {
				cometImg.classList.remove('cometflip');
				cometLeft += 1;
				cometTop += 1.5;
				cometImg.style.left = cometLeft + 'px';
				cometImg.style.top = cometTop + 'px';
				if((cometImg.offsetTop + 300 >= rocketImg.offsetTop && cometImg.offsetTop + 220 < rocketImg.offsetTop + 80) && (cometImg.offsetLeft + 220 < rocketImg.offsetLeft + 70 && cometImg.offsetLeft + 300 > rocketImg.offsetLeft + 30)) {
					cometImg.classList.add('hide');
					death();
				}
				if(cometImg.offsetTop > window.screen.height || cometImg.offsetLeft > window.innerWidth) {
					clearInterval(cometMovement)
					cometLeft = -300;
					cometTop = -300;
					cometImg.style.left = cometLeft + 'px';
					cometImg.style.top = cometTop + 'px';
				}
			}, 1)
		} else if(randoComet == 4) {
			cometImg.classList.add('cometflip');
			cometTop = -500;
			cometLeft = window.innerWidth + 500;
			cometMovement = setInterval(function() {
				cometLeft -= 1.4;
				cometTop += 1;
				cometImg.style.left = cometLeft + 'px';
				cometImg.style.top = cometTop + 'px';
				if((cometImg.offsetTop + 300 >= rocketImg.offsetTop && cometImg.offsetTop + 220 < rocketImg.offsetTop + 80) && (cometImg.offsetLeft < rocketImg.offsetLeft + 70 && cometImg.offsetLeft + 80 > rocketImg.offsetLeft + 30)) {
					cometImg.classList.add('hide');
					death();
				}
				if(cometImg.offsetTop > window.screen.height || cometImg.offsetLeft < -300) {
					clearInterval(cometMovement)
					cometLeft = -300;
					cometTop = -300;
					cometImg.style.left = cometLeft + 'px';
					cometImg.style.top = cometTop + 'px';
				}
			}, 1)
		} else if(randoComet == 5) {
			cometImg.classList.add('cometflip');
			cometTop = -500;
			cometLeft = window.innerWidth + 200;
			cometMovement = setInterval(function() {
				cometLeft -= 1.1;
				cometTop += 1.3;
				cometImg.style.left = cometLeft + 'px';
				cometImg.style.top = cometTop + 'px';
				if((cometImg.offsetTop + 300 >= rocketImg.offsetTop && cometImg.offsetTop + 220 < rocketImg.offsetTop + 80) && (cometImg.offsetLeft < rocketImg.offsetLeft + 70 && cometImg.offsetLeft + 80 > rocketImg.offsetLeft + 30)) {
					cometImg.classList.add('hide');
					death();
				}
				if(cometImg.offsetTop > window.screen.height || cometImg.offsetLeft < -300) {
					clearInterval(cometMovement)
					cometLeft = -300;
					cometTop = -300;
					cometImg.style.left = cometLeft + 'px';
					cometImg.style.top = cometTop + 'px';
				}
			}, 1)
		} else if(randoComet == 6) {
			cometImg.classList.add('cometflip');
			cometTop = -300;
			cometLeft = window.innerWidth - 500;
			cometMovement = setInterval(function() {
				cometLeft -= 1;
				cometTop += 1.5;
				cometImg.style.left = cometLeft + 'px';
				cometImg.style.top = cometTop + 'px';
				if((cometImg.offsetTop + 300 >= rocketImg.offsetTop && cometImg.offsetTop + 220 < rocketImg.offsetTop + 80) && (cometImg.offsetLeft < rocketImg.offsetLeft + 70 && cometImg.offsetLeft + 80 > rocketImg.offsetLeft + 30)) {
					cometImg.classList.add('hide');
					death();
				}
				if(cometImg.offsetTop > window.screen.height || cometImg.offsetLeft < -300) {
					clearInterval(cometMovement)
					cometLeft = -300;
					cometTop = -300;
					cometImg.style.left = cometLeft + 'px';
					cometImg.style.top = cometTop + 'px';
				}
			}, 1)
		}
		moveComet()
	}, randocometTime * 1000);
}

var coinImg = document.querySelector('.coin');
var coinText = document.querySelector('.cointext');
var coinTop, coinInt, coinMovement;

function moveCoin() {
	var randocoinTime = Math.floor(Math.random() * (20 - 5 + 1) + 5);
	coinInt = setTimeout(function() {
		clearInterval(coinMovement);
		coinTop = -200;
		var coinLeft = Math.floor(Math.random() * 100 - ((coinImg.width / window.innerWidth) * 100));
		coinImg.style.left = coinLeft + '%';
		coinMovement = setInterval(function() {
			coinTop += 1;
			coinImg.style.top = coinTop + 'px';
			if((coinImg.offsetTop + 70 >= rocketImg.offsetTop && coinImg.offsetTop < rocketImg.offsetTop + 80) && (coinImg.offsetLeft < rocketImg.offsetLeft + 70 && coinImg.offsetLeft + 100 > rocketImg.offsetLeft + 30)) {
				if(!deathChecker) {
					clearInterval(coinMovement)
					coinText.style.top = coinImg.offsetTop + 'px';
					coinText.style.left = ((coinImg.offsetLeft / window.innerWidth) * 100) + '%';
					coinText.classList.remove('hide');
					coinText.classList.add('cointextmove');
					coinTop = -200;
					coinImg.style.top = coinTop + 'px';
					score += 50;
					setTimeout(function() {
						coinText.classList.add('hide');
						coinText.classList.remove('cointextmove');
					}, 1000);
				}	
			}
			if(coinImg.offsetTop > window.screen.height) {
				clearTimeout(coinMovement);
			}
		}, 1)
		moveCoin()
	}, randocoinTime * 1000);
}




