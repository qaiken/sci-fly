var play = function(GameData) {

  GameData.States.Play = function(game) {
  };

  GameData.States.Play.prototype = {
    create: function() {
      this.timeLastBulletShot = 0;

      this.initWorld();

      this.initEmitter();

      this.initMainPlayer();

      this.bullets = this.add.group();
      this.remoteBullets = this.add.group();

      this.initBullets(this.bullets);
      this.initBullets(this.remoteBullets);

      this.cursors = this.input.keyboard.createCursorKeys();
      this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      this.playerAddedSocketUpdate();
    },
    playerAddedSocketUpdate: function() {
      var game = this.game;

      game.socket.on('gameUpdated:add', function(data) {
        var allPlayers = data.allPlayers;
        var newPlayers = [];
        var player;
        
        for (var i = 0; i < allPlayers.length; i++) {
          player = allPlayers[i];

          if ( player.id === GameData.mainPlayer.id || GameData.getRemotePlayerById(player.id) ) {
            break;
          }

          GameData.toAdd.push(player);
          game.scope.$emit('game:newPlayer', player);
        }
      });
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
    initMainPlayer: function() {
      this.mainPlayer = this.add.sprite(300, 90, 'phaser');
      this.mainPlayer.health = 100;
      this.mainPlayer.anchor.set(0.5);

      this.mainPlayer.id = this.game.socket.id;

      GameData.mainPlayer = this.mainPlayer;

      this.physics.enable(this.mainPlayer);

      this.camera.follow(this.mainPlayer);

      this.game.socket.emit('newPlayer');
    },
    initBullets: function(bulletGroup) {

      bulletGroup.enableBody = true;
      bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
      bulletGroup.createMultiple(30, 'bullet');
      bulletGroup.setAll('anchor.x', 0.5);
      bulletGroup.setAll('anchor.y', 1);
      bulletGroup.setAll('outOfBoundsKill', true);
      bulletGroup.setAll('checkWorldBounds', true);

    },
    particleBurst: function(player) {
      this.emitter.x = player.x;
      this.emitter.y = player.y;
      this.emitter.start(true, 2000, null, 1);
    },
    checkWallCollisions: function() {
      this.physics.arcade.collide(this.mainPlayer, this.layer);
      this.physics.arcade.collide(this.emitter, this.layer);
      this.physics.arcade.collide(this.bullets, this.layer, function(bullet,layer) {
        bullet.kill();
      });
      this.physics.arcade.collide(this.remoteBullets, this.layer, function(bullet,layer) {
        bullet.kill();
      });
    },
    movePlayer: function(player) {

      player.body.velocity.x = 0;
      player.body.velocity.y = 0;

      if (this.cursors.up.isDown) {
        player.body.velocity.y = -200;
        this.particleBurst(player);
      } else if (this.cursors.down.isDown) {
        player.body.velocity.y = 200;
        this.particleBurst(player);
      }

      if (this.cursors.left.isDown) {
        player.body.velocity.x = -200;
        player.scale.x = -1;
        this.particleBurst(player);
      } else if (this.cursors.right.isDown) {
        player.body.velocity.x = 200;
        player.scale.x = 1;
        this.particleBurst(player);
      }
    },
    fireBullet: function(player,bulletGroup) {

      var facing = player.body.facing;
      var bullet;

      if( facing === 1 ) {
        player.orientation = 'left';
      } else if ( facing === 2 ) {
        player.orientation = 'right';
      }

      // Prevent too many bullets from firing
      if (this.time.now <= this.bulletTime) {
        return;
      }
      //  Grab the first bullet we can from the pool
      bullet = bulletGroup.getFirstExists(false);

      if (!bullet) {
        return;
      }

      if( player.orientation === 'left' ) {
        // flip bullet sprite
        bullet.scale.x = -1;
        bullet.reset(player.x - 8, player.y);
        bullet.body.velocity.x = -400;
      } else if( player.orientation === 'right' ) {
        bullet.reset(player.x + 8, player.y);
        bullet.body.velocity.x = 400;
      }

      this.bulletTime = this.time.now + 200;
    },
    isFiring: function(player,bulletGroup) {
      if (this.fireButton.isDown) {
        this.fireBullet(player,bulletGroup);
      }
    },
    update: function() {
      this.checkWallCollisions();

      this.movePlayer(this.mainPlayer);

      this.isFiring(this.mainPlayer,this.bullets);
    }
  };
};

module.exports = play;