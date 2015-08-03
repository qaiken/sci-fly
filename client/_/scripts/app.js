var angular = require('angular');

var phaserApp = angular.module('phaserApp',[
  require('angular-ui-router'),
  require('./feed').name,
  require('./game').name,
  require('./score_board').name
]);

phaserApp.config(function($urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/');
});