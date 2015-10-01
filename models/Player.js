var _ = require('lodash');

var Player = function(opts) {
  this.id = opts.id;
  this.name = opts.name || null;

  // flip image sprite if -1
  this.xScale = 1;
  this.orientation = 'right';

  this.x = opts.x || null;
  this.y = opts.y || null;

  this.kills = opts.kills || 0;

  this.timestamp = 0;
};

Player.prototype.recordUpdate = function(data) {
  _.assign(this, data);
};

module.exports = Player;
