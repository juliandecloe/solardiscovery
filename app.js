require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);
const port = process.env.PORT || 6969;

app.use(express.static(path.resolve('public')));

io.sockets.on('connection', function(socket) {
    socket.on('new user', username => {
        io.emit("new user", username);
    })
    socket.on('position', pos => {
        io.emit("position", pos);
    })
});

http.listen(port, () => {
    console.log('listening on port ', port);
})

