var game = angular.module('phaserApp.game');

game.controller('GameController', ['$scope', 'players', function($scope) {
  var gameCtrl = this;

  gameCtrl.players = [];

  $scope.$on('game:newPlayer', function(player) {
    if( gameCtrl.players.indexOf(player) === -1 ) {
      gameCtrl.players.push(player);
    }
  });

}]);