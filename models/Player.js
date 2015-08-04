var Player = function(opts) {
  this.id = opts.id;
  this.name = opts.name || null;

  // flip image sprite if -1
  this.xScale = 1;

  this.x = opts.x || null;
  this.y = opts.y || null;

  this.velocity = {
    x: 0,
    y: 0
  };

  this.lastUpdate = 0;
  this.health = 100;
  this.points = 0;
  this.lastShot = {};
};

Player.prototype.recordUpdate = function(data) {
  this.x = data.x;
  this.y = data.y;
  this.xScale = data.xScale;
  this.velocity.x = data.velocity.x;
  this.velocity.y = data.velocity.y;
  this.health = data.health;
  this.lastUpdate = data.timestamp;
};

Player.prototype.recordShot = function(data) {
  this.lastShot = data;
};

Player.prototype.addShotPoints = function(data) {
  this.points += 10;
};

Player.prototype.wasHit = function() {
  this.health -= 10;
};

Player.prototype.isAlive = function() {
  return this.health > 0;
};

module.exports = Player;