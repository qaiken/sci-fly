var play = function(Game) {

  Game.States.Play = function(game) {
  };

  Game.States.Play.prototype = {
    create: function() {

      this.timeLastBulletShot = 0;

      this.initWorld();

      this.initEmitter();

      this.initPlayer();

      this.initBullets();

      this.cursors = this.input.keyboard.createCursorKeys();
      this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
    initBullets: function() {
      this.bullets = this.add.group();
      this.bullets.enableBody = true;
      this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
      this.bullets.createMultiple(30, 'bullet');
      this.bullets.setAll('anchor.x', 0.5);
      this.bullets.setAll('anchor.y', 1);
      this.bullets.setAll('outOfBoundsKill', true);
      this.bullets.setAll('checkWorldBounds', true);
    },
    particleBurst: function() {
      this.emitter.x = this.sprite.x;
      this.emitter.y = this.sprite.y;
      this.emitter.start(true, 2000, null, 1);
    },
    checkWallCollisions: function() {
      this.physics.arcade.collide(this.sprite, this.layer);
      this.physics.arcade.collide(this.emitter, this.layer);
      this.physics.arcade.collide(this.bullets, this.layer, function(bullet,layer) {
        bullet.kill();
      });
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
    fireBullet: function() {

      var facing = this.sprite.body.facing;

      if( facing === 1 ) {
        this.sprite.orientation = 'left';
      } else if ( facing === 2 ) {
        this.sprite.orientation = 'right';
      }


      // Prevent too many bullets from firing
      if (this.time.now <= this.bulletTime) {
        return;
      }
      //  Grab the first bullet we can from the pool
      this.bullet = this.bullets.getFirstExists(false);

      if (!this.bullet) {
        return;
      }

      if( this.sprite.orientation === 'left' ) {
        // flip bullet sprite
        this.bullet.scale.x = -1;
        this.bullet.reset(this.sprite.x - 8, this.sprite.y);
        this.bullet.body.velocity.x = -400;
      } else if( this.sprite.orientation === 'right' ) {
        this.bullet.reset(this.sprite.x + 8, this.sprite.y);
        this.bullet.body.velocity.x = 400;
      }

      this.bulletTime = this.time.now + 200;
    },
    isFiring: function() {
      if (this.fireButton.isDown) {
        this.fireBullet();
      }
    },
    update: function() {

      this.checkWallCollisions();

      this.movePlayer(this.sprite);

      this.isFiring();

    }
  };
};

module.exports = play;