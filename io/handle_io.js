var Player = require('../models/Player');
var Game = require('../models/Game');

var handleIO = function(app,io) {

  var game = new Game({
    io: null,
    players: []
  });

  function init(io) {
    game.io = io;

    bindSocketEvents();
  }

  function bindSocketEvents() {

    game.io.sockets.on('connection', function(socket) {

      socket.emit('connected', { id: socket.id });

      var player = new Player({ id: socket.id });

      game.players.push(player);

      // socket.on('newPlayer', onNewPlayer);
      // socket.on('updatePlayer', onUpdatePlayer);
      // socket.on('playerLeave', onPlayerLeave);
      // socket.on('shotBullet', onShotBullet);
      // socket.on('playerHit', onPlayerHit);
      socket.on('setPlayerName', onSetPlayerName);

    });

  }

  function onSetPlayerName(opts) {
    getPlayerById(this.id).name = opts.name;
    this.emit('playerDetailsReceived');
    console.log(game.players);
  }

  // each socket has a unique id and we set the player's id
  // to be equal to the socket id so that we can get the corresponding
  // player
  function getPlayerById(id) {
    for (var i = 0; i < game.players.length; i++) {
      if (game.players[i].id === id) {
        return game.players[i];
      }
    }
    return false;
  }

  init(io);

  return game;

};

module.exports = handleIO;