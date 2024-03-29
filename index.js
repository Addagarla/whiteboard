const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });
const port = process.env.PORT || 4000;

app.use(express.static(__dirname + '/public'));

function onConnection(socket) {
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  socket.on('image', (data) => socket.broadcast.emit('image', data));
  socket.on('cleardrawing', (data) => socket.broadcast.emit('cleardrawing', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));