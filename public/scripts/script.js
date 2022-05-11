let socket = io();

socket.on('data', data => {
    console.log(data)
    generateWorld(data);
});

function generateWorld(data) {
    const bodyTotal1 = data.reduce((accumulator, object) => {
        return accumulator + object.perihelion / 1000;
    }, 0);
    const bodyTotal2 = data.reduce((accumulator, object) => {
        return accumulator + object.meanRadius / 2;
    }, 0);
    bodyTotal = bodyTotal1 + bodyTotal2;
    document.body.style.setProperty('width', bodyTotal + 1000 + 'px');
    document.body.style.setProperty('height', bodyTotal + 1000 + 'px');
    data.forEach(asset => {
        let planet = document.querySelector(`img#${asset.englishName}`)
        planet.style.setProperty('left', (document.body.offsetWidth / 2) + (data[0].meanRadius / 4) + (asset.perihelion / 1000) + 'px');
        planet.style.setProperty('width', (asset.meanRadius / 2) + 'px');
        const sunElement = document.querySelector('#Sun');
        sunElement.style.setProperty('left', (document.body.offsetWidth / 2) - (sunElement.offsetWidth / 2) + 'px');
        pinPoints(asset);
    });
}

function pinPoints(asset) {
    document.querySelector('div#' + asset.englishName)
}

const userForm = document.querySelector('.username-form');
const toggleHint = document.querySelector('footer');
const startWrap = document.querySelector('.startmenu');
let usernameInput;

userForm.addEventListener('submit', e => {
    e.preventDefault();
    usernameInput = document.querySelector('#username-input').value;
    if (usernameInput.length > 0) {
        socket.emit('new user', usernameInput);
        startWrap.remove();
        toggleHint.style.setProperty('display', 'block');
        document.querySelector('main').style.setProperty('position', 'static');
        document.querySelector('header').style.setProperty('display', 'block');
    }
});

socket.on('new user', user => {
    document.querySelector('main').insertAdjacentHTML('beforeend', `
    <section id="${user.id}" class="rocketWrap">
        <h3>${user.username}</h3>
        <img class="rocket" src="img/rocket.gif" alt="A cool black with red rocket flying through space">
    </section>
    `);

    document.querySelectorAll('.rocketWrap').forEach(rocket => rocket.style.setProperty('display', 'block'));

    const earthElement = document.querySelector('#Earth');
    window.scrollTo(earthElement.offsetLeft + (earthElement.offsetWidth / 4), earthElement.offsetTop + (earthElement.offsetHeight / 2));

    const rocketWrap = document.querySelector(`#${socket.id}`);
    rocketWrap.style.setProperty('left', window.scrollX + (window.innerWidth / 2) - (rocketWrap.offsetWidth / 2) + 'px');
    rocketWrap.style.setProperty('top', window.scrollY + (window.innerHeight / 2) - (rocketWrap.offsetHeight / 2) + 'px');

    window.addEventListener('resize', function () {
        rocketWrap.style.setProperty('left', window.scrollX + (window.innerWidth / 2) - (rocketWrap.offsetWidth / 2) + 'px');
        rocketWrap.style.setProperty('top', window.scrollY + (window.innerHeight / 2) - (rocketWrap.offsetHeight / 2) + 'px');
    });

    //===== ROTATE ROCKET =====//

    const rocketImg = document.querySelector('#' + user.id + ' .rocket');
    let rect = rocketImg.getBoundingClientRect();
    let boxCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
    let angle;

    document.addEventListener("mousemove", e => {
        angle = Math.atan2(e.clientX - boxCenter.x, -(e.clientY - boxCenter.y)) * (180 / Math.PI);
        rocketImg.style.setProperty('transform', `rotate(${angle}deg)`);
    });

    //===== MOVE ON MOUSE =====//

    let mX, mY, moveTimer, toggleMove;
    const coordsTexts = document.querySelectorAll('header li');

    document.addEventListener("mousemove", e => {
        mX = Math.floor(e.pageX - (rocketWrap.offsetLeft + rocketWrap.offsetWidth / 2));
        mY = Math.floor(e.pageY - (rocketWrap.offsetTop + rocketWrap.offsetHeight / 2));
    });

    document.addEventListener('keypress', e => {
        if (e.code === 'Space') {
            if (!toggleMove) {
                moveTimer = setInterval(() => {
                    posX = window.scrollX + mX / 40;
                    posY = window.scrollY + mY / 40;
                    window.scrollTo(posX, posY);
                    rocketWrap.style.setProperty('left', window.scrollX + (window.innerWidth / 2) - (rocketWrap.offsetWidth / 2) + 'px');
                    rocketWrap.style.setProperty('top', window.scrollY + (window.innerHeight / 2) - (rocketWrap.offsetHeight / 2) + 'px');
                    coordsTexts[0].textContent = 'x: ' + Math.ceil(window.scrollX - 5441355);
                    coordsTexts[1].textContent = 'y: ' + Math.ceil(window.scrollY - 5119586);
                }, 10);
                toggleHint.style.setProperty('display', 'none');
                toggleMove = true;
            } else {
                clearInterval(moveTimer);
                toggleHint.style.setProperty('display', 'block');
                toggleMove = false;
            }
        }
    });
    setInterval(() => {
        if(document.querySelectorAll('.rocketWrap').length > 1) {
            socket.emit("position", {
                id: user.id,
                x: document.querySelector('#' + user.id).offsetLeft,
                y: document.querySelector('#' + user.id).offsetTop,
                rotate: angle
            });
            socket.on('position', pos => {
                if (pos.id !== socket.id) {
                    document.querySelector('#' + pos.id).style.setProperty('left', pos.x + 'px');
                    document.querySelector('#' + pos.id).style.setProperty('top', pos.y + 'px');
                    document.querySelector(`#${pos.id} .rocket`).style.setProperty('transform', `rotate(${pos.rotate}deg)`);
                }
            });
        }
    }, 100);
    socket.on('user left', user => {
        document.querySelector(`#${user.id}`).remove()
    });
});