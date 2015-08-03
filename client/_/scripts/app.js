var angular = require('angular');

var phaserApp = angular.module('phaserApp',[
  require('angular-ui-router'),
  require('./io').name,
  require('./feed').name,
  require('./score_board').name,
  require('./game').name,
  require('./user').name
]);

phaserApp.config(['$urlRouterProvider',function($urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/');
}]);