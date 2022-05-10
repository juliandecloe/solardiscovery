let socket = io();
const userForm = document.querySelector('.username-form');
let usernameInput;

userForm.addEventListener('submit', e => {
    e.preventDefault();
    usernameInput = document.querySelector('#username-input').value;
    if (usernameInput.length > 0) {
        socket.emit('new user', usernameInput);
        userForm.remove();
    }
});

socket.on('new user', username => {
    console.log(username)
    console.log(`✋ ${username} has joined the chat! ✋`);
    document.querySelector('main').insertAdjacentHTML('beforeend', `
        <section id="${username}" class="rocketWrap">
            <h3>${username}</h3>
            <img class="rocket" src="img/rocket.gif" alt="A cool black with red rocket flying through space">
        </section>
    `);

    const rocketWrap = document.querySelector(`#${usernameInput}`);
    rocketWrap.style.setProperty('left', window.scrollX + (window.innerWidth / 2) - (rocketWrap.offsetWidth / 2) + 'px');
    rocketWrap.style.setProperty('top', window.scrollY + (window.innerHeight / 2) - (rocketWrap.offsetHeight / 2) + 'px');

    window.addEventListener('resize', function () {
        rocketWrap.style.setProperty('left', window.scrollX + (window.innerWidth / 2) - (rocketWrap.offsetWidth / 2) + 'px');
        rocketWrap.style.setProperty('top', window.scrollY + (window.innerHeight / 2) - (rocketWrap.offsetHeight / 2) + 'px');
    });

    //===== ROTATE ROCKET =====//

    const rocketImg = document.querySelector('#' + usernameInput + ' .rocket');
    let rect = rocketImg.getBoundingClientRect();
    let boxCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
    let angle;

    document.addEventListener("mousemove", e => {
        angle = Math.atan2(e.clientX - boxCenter.x, -(e.clientY - boxCenter.y)) * (180 / Math.PI);
        rocketImg.style.setProperty('transform', `rotate(${angle}deg)`)
    })

    //===== MOVE ON MOUSE =====//

    let mX, mY, moveTimer, toggleMove;
    const toggleHint = document.querySelector('p');
    const coordsTexts = document.querySelectorAll('header li');

    document.addEventListener("mousemove", e => {
        mX = Math.floor(e.pageX - (rocketWrap.offsetLeft + rocketWrap.offsetWidth / 2));
        mY = Math.floor(e.pageY - (rocketWrap.offsetTop + rocketWrap.offsetHeight / 2));
    });

    document.addEventListener('keypress', e => {
        if (e.code === 'Space') {
            if (!toggleMove) {
                moveTimer = setInterval(() => {
                    posX = window.scrollX + mX / 50;
                    posY = window.scrollY + mY / 50;
                    window.scrollTo(posX, posY);
                    rocketWrap.style.setProperty('left', window.scrollX + (window.innerWidth / 2) - (rocketWrap.offsetWidth / 2) + 'px');
                    rocketWrap.style.setProperty('top', window.scrollY + (window.innerHeight / 2) - (rocketWrap.offsetHeight / 2) + 'px');
                    coordsTexts[0].textContent = 'x: ' + Math.ceil(window.scrollX - 5441355);
                    coordsTexts[1].textContent = 'y: ' + Math.ceil(window.scrollY - 5119586);
                    socket.emit("position", {
                        user: username,
                        x: document.querySelector('#' + username).offsetLeft,
                        y: document.querySelector('#' + username).offsetTop,
                        rotate: angle
                    });
                    socket.on('position', pos => {
                        if (pos.user !== usernameInput) {
                            document.querySelector('#' + pos.user).style.setProperty('left', pos.x + 'px');
                            document.querySelector('#' + pos.user).style.setProperty('top', pos.y + 'px');
                            document.querySelector('#' + pos.user).style.setProperty('transform', `rotate(${pos.rotate}deg)`);
                        }
                    });
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
});