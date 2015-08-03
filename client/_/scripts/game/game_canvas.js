var game = angular.module('phaserApp.game');
var createGame = require('./create_game');

createGame();

game.directive('gameCanvas', ['gameSocket','$injector',function(gameSocket,$injector) {

  var linkFn = function(scope, ele, attrs) {

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