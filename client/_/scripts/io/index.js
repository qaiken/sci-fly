require('angular-socket-io');

var ioNetwork = angular.module('phaserApp.ioNetwork', [
  'btford.socket-io'
]);

require('./init_socket');
require('./players');
require('./feed');

module.exports = ioNetwork;