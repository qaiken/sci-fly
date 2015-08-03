var user = angular.module('phaserApp.user');

user.service('User', function() {

  var currentUser = localStorage.getItem('currentUser');

  if (currentUser) {
    currentUser = JSON.parse(currentUser);
  }

  this.setCurrentUser = function(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUser = user;
  };

  this.getCurrentUser = function() {
    return currentUser;
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

    return currentUser;
  };

});