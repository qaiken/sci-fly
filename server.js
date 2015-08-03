var express = require('express');
var path    = require('path');
var shell = require('shelljs');
var http = require('http');
var socketIO = require('socket.io');

var handleIO = require('./io/handle_io');
var staticPath = path.join(__dirname,'client');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

// Serve Client
app.use( express.static(staticPath) );
app.get('/', function(req, res) {
  res.sendfile(path.join(staticPath, 'index.html'));
});

handleIO(app, io);

// Start Server
app.set('port',process.env.PORT || 8000);
server.listen(app.get('port'), function() {
  console.log("Running on port ", app.get('port'));
});

// Start Gulp if Dev Environment
if( process.env.DEV === 'true' || process.argv[2] === 'dev' ) {
  shell.exec('cd client && gulp', function(code, output) {
  });
}
