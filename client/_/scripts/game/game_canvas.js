var game = angular.module('phaserApp.game');
var createGame = require('./create_game');

createGame();

game.directive('gameCanvas', function($injector) {

  var linkFn = function(scope, ele, attrs) {

  };

  return {
    scope: {
      players: '='
    },
    template: '<div id="gameCanvas"></div>',
    link: linkFn
  };
});