var play = function(Game) {

  Game.States.Play = function(game) {
  };

  Game.States.Play.prototype = {
    create: function() {
      //  A Tilemap object just holds the data needed to describe the map (i.e. the json exported from Tiled).
      this.map = this.add.tilemap('level3');

      // The name of the tileset as specified in the map data
      // and the key of the Phaser.Cache image used for this tileset.
      this.map.addTilesetImage('CybernoidMap3BG_bank.png', 'tiles');

      this.layer = this.map.createLayer(0);

      // Exclude collisions on these tiles
      this.map.setCollisionByExclusion([7, 32, 35, 36, 47]);

      this.layer.resizeWorld();

      this.cursors = this.input.keyboard.createCursorKeys();

      this.emitter = this.add.emitter(0, 0, 200);

      this.emitter.makeParticles('chunk');
      this.emitter.minRotation = 0;
      this.emitter.maxRotation = 0;
      this.emitter.gravity = 150;
      this.emitter.bounce.setTo(0.5, 0.5);

      this.sprite = this.add.sprite(300, 90, 'phaser');
      this.sprite.anchor.set(0.5);

      this.physics.enable(this.sprite);

      //  Because both our body and our tiles are so tiny,
      //  and the body is moving pretty fast, we need to add
      //  some tile padding to the body. WHat this does
      this.sprite.body.tilePadding.set(32, 32);

      this.camera.follow(this.sprite);
    },
    particleBurst: function() {
      this.emitter.x = this.sprite.x;
      this.emitter.y = this.sprite.y;
      this.emitter.start(true, 2000, null, 1);
    },
    update: function() {
      this.physics.arcade.collide(this.sprite, this.layer);
      this.physics.arcade.collide(this.emitter, this.layer);

      this.sprite.body.velocity.x = 0;
      this.sprite.body.velocity.y = 0;

      if (this.cursors.up.isDown) {
        this.sprite.body.velocity.y = -200;
        this.particleBurst();
      } else if (this.cursors.down.isDown) {
        this.sprite.body.velocity.y = 200;
        this.particleBurst();
      }

      if (this.cursors.left.isDown) {
        this.sprite.body.velocity.x = -200;
        this.sprite.scale.x = -1;
        this.particleBurst();
      } else if (this.cursors.right.isDown) {
        this.sprite.body.velocity.x = 200;
        this.sprite.scale.x = 1;
        this.particleBurst();
      }
    }
  };
};

module.exports = play;