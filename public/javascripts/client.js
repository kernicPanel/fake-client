window.onload = function () {
  var cookie = 'PHPSESSID=' + $.cookie('PHPSESSID');

  //var socket = io.connect('kernicpanel.pusher.nodejitsu.com:8088/');
  //var socket = io.connect('http://dev.internethic.com:8088/');
  var socket = io.connect('http://192.168.0.37:8088/');

  socket.on('log', function(data){
    console.log("log : ", data);
  });

  socket.on('message', function(data){
    var message = 'ip : ' + data.ip + ' <br/> message : ' + data.message;
    console.log("message : ", data);
    test = data;
    $('#message').append('<p>' + message + '</p>');
  });

  socket.on('connect', function (data) {
    socket.emit('auth', cookie);
    console.log("connect data : ", data);
  });
};
