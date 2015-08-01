var express = require('express');
var path    = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 8000;
var staticPath = path.join(__dirname,'client');

app.use( express.static(staticPath) );

app.get('/', function(req, res) {
  res.sendfile(path.join(staticPath, 'index.html'));
});

// require('./routes/io.js')(app, io);

server.listen(port, function() {
  console.log("Running on port ", port);
});