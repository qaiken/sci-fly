var game = angular.module('phaserApp.game');
var createGame = require('./create_game');
var alertify = require('alertify');

game.directive('gameCanvas', ['User', 'gameSocket', '$injector', function(User, gameSocket, $injector) {

  var newUser = function(cb) {
    if( User.getCurrentUser() ) {
      cb();
      return;
    }

    alertify.prompt("Please enter a username", function (e, input) {
      var userName = input || 'Player';

      var user = {
        userName: userName,
        health: 100,
        id: gameSocket.id,
        kills: 0
      };

      User.setCurrentUser(user);

      cb();

    },'');
  };

  var linkFn = function(scope, el, attrs) {

    gameSocket.on('connected', function(opts) {
      gameSocket.id = opts.id;
    });

    var opts = {
      el: el,
      scope: scope,
      socket: gameSocket,
      $injector: $injector
    };

    newUser(function() {
      createGame(opts);
    });

  };

  return {
    restrict: 'E',
    replace: true,
    template: '<div id="game-canvas"></div>',
    controller: 'GameController as gamectrl',
    link: linkFn
  };

}]);