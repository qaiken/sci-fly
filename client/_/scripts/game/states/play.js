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
      this.playerDataSocketUpdates = this.game.time.events.add(0,this.playerDataSocketUpdate.bind(this));
      this.remotePlayersMovementSocketUpdate();
      this.remotePlayerDisconnectOrKill();

      this.remoteBulletsShotSocketUpdate();

    },
    remotePlayerDisconnectOrKill: function() {
      this.game.socket.on('disconnect',function(playerData) {
        var player = GameData.getRemotePlayerById(playerData.id);
        if(!player) {
          return;
        }
        player.kill();
        GameData.remotePlayers.splice(GameData.remotePlayers.indexOf(player),1);
      });
      this.game.socket.on('kill',function(playerData) {
        var player = GameData.getRemotePlayerById(playerData.id);
        if(!player) {
          return;
        }
        player.kill();
        GameData.remotePlayers.splice(GameData.remotePlayers.indexOf(player),1);
      });
    },
    remoteBulletsShotSocketUpdate: function() {
      this.game.socket.on('bulletShot', function(bulletData) {
        var player = GameData.getRemotePlayerById(bulletData.id);

        if(!player) {
          return;
        }

        this.fireBullet(player,this.remoteBullets,true);
      }.bind(this));
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
    playerDataSocketUpdate: function() {
      this.game.socket.emit('updatePlayer', {
        x: this.mainPlayer.body.x,
        y: this.mainPlayer.body.y,
        velocity: {
          x: this.mainPlayer.body.velocity.x,
          y: this.mainPlayer.body.velocity.y
        },
        xScale: this.mainPlayer.scale.x,
        health: this.mainPlayer.health,
        timestamp: new Date().getTime()
      });
      this.playerDataSocketUpdates = this.game.time.events.add(0,this.playerDataSocketUpdate.bind(this));
    },
    updatePlayerDatafromServer: function(player,serverData) {
      player.body.velocity.x = serverData.velocity.x;
      player.body.velocity.y = serverData.velocity.y;
      player.scale.x = serverData.xScale;
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
              this.updatePlayerDatafromServer(player,playerData);
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
    checkBulletCollisions: function() {
      this.physics.arcade.overlap(this.mainPlayer, this.remoteBullets, this.damagePlayer, null, this);

      this.physics.arcade.overlap(GameData.remotePlayers, this.bullets,this.shotRemotePlayer, null, this);
    },
    killPlayer: function(mainPlayer) {
      this.game.socket.emit('playerKilled',mainPlayer.id);
      mainPlayer.kill();

      this.mainPlayer = this.initPlayer({
        id: this.game.socket.id
      });

      this.game.socket.emit('newPlayer', this.game.socket.id);
    },
    damagePlayer: function(mainPlayer,bullet) {
      if( (mainPlayer.health-= 20) < 0 ) {
        this.killPlayer(mainPlayer);
      }
      bullet.kill();
    },
    shotRemotePlayer: function(remotePlayer,bullet) {
      bullet.kill();
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
    fireBullet: function(player,bulletGroup,remote) {

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

      if(remote) {
        return;
      }

      this.game.socket.emit('shotBullet', {
        id: this.game.socket.id,
        y: bullet.y,
        x: bullet.x,
        velocity: {
          x: bullet.body.velocity.x,
          y: bullet.body.velocity.y
        }
      });
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

      this.checkBulletCollisions();

      this.addPlayers();

      this.movePlayer(this.mainPlayer);
      this.isFiring(this.mainPlayer,this.bullets);
    }
  };
};

module.exports = play;