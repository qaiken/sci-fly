var phaser = require('phaser');
var gameData = require('./states');

var createGame = function(opts) {

  var el = opts.el;
  var scope = opts.scope;
  var socket = opts.socket;
  var players = opts.players;
  var $injector = opts.$injector;

  var user  = $injector.get('User');
  var states  = gameData.States;


  var game = new Phaser.Game(800, 600, Phaser.AUTO, el[0].id);

  game.state.add('Preloader', states.Preloader);
  game.state.add('Play', states.Play);

  game.state.start('Preloader');

  game.socket = socket;
  game.scope  = scope;

  gameData.socket        = socket;
  gameData.currentPlayer = user.getCurrentUser();
  gameData.playerName = gameData.currentPlayer.userName;

  console.log(gameData.playerName);

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