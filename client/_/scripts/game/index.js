var game = angular.module('phaserApp.game',[]);
var alertify = require('alertify');

game.config(['$stateProvider',function($stateProvider) {
  $stateProvider
    .state('game', {
      url: '/',
      template: '<game-canvas></game-canvas>',
      controller: 'GameController as gameCntrl',
      onEnter: ['User', function(User) {
        if( User.getCurrentUser() ) {
          return;
        }
        
        alertify.prompt("Please enter a username.", function (e, input) {
          var userName = input || 'Player';
          var user = {
            userName: userName,
            health: 100
          };

          User.setCurrentUser(user);

        },'');
      }]
    })
}]);

require('./game_controller');
require('./game_canvas');

module.exports = game;