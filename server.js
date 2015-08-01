var express = require('express');
var path    = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port',process.env.PORT || 8000);
var staticPath = path.join(__dirname,'client');

app.use( express.static(staticPath) );

app.get('/', function(req, res) {
  res.sendfile(path.join(staticPath, 'index.html'));
});

// require('./routes/io.js')(app, io);

server.listen(app.get('port'), function() {
  console.log("Running on port ", app.get('port'));
});

var status = "All is well.";

io.sockets.on('connection', function (socket) {  
  io.sockets.emit('status', { status: status }); // note the use of io.sockets to emit but socket.on to listen
  socket.on('reset', function (data) {
    status = "War is imminent!";
    io.sockets.emit('status', { status: status });
  });
});