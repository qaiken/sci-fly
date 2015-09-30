var user = angular.module('phaserApp.user');

user.service('User', ['$rootScope', function($rootScope) {

  var _currentUser = localStorage.getItem('currentUser');

  if (_currentUser) {
    _currentUser = JSON.parse(_currentUser);
  }

  this.setCurrentUser = function(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    _currentUser = user;
  };

  this.getCurrentUser = function() {
    return _currentUser;
  };

  this.modifyCurrentUser = function(opts) {
    var user = this.getCurrentUser();

    if (user) {
      for (var opt in opts) {
        user[opt] = opts[opt];
      }
      this.setCurrentUser(user);
    } else {
      this.setCurrentUser(opts);
    }

    return _currentUser;
  };

  $rootScope.$on('game:healthChange', function(e, health) {
    _currentUser.health = health;
    localStorage.setItem('currentUser', JSON.stringify(_currentUser));
  });

  $rootScope.$on('game:playerScored', function() {
    ++_currentUser.kills;
    localStorage.setItem('currentUser', JSON.stringify(_currentUser));
  });

}]);
