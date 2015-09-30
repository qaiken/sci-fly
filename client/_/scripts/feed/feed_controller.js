var alertify = require('alertify');

var feed = angular.module('phaserApp.feed');

feed.controller('FeedController', ['$rootScope', function($rootScope) {

  var feedCtrl = this;

  feedCtrl.userName = '';
  feedCtrl.health = '';
  feedCtrl.kills = '';

  feedCtrl.alertTimer = '';
  feedCtrl.players = {};

  feedCtrl.onNoRemotePlayers = function() {
    alertify.alert('It looks like there are no other players. Invite your friends!');
  };

  $rootScope.$on('game:initMainPlayer', function() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    feedCtrl.userName = currentUser.userName;
    feedCtrl.health = currentUser.health;
    feedCtrl.kills = currentUser.kills;
  });

  $rootScope.$on('game:playerScored', function() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    feedCtrl.kills = ++currentUser.kills;

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  });

  $rootScope.$on('game:healthChange',function(e, health) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.health = health;
    feedCtrl.health = health;

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  });

  $rootScope.$on('game:updatePlayers', function(e, player) {
    var name = player.name;
    var kills = player.kills;

    if(name) {
      feedCtrl.players[name] = kills;
    }

    clearTimeout(feedCtrl.alertTimer);

    if( Object.keys(feedCtrl.players).length > 1 ) {
      return;
    }

    feedCtrl.alertTimer = setTimeout(feedCtrl.onNoRemotePlayers, 2000);
  });

  $rootScope.$on('game:removePlayer', function(e, player) {
    delete feedCtrl.players[player.name];
  });

}]);