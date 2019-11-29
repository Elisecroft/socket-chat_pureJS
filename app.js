const express = require('express');
const app = express();
const port = 3000;

// set the template engine ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

// middlewares
app.get('/', (req, res) => {
  res.render('index');
});

// Server listening
server = app.listen(port);

// Load socket.io
const io = require('socket.io')(server);

io.on('connect', (socket) => {
  console.log('New user connected');

  // default username
  socket.username = 'Anonymous';

  //listen on change_username
  socket.on('change_username', (data) => {
    socket.username = data.username;
  });

  //listen on new_message
  socket.on('new_message', (data) => {
    //broadcast the new message
    io.sockets.emit('new_message', {message : data.message, username : socket.username});
  });

  //listen on typing
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', {username : socket.username})
  });
});
