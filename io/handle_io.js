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

      socket.on('updatePlayer', onUpdatePlayer);
      socket.on('newPlayer', onNewPlayer);
      socket.on('setPlayerName', onSetPlayerName);
      socket.on('disconnect', function(e) {
        onDisconnect.call(this,player);
      });

      socket.on('shotBullet', onShotBullet);
      socket.on('playerKilled',onPlayerKilled);

      socket.on('playerScored',onPlayerScored);
    });
  }

  function onDisconnect(player) {
    game.players.splice(game.players.indexOf(player),1);
    // send to all clients
    game.io.sockets.emit('disconnect',player);
  }

  function onPlayerScored(id) {
    var player = getPlayerById(id);

    ++player.points;
    game.io.sockets.emit('playerScored',player);
  }

  function onPlayerKilled(id) {
    var player = getPlayerById(id);
    game.players.splice(game.players.indexOf(player),1);
    // send to all clients
    game.io.sockets.emit('kill', player);
  }

  function onShotBullet(bulletData) {
    var player = game.getPlayerById(bulletData.id);

    if (!player) {
      console.log("Player not found: " + bulletData.id);
      return;
    }

    player.recordShot(bulletData);
    // send to all clients
    game.io.sockets.emit('bulletShot', bulletData);
  }

  function onUpdatePlayer(playerData) {
    var player = game.getPlayerById(this.id);

    if (!player) {
      console.log("Player not found: ", this.id);
      return;
    }

    player.recordUpdate(playerData);

    // send back to all clients
    game.io.sockets.emit('updatePlayers', {
      players: game.players
    });
  }

  function onNewPlayer(opts) {
    // mainPlayer
    var player = getPlayerById(this.id);
    player.x = opts.x;
    player.y = opts.y;

    // remote player
    if (!player) {
      player = new Player(opts);
      game.players.push(player);
    }

    // send back to all clients
    game.io.sockets.emit('gameUpdated:add', {
      player: player,
      allPlayers: game.players
    });
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