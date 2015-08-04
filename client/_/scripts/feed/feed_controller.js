var feed = angular.module('phaserApp.feed');

feed.controller('FeedController', ['$rootScope', function($rootScope) {

  var feedCtrl = this;

  feedCtrl.getUserName = function() {
    return JSON.parse(localStorage.getItem('currentUser')).userName || '';
  }

  feedCtrl.getHealth = function() {
    return JSON.parse(localStorage.getItem('currentUser')).health || '';
  }
  
  $rootScope.$on('game:newPlayer', function(player) {
    feedCtrl.userName = feedCtrl.getUserName();
    feedCtrl.health = feedCtrl.getHealth();
  });

  $rootScope.$on('game:healthChange',function(e,health) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.health = health;

    localStorage.setItem('currentUser',JSON.stringify(currentUser));
    feedCtrl.health = feedCtrl.getHealth();
  });

}]);