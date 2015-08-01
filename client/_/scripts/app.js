var $ = require('jquery');
var socket = io.connect(window.location.hostname);

var angular = require('angular');
var test = require('angular-socket-io');

var alertify = require('alertify');

// alertify.alert('hey');

socket.on('status', function (data) {  
  $('#status').html(data.status);
});

$('#reset').click(function() {
  socket.emit('reset');
});