var express = require('express');
var socket = require('socket.io');

const port = process.env.PORT || 3000;

//App setup
var app = express();


//Create a server
var server = app.listen(port, () =>{
  console.log("Connection established");
});

//Static files
app.use(express.static(__dirname + '/public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket){
  console.log("Socket connection established");

  socket.on('chat', function(data){
    let a = JSON.stringify(data);
    a += '/n';
    console.log("data:" ,a);
    io.emit('chat', data);
  });
  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });

});
