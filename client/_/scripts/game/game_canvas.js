var game = angular.module('phaserApp.game');
var createGame = require('./create_game');

game.directive('gameCanvas', ['gameSocket','$injector',function(gameSocket,$injector) {

  var linkFn = function(scope, el, attrs) {

    var opts = {
      el: el,
      scope: scope,
      socket: gameSocket,
      players: scope.players,
      $injector: $injector
    };

    createGame(opts);
  };

  return {
    restrict: 'E',
    replace: true,
    scope: {
      players: '='
    },
    template: '<div id="game-canvas"></div>',
    link: linkFn
  };

}]);