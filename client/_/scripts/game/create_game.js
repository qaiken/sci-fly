var phaser = require('phaser');
var GameData = require('./states');

var createGame = function(opts) {

  var el = opts.el;

  var game = new Phaser.Game(800, 600, Phaser.AUTO, el[0].id);
  var states  = GameData.States;

  game.state.add('Preloader', states.Preloader);
  game.state.add('Play', states.Play);

  game.state.start('Preloader');

  // game.mapId = mapId;
  // game.socket = socket;
  // game.scope  = scope;
  // Game.maps           = maps;
  // Game.remotePlayers = [];

  // var user  = injector.get('User'),
  //     g     = Game;

  // g.socket        = socket;
  // g.mapId         = mapId;
  // g.currentPlayer = user.getCurrentUser();

  // // Turn off music
  // scope.$on('game:toggleMusic', function() {
  //   game.state.states.Preloader.toggleMusic();
  // });

  // // Cleanup
  // scope.$on('$destroy', function() {
  //   socket.emit('playerLeftMap', {
  //     playerId: g.sid,
  //     mapId: g.mapId
  //   });
  //   game.destroy();
  // });

  // // Network socket events
  // Game.connected = true;
  // console.log('connected data data', socket, g.currentPlayer);
  // // g.sid     = data.id;
  // g.playerName = 'Ari';
  // // g.playerName = prompt("Please enter your name") || 'Player';
  // g.socket.emit('setPlayerName', { name: g.playerName });

  // g.socket.on('playerDetails', function(data) {
  //   g.sid = data.id;
  //   console.log('GAME GAME', game);
  //   game.state.start('Boot');
  // });
};

module.exports = createGame;