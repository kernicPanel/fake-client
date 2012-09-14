window.onload = function () {
  var user = $.cookie('user');
  console.log("user : ", user);
  $('#userName').html(user);
  // Connect to socket.io
  //var socket = io.connect('kernicpanel.pusher.nodejitsu.com:8080/');
  var socket = io.connect('http://dev.internethic.com:8082/');
  //var socket = io.connect('http://192.168.0.37:8080/');

  socket.on('log', function(data){
    console.log("log : ", data);
  });

  socket.on('message', function(data){
    var message = data.user + ' ' + data.message;
    console.log("message : ", data);
    test = data;
    $('#message').append('<p>' + message + '</p>');
  });

  // React to a received message
  socket.on('connect', function (data) {
    socket.emit('user', user);
    console.log("connect data : ", data);

    // Modify the DOM to show the message
    //document.getElementById("msg").innerHTML = data;

    // Send a message back to the server
    //socket.emit('pong', {
      //msg: "The web browser also knows socket.io."
    //});
  });
};
