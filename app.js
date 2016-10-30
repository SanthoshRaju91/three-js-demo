/**
* Main app.js server file for serving the application
* and creating a socket connection
*/

var express = require('express');
var app = express();

//serving static files
app.use(express.static(__dirname + '/views'));

//rendering the index.html file
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/**
* Creating socket server from socket.io module
*/
var http = require('http').Server(app);
var io = require('socket.io')(http);

//establishing socket connection
io.on('connection', function(socket) {
  console.log('a user connected');

  io.emit('connected', {for: 'everyone'});

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  //listening on device orientation axes on orient socket channel.
  socket.on('orient', function(data) {
    io.emit('orient', data);
  });

});

//listening on port 3000
http.listen(3000, function(err) {
  if(!err) {
    console.log('Listening on port 3000');
  }
});
