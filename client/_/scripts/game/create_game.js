var phaser = require('phaser');
var GameData = require('./states');

var createGame = function(opts) {

  var el = opts.el;
  var scope = opts.scope;
  var socket = opts.socket;
  var $injector = opts.$injector;

  var user  = $injector.get('User');
  var states  = GameData.States;

  var game = new Phaser.Game(800, 600, Phaser.AUTO, el[0].id);
  
  game.socket = socket;
  game.scope  = scope;

  game.state.add('Preloader', states.Preloader);
  game.state.add('Play', states.Play);


  GameData.socket = socket;
  GameData.currentPlayer = user.getCurrentUser();
  GameData.playerName = GameData.currentPlayer.userName;

  GameData.socket.emit('setPlayerName', { name: GameData.playerName });

  GameData.socket.on('playerDetailsReceived', function(data) {
    game.state.start('Preloader');
  });

};

module.exports = createGame;