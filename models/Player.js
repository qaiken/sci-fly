var Player = function(opts) {
  this.id = opts.id;
  this.name = opts.name || null;

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

Player.prototype.serialize = function() {
  return {
    id: this.id,
    x: this.x,
    y: this.y,
    xRel: this.xRel,
    yRel: this.yRel,
    timestamp: this.timestamp
  };
};

module.exports = Player;