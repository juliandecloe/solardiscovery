let socket = io();
let planetData;

socket.on('data', data => {
    planetData = data;
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
        let planet = document.querySelector(`.planet#${asset.englishName}`)
        planet.style.setProperty('left', (document.body.offsetWidth / 2) + (data[0].meanRadius / 4) + (asset.perihelion / 1000) + 'px');
        planet.style.setProperty('width', (asset.meanRadius / 2) + 'px');
        const sunElement = document.querySelector('.planet#Sun');
        sunElement.style.setProperty('left', (document.body.offsetWidth / 2) - (sunElement.offsetWidth / 2) + 'px');
        let xOrigin = planet.offsetLeft - (sunElement.offsetLeft + sunElement.offsetWidth / 2);
        let yOrigin = planet.offsetTop - (sunElement.offsetTop + sunElement.offsetHeight / 2);
        // socket.on('planet position', planet => {
        //     planet.planet.style.setProperty('left', planet.x + 'px');
        //     planet.planet.style.setProperty('top', planet.y + 'px');
        // })
        planet.style.setProperty('transform-origin', xOrigin + 'px ' + yOrigin + 'px');
        planet.style.setProperty('animation', `rotate ${asset.sideralOrbit * 1000}s linear infinite`);
    });
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

    const earthElement = document.querySelector('.planet#Earth');
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

setInterval(() => {
    planetPinPointer();
}, 10)

function planetPinPointer() {
    planetData.forEach(asset => {  
        let pinPoint = document.querySelector('.pinpoint#' + asset.englishName);
        let planet = document.querySelector(`.planet#${asset.englishName}`);
        let rectPlanet = planet.getBoundingClientRect();
        pinPoint.style.setProperty('left', rectPlanet.left + window.scrollX + planet.offsetWidth / 2 + 'px');
        pinPoint.style.setProperty('top', rectPlanet.top + window.scrollY + planet.offsetHeight / 2 + 'px');
        let rectPin = pinPoint.getBoundingClientRect();
        if(rectPin.top < 0) {
            pinPoint.style.setProperty('top', window.scrollY + 'px');
        }
        if(rectPin.left + pinPoint.offsetWidth > window.innerWidth) {
            pinPoint.style.setProperty('left', window.scrollX + window.innerWidth - pinPoint.offsetWidth + 5 + 'px');
        }
        if(rectPin.top + pinPoint.offsetHeight + 5 > window.innerHeight) {
            pinPoint.style.setProperty('top', window.scrollY + window.innerHeight - pinPoint.offsetHeight + 5 + 'px');
        }
        if(rectPin.left < 0) {
            pinPoint.style.setProperty('left', window.scrollX + 'px');
        }
        // socket.emit('planet position', { 
        //     planet: planet,
        //     x: rectPlanet.left + window.scrollX,
        //     y: rectPlanet.top + window.scrollY
        // });
    });
}  