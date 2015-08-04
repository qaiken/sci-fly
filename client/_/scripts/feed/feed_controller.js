var feed = angular.module('phaserApp.feed');

feed.controller('FeedController', ['$rootScope', function($rootScope) {

  var feedCtrl = this;

  $rootScope.$on('game:newPlayer', function(player) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    feedCtrl.userName = currentUser.userName;
    feedCtrl.health = currentUser.health;
    feedCtrl.kills = currentUser.kills;
  });

  $rootScope.$on('game:playerScored', function(player) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    feedCtrl.kills = ++currentUser.kills;

    localStorage.setItem('currentUser',JSON.stringify(currentUser));
  });

  $rootScope.$on('game:healthChange',function(e,health) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.health = health;
    feedCtrl.health = health;

    localStorage.setItem('currentUser',JSON.stringify(currentUser));
  });

}]);