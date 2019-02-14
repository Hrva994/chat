var express = require('express');
var socket = require('socket.io');
const path = require('path');

const port = process.env.PORT || 3000;
//const index = path.join(__dirname,'/public/index.html');

//App setup
var app = express();
  // .use(express.static(__dirname + '/public'))
  // .listen(port, () => console.log(`Listening on port ${port}`));


//Create a server
var server = app.listen(port, () =>{
  var port1 = server.address().port;
  console.log("Connection established", port1);
});

//Static files
app.use(express.static(path.join(__dirname ,'public')));

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
