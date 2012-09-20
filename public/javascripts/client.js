window.onload = function () {
  var user = $.cookie('user');
  var phpSessID = $.cookie('PHPSESSID');
  console.log("user : ", user);
  $('#userName').html(user);

  var $ips = $('a[href*="ip="]');
  console.log("$ips : ", $ips);
  var ips = [];
  $ips.each(function(index) {
    var ip = $(this).attr('href').split('ip=')[1];
    ips.push(ip);
  });

  console.log("ips : ", ips);

  var urlIp = window.location.search.split('ip=')[1];
  if (urlIp) {
    ips.push(urlIp);
  }

  // Connect to socket.io
  //var socket = io.connect('kernicpanel.pusher.nodejitsu.com:8080/');
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

  // React to a received message
  socket.on('connect', function (data) {
    //socket.emit('user', user);
    socket.emit('ips', phpSessID, ips);
    console.log("connect data : ", data);

    // Modify the DOM to show the message
    //document.getElementById("msg").innerHTML = data;

    // Send a message back to the server
    //socket.emit('pong', {
      //msg: "The web browser also knows socket.io."
    //});
  });
};
