var play = function(Game) {

  Game.States.Play = function(game) {
  };

  Game.States.Play.prototype = {
    create: function() {

      this.initWorld();

      this.initEmitter();

      this.initPlayer();

      this.cursors = this.input.keyboard.createCursorKeys();
    },
    initWorld: function() {
      this.map = this.add.tilemap('level3');

      this.map.addTilesetImage('CybernoidMap3BG_bank.png', 'tiles');

      this.layer = this.map.createLayer(0);

      this.map.setCollisionByExclusion([7, 32, 35, 36, 47]);

      this.layer.resizeWorld();
    },
    initEmitter: function() {
      this.emitter = this.add.emitter(0, 0, 200);

      this.emitter.makeParticles('chunk');
      this.emitter.minRotation = 0;
      this.emitter.maxRotation = 0;
      this.emitter.gravity = 150;
      this.emitter.bounce.setTo(0.5, 0.5);
    },
    initPlayer: function() {
      this.sprite = this.add.sprite(300, 90, 'phaser');
      this.sprite.anchor.set(0.5);

      this.physics.enable(this.sprite);

      this.camera.follow(this.sprite);
    },
    particleBurst: function() {
      this.emitter.x = this.sprite.x;
      this.emitter.y = this.sprite.y;
      this.emitter.start(true, 2000, null, 1);
    },
    checkCollisions: function() {
      this.physics.arcade.collide(this.sprite, this.layer);
      this.physics.arcade.collide(this.emitter, this.layer);
    },
    movePlayer: function(player) {
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;

      if (this.cursors.up.isDown) {
        player.body.velocity.y = -200;
        this.particleBurst();
      } else if (this.cursors.down.isDown) {
        player.body.velocity.y = 200;
        this.particleBurst();
      }

      if (this.cursors.left.isDown) {
        player.body.velocity.x = -200;
        player.scale.x = -1;
        this.particleBurst();
      } else if (this.cursors.right.isDown) {
        player.body.velocity.x = 200;
        player.scale.x = 1;
        this.particleBurst();
      }
    },
    update: function() {

      this.checkCollisions();

      this.movePlayer(this.sprite);

    }
  };
};

module.exports = play;