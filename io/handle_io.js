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
        onDisconnect.call(this, player);
      });

      socket.on('shotBullet', onShotBullet);
      socket.on('playerKilled',onPlayerKilled);

      socket.on('playerScored',onPlayerScored);
    });
  }

  function onDisconnect(player) {
    game.players.splice(game.players.indexOf(player), 1);
    // send to all clients
    game.io.sockets.emit('disconnect', player);
  }

  function onPlayerScored(id) {
    var player = game.getPlayerById(id);

    ++player.kills;
    game.io.sockets.emit('playerScored', player);

    game.io.sockets.emit('updatePlayers', {
      players: game.players
    });
  }

  function onPlayerKilled(id) {
    var player = game.getPlayerById(id);
    game.players.splice(game.players.indexOf(player), 1);
    // send to all clients
    game.io.sockets.emit('kill', player);
  }

  function onShotBullet(bulletData) {
    var player = game.getPlayerById(bulletData.id);

    if (!player) {
      console.warn("Player not found: " + bulletData.id);
      return;
    }

    // send to all clients
    game.io.sockets.emit('bulletShot', bulletData);
  }

  function onUpdatePlayer(playerData) {
    var player = game.getPlayerById(this.id);

    if (!player) {
      console.warn("Player not found: ", this.id);
      return;
    }

    player.recordUpdate(playerData);

    // send to all clients
    game.io.sockets.emit('updatePlayers', {
      players: game.players
    });
  }

  function onNewPlayer(opts) {
    var player = game.getPlayerById(this.id);

    // remote player
    if (!player) {
      player = new Player(opts);
      game.players.push(player);
    // main player
    } else {
      player.x = opts.x;
      player.y = opts.y;
      player.kills = opts.kills;
      player.name = game.mainPlayerName;
    }

    // send to all clients
    game.io.sockets.emit('gameUpdated:add', {
      player: player,
      allPlayers: game.players
    });
  }

  function onSetPlayerName(opts) {
    game.getPlayerById(this.id).name = opts.name;
    game.mainPlayerName = opts.name;
    this.emit('playerDetailsReceived');
  }

  init(io);

  return game;
};

module.exports = handleIO;
