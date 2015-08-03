var game = angular.module('phaserApp.game');

game.controller('GameController', ['$scope', 'players', function($scope) {
  var gameCtrl = this;

  gameCtrl.players = [];

  $scope.$on('game:newPlayers', function(player) {
    gameCtrl.players.push(player);
  });

}]);