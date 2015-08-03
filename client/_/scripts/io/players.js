angular.module('phaserApp.ioNetwork')
.factory('Player', function() {
  var Player = function(data) {
    this.id = data.id;
    this.name = data.name;
    this.health = data.health;
  };

  return Player;
})
.service('players', ['gameSocket','$rootScope','Player',function(gameSocket, $rootScope, Player) {
  
  var players = this;
  var listOfPlayers = [];

  var playerById = function(id) {
    var player;
    for (var i = 0; i < listOfPlayers.length; i++) {
      if (listOfPlayers[i].id === id) {
        return listOfPlayers[i];
      }
    }
  }


  // Scope listeners
  $rootScope.$on('game:removePlayer', function(evt, playerData) {
    var player = playerById(playerData.id);
    var idx = listOfPlayers.indexOf(player);

    console.log('game:removePlayer players player', playerData.id, _.map(listOfPlayers, 'id'));
    listOfPlayers.splice(idx, 1);
    $rootScope.$broadcast('newPlayers', listOfPlayers);
  });
  // Do we have a new player?
  $rootScope.$on('game:newPlayer', function(evt, playerData) {
    var player = new Player(playerData);
    listOfPlayers.push(player);
    $rootScope.$broadcast('newPlayers', listOfPlayers);
  });

}]);