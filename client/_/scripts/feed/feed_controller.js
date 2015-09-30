var alertify = require('alertify');

var feed = angular.module('phaserApp.feed');

feed.controller('FeedController', ['$rootScope', 'User', function($rootScope, User) {
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
    var currentUser = User.getCurrentUser();

    feedCtrl.userName = currentUser.userName;
    feedCtrl.health = currentUser.health;
    feedCtrl.kills = currentUser.kills;
  });

  $rootScope.$on('game:playerScored', function() {
    ++feedCtrl.kills;
  });

  $rootScope.$on('game:healthChange', function(e, health) {
    feedCtrl.health = health;
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
