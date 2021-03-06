// called in the context of the phaser game object
var Player = function(opts) {
  var x = opts.x || 300;
  var y = opts.y || 90;
  var kills = opts.kills || 0;
  var id = opts.id;
  var health = opts.health || 100;

  var player = this.add.sprite(x, y, 'phaser');

  player.anchor.set(0.5);
  player.orientation = 'right';
  player.health = health;
  player.id = id;
  player.kills = kills;

  this.physics.enable(player);

  return player;
};

module.exports = Player;
