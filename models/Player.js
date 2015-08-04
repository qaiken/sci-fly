var _ = require('lodash');

var Player = function(opts) {
  this.id = opts.id;
  this.name = opts.name || null;

  // flip image sprite if -1
  this.xScale = 1;
  this.orientation = 'right';

  this.x = opts.x || null;
  this.y = opts.y || null;

  this.velocity = {
    x: 0,
    y: 0
  };

  this.timestamp = 0;
  this.health = 100;
  this.points = 0;
  this.lastShot = {};
};

Player.prototype.recordUpdate = function(data) {
  _.assign(this,data);
};

Player.prototype.recordShot = function(data) {
  this.lastShot = data;
};

module.exports = Player;