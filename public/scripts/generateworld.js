// let socket = io();
// let messages = document.querySelector('main ul');
// let input = document.querySelector('input');

// document.querySelector('form').addEventListener('submit', event => {
//     event.preventDefault();
//     if (input.value) {
//         socket.emit('message', input.value);
//         input.value = '';
//     }
// });

// socket.on('message', message => {
//     messages.appendChild(Object.assign(document.createElement('li'), {
//         textContent: message
//     }));
//     messages.scrollTop = messages.scrollHeight;
// });

// const sendBtn = document.querySelector('form > button');

// function sendMsg() {
//     sendBtn.classList.add('send');
//     setTimeout(() => {
//         sendBtn.classList.remove('send')
//     }, 1000);
// }

// sendBtn.addEventListener('click', sendMsg);

fetchPlanets();

function fetchPlanets() {
    fetch('https://api.le-systeme-solaire.net/rest/bodies/')
        .then(response => response.json())
        .then(data => {
            filterPlanets(data);
        });
}

function filterPlanets(data) {
    sunData = data.bodies.find(asset => asset.englishName === 'Sun');
    data = data.bodies.filter(asset => asset.isPlanet);
    data.push(sunData)
    data.sort(function (a, b) {
        return b.perihelion - a.perihelion;
    });
    console.log(data)
    renderPlanets(data);
}

function renderPlanets(data) {
    data.forEach(asset => {
        document.body.insertAdjacentHTML('afterbegin', `
            <img id="${asset.englishName}" src="img/planets/${asset.englishName}.svg">
        `);
    });
    calculateBodysize(data);
}

function calculateBodysize(data) {
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
        document.querySelectorAll(`#${asset.englishName}`).forEach(img => {
            img.style.setProperty('left', (document.body.offsetWidth / 2) + (data[8].meanRadius / 4) + (asset.perihelion / 1000) + 'px');
            img.style.setProperty('width', (asset.meanRadius / 2) + 'px');
        })
        const sunElement = document.getElementById('Sun');
        sunElement.style.setProperty('left', (document.body.offsetWidth / 2) - (sunElement.offsetWidth / 2) + 'px');
    });
    const earthElement = document.getElementById('Earth');
    window.scrollTo(earthElement.offsetLeft + (earthElement.offsetWidth / 4), earthElement.offsetTop + (earthElement.offsetHeight));
}