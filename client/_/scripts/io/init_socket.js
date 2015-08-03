var ioNetwork = angular.module('phaserApp.ioNetwork');
var io = require('io');

ioNetwork.factory('gameSocket', ['socketFactory',function(socketFactory) {

  var gameSocket = io.connect(window.location.hostname);

  return socketFactory({
    ioSocket: gameSocket
  });

}]);