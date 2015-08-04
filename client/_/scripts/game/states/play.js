var play = function(GameData) {

  GameData.States.Play = function(game) {
  };

  GameData.States.Play.prototype = {
    create: function() {
      this.timeLastBulletShot = 0;

      this.initWorld();

      this.mainPlayer = this.initPlayer({
        id: this.game.socket.id
      });

      GameData.mainPlayer = this.mainPlayer;
      this.camera.follow(this.mainPlayer);
      this.game.socket.emit('newPlayer');

      this.bullets = this.add.group();
      this.remoteBullets = this.add.group();

      this.initBullets(this.bullets);
      this.initBullets(this.remoteBullets);

      this.cursors = this.input.keyboard.createCursorKeys();
      this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      this.remotePlayerAddedSocketUpdate();
      this.playerMovementSocketUpdates = this.game.time.events.add(50,this.playerMovementSocketUpdate.bind(this));
      this.remotePlayersMovementSocketUpdate();
      this.remotePlayerDisconnect();

    },
    remotePlayerDisconnect: function() {
      this.game.socket.on('disconnect',function(playerData) {
        GameData.getRemotePlayerById(playerData.id).kill();
      });
    },
    remotePlayerAddedSocketUpdate: function() {
      var game = this.game;

      game.socket.on('gameUpdated:add', function(data) {
        var allPlayers = data.allPlayers;
        var newPlayers = [];
        var playerData;

        for (var i = 0; i < allPlayers.length; i++) {
          playerData = allPlayers[i];

          if ( playerData.id === GameData.mainPlayer.id || GameData.getRemotePlayerById(playerData.id) ) {
            continue;
          }

          GameData.toAdd.push(playerData);
          game.scope.$emit('game:newPlayer', playerData);
        }
      });
    },
    playerMovementSocketUpdate: function() {
      this.game.socket.emit('updatePlayer', {
        x: this.mainPlayer.body.x,
        y: this.mainPlayer.body.y,
        velocity: {
          x: this.mainPlayer.body.velocity.x,
          y: this.mainPlayer.body.velocity.y
        },
        health: this.mainPlayer.health,
        timestamp: new Date().getTime()
      });
      this.playerMovementSocketUpdates = this.game.time.events.add(50,this.playerMovementSocketUpdate.bind(this));
    },
    updatePlayerPositionfromServer: function(player,serverData) {
      player.body.velocity.x = serverData.velocity.x;
      player.body.velocity.y = serverData.velocity.y;
    },
    remotePlayersMovementSocketUpdate: function() {

      this.game.socket.on('updatePlayers', function(playersData) {
        var players = playersData.players;
        var player, playerData;

        for (var i = 0; i < players.length; i++) {
          playerData = players[i];

          // don't want to include ourself
          if ( playerData.id !== GameData.socket.id ) {
            player = GameData.getRemotePlayerById(playerData.id);
            if (player) {
              this.updatePlayerPositionfromServer(player,playerData);
            }
          }
        }
      }.bind(this));
    },
    initWorld: function() {
      this.map = this.add.tilemap('level3');

      this.map.addTilesetImage('CybernoidMap3BG_bank.png', 'tiles');

      this.layer = this.map.createLayer(0);

      this.map.setCollisionByExclusion([7, 32, 35, 36, 47]);

      this.layer.resizeWorld();
    },
    initPlayer: function(opts) {
      var x = opts.x || 300;
      var y = opts.y || 90;
      var id = opts.id;

      var player = this.add.sprite(x, y, 'phaser');
      player.health = 100;
      player.anchor.set(0.5);
      player.id = id;
      this.physics.enable(player);

      return player;
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
    checkWallCollisions: function() {
      this.physics.arcade.collide(this.mainPlayer, this.layer);

      this.physics.arcade.collide(GameData.remotePlayers, this.layer);
      
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
      } else if (this.cursors.down.isDown) {
        player.body.velocity.y = 200;
      }

      if (this.cursors.left.isDown) {
        player.body.velocity.x = -200;
        player.scale.x = -1;
      } else if (this.cursors.right.isDown) {
        player.body.velocity.x = 200;
        player.scale.x = 1;
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
    addPlayers: function() {
      var player, playerToAdd;
      while ( GameData.toAdd.length !== 0 ) {
        playerData = GameData.toAdd.shift();
        if (!playerData) {
          return;
        }
        playerToAdd = this.initPlayer(playerData);
        GameData.remotePlayers.push(playerToAdd);
      }
    },
    update: function() {
      this.checkWallCollisions();

      this.addPlayers();

      this.movePlayer(this.mainPlayer);
      this.isFiring(this.mainPlayer,this.bullets);
    }
  };
};

module.exports = play;