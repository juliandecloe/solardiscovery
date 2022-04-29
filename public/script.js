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
    data.sort(function(a, b) {
        return b.perihelion - a.perihelion;
    });
    console.log(data)
    renderPlanets(data);
}

function renderPlanets(data) {
    data.forEach(asset => {
        document.body.insertAdjacentHTML('afterbegin', `
            <img id="${asset.englishName}" src="img/${asset.englishName}.svg">
        `);
        document.querySelector('img').style.setProperty('width', (asset.meanRadius / 1000) + 'px');
        document.querySelector('img').style.setProperty('left', (asset.perihelion / 10000) + 'px');
    });
    calculateBodysize(data);
}

function calculateBodysize(data) {
    const bodyTotal1 = data.reduce((accumulator, object) => {
        return accumulator + object.perihelion / 10000;
    }, 0);
    const bodyTotal2 = data.reduce((accumulator, object) => {
        return accumulator + object.meanRadius / 1000 * 40;
    }, 0);
    bodyTotal = bodyTotal1 + bodyTotal2;
    document.body.style.setProperty('width', bodyTotal + 1000 + 'px');
    document.body.style.setProperty('height', bodyTotal + 1000 + 'px');
    data.forEach(asset => {
        document.querySelectorAll(`#${asset.englishName}`).forEach(img => {
            img.style.setProperty('left', (document.body.offsetWidth / 2) + (asset.perihelion / 10000) + 'px');
        })
    });
    window.scrollTo(document.body.offsetWidth / 2, document.body.offsetHeight / 2);
}