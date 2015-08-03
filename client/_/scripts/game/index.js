var game = angular.module('phaserApp.game',[]);
var alertify = require('alertify');

game.config(['$stateProvider',function($stateProvider) {
  $stateProvider
    .state('game', {
      url: '/',
      template: '<game-canvas players="gameCntrl.players"></game-canvas>',
      controller: 'GameController as gameCntrl'
    })
}]);

require('./game_controller');
require('./game_canvas');

module.exports = game;