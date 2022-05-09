const rocketImg = document.querySelector('.rocket');

//===== ROTATE ROCKET =====//

let boxBoundingRect = rocketImg.getBoundingClientRect();
let boxCenter = {
    x: boxBoundingRect.left + boxBoundingRect.width / 2,
    y: boxBoundingRect.top + boxBoundingRect.height / 2
};

document.addEventListener("mousemove", e => {
    let angle = Math.atan2(e.clientX - boxCenter.x, -(e.clientY - boxCenter.y)) * (180 / Math.PI);
    rocketImg.style.transform = `rotate(${angle}deg)`;
})

//===== MOVE ON MOUSE =====//

let mX, mY, posX, posY, moveTimer, toggleMove;
const toggleHint = document.querySelector('p');

document.addEventListener("mousemove", e => {
    mX = Math.floor(e.clientX - (rocketImg.offsetLeft + rocketImg.offsetWidth / 2));
    mY = Math.floor(e.clientY - (rocketImg.offsetTop + rocketImg.offsetHeight / 2));
});

document.addEventListener('keypress', e => {
    if(e.code === 'Space') {
        if(!toggleMove) {
            moveTimer = setInterval(() => {
                posX = window.scrollX + mX / 50;
                posY = window.scrollY + mY / 50;
                window.scrollTo(posX, posY);
            }, 10);
            toggleHint.style.setProperty('display', 'none');
            toggleMove = true;
        } else {
            clearInterval(moveTimer);
            toggleHint.style.setProperty('display', '');
            toggleMove = false;
        }
    }
});
