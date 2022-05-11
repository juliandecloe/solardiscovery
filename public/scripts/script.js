let socket = io();

socket.on('data', data => {
    console.log(data)
    calculateBodysize(data);
});

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
            img.style.setProperty('left', (document.body.offsetWidth / 2) + (data[0].meanRadius / 4) + (asset.perihelion / 1000) + 'px');
            img.style.setProperty('width', (asset.meanRadius / 2) + 'px');
        })
        const sunElement = document.querySelector('#Sun');
        sunElement.style.setProperty('left', (document.body.offsetWidth / 2) - (sunElement.offsetWidth / 2) + 'px');
    });
    const earthElement = document.querySelector('#Earth');
    window.scrollTo(earthElement.offsetLeft + (earthElement.offsetWidth / 4), earthElement.offsetTop + (earthElement.offsetHeight));
}