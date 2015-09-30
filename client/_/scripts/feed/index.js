var feed = angular.module('phaserApp.feed',[]);

feed.directive('gameFeed', function() {
  return {
    replace: true,
    templateUrl: '_/scripts/feed/feed.html',
    controller: 'FeedController as feedCtrl'
  };
});

require('./feed_controller');

module.exports = feed;
