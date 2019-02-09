var socket = io.connect('https://secret-cliffs-83069.herokuapp.com');

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    output = document.getElementById('output'),
    btn = document.getElementById('send'),
    feedback = document.getElementById('feedback'),
    day = "",
    month = "",
    year = "",
    datum = "",
    hours ="",
    minutes ="";

btn.addEventListener('click', function(){
  const timestamp = new Date();
  day = timestamp.getDate();
  month = timestamp.getMonth()+1;
  year = timestamp.getFullYear();
  hours = timestamp.getHours();
  minutes = timestamp.getMinutes();

  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
    datum: day +'.'+month+'.'+year+'. -'+hours+':'+minutes

  });

});

message.addEventListener('keypress', function(){
  socket.emit('typing', handle.value);
});

socket.on('chat', function(data){
  feedback.innerHTML = "";
  output.innerHTML += '<p>' +data.datum+ '<br><strong>' + data.handle + ' :</strong>' + data.message + ' </p>';
  message.value = "";
});

socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + " is typing a message...</em></p>";
});
