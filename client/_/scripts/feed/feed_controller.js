var feed = angular.module('phaserApp.feed');

feed.controller('FeedController', ['$rootScope', function($rootScope) {

  var feedCtrl = this;

  feedCtrl.players = [];

  $rootScope.$on('game:initMainPlayer', function() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    feedCtrl.userName = currentUser.userName;
    feedCtrl.health = currentUser.health;
    feedCtrl.kills = currentUser.kills;
  });

  $rootScope.$on('game:playerScored', function() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    feedCtrl.kills = ++currentUser.kills;

    localStorage.setItem('currentUser',JSON.stringify(currentUser));
  });

  $rootScope.$on('game:healthChange',function(e, health) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.health = health;
    feedCtrl.health = health;

    localStorage.setItem('currentUser',JSON.stringify(currentUser));
  });

  $rootScope.$on('game:addPlayer', function(e, player) {
    if( feedCtrl.players.indexOf(player.name) === -1 ) {
      feedCtrl.players.push(player.name);
    }
  });

  $rootScope.$on('game:removePlayer', function(e, player) {
    feedCtrl.players.splice(feedCtrl.players.indexOf(player.name),1);
  });

}]);