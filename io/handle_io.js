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

      // socket.on('updatePlayer', onUpdatePlayer);
      // socket.on('playerLeave', onPlayerLeave);
      // socket.on('shotBullet', onShotBullet);
      // socket.on('playerHit', onPlayerHit);
      socket.on('newPlayer', onNewPlayer);
      socket.on('setPlayerName', onSetPlayerName);

    });

  }

  function onNewPlayer(player) {

    var player = getPlayerById(this.id);

    if (!player) {
      console.log("Player not found: " + this.id);
      return;
    }

    // send back to all clients except the socket that
    // fired the chat message event
    this.broadcast.emit('gameUpdated:add', {
      player: player.serialize(),
      allPlayers: game.players
    });

    // this.emit('gameUpdated:add', {
    //   map: data.mapId,
    //   allPlayers: g.maps[data.mapId].players
    // });

    // g.io.emit('global:newPlayer', {
    //   player: player.serialize(),
    //   map: data.mapId
    // });
  }

  function onSetPlayerName(opts) {
    getPlayerById(this.id).name = opts.name;
    this.emit('playerDetailsReceived');
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