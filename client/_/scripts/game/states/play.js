var play = function(GameData) {

  GameData.States.Play = function(game) {
  };

  GameData.States.Play.prototype = {
    create: function() {
      this.timeLastBulletShot = 0;

      this.initWorld();

      var startPos = this.generatePosition();

      var config = {
        id: this.game.socket.id,
        x: startPos.x,
        y: startPos.y
      };

      this.mainPlayer = this.initPlayer(config);
      this.game.socket.emit('newPlayer',config);
      this.game.scope.$emit('game:initMainPlayer');

      GameData.mainPlayer = this.mainPlayer;
      this.camera.follow(this.mainPlayer);

      this.bullets = this.add.group();
      this.bulletTime = 0;
      this.remoteBullets = this.add.group();

      this.initBullets(this.bullets);
      this.initBullets(this.remoteBullets);

      this.initExplosions();

      this.cursors = this.input.keyboard.createCursorKeys();
      this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      this.remotePlayerAddedSocketUpdate();
      this.playerDataSocketUpdates = this.game.time.events.add(0,this.playerDataSocketUpdate.bind(this));
      this.remotePlayersMovementSocketUpdate();
      this.remotePlayerDisconnectOrKill();

      this.remoteBulletsShotSocketUpdate();

      this.remoteBulletsShotSocketUpdate();

      this.playerScoredSocketUpdate();
    },
    initExplosions: function() {
      this.explosions = this.add.group();
      this.explosions.createMultiple(30, 'kaboom');
      this.explosions.forEach(function(explosion) {
        explosion.scale.x = 0.5;
        explosion.scale.y = 0.5;
        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.5;
        explosion.animations.add('kaboom');
      });
    },
    playExplosion: function(player) {
      var explosion = this.explosions.getFirstExists(false);
      explosion.reset(player.body.x, player.body.y);
      explosion.play('kaboom', 30, false, true);
    },
    generatePosition: function() {
      var positions = [{x:300, y:90}, {x:550, y:180}];
      var i = Math.floor(Math.random()*positions.length);
      return positions[i];
    },
    playerScoredSocketUpdate: function() {
      var game = this.game;

      game.socket.on('playerScored',function(playerData) {
        if( playerData.id === GameData.mainPlayer.id ) {
          game.scope.$emit('game:playerScored');
        }
      });
    },
    remotePlayerDisconnectOrKill: function() {
      var game = this.game;

      var removeRemotePlayer = function(playerData) {
        var player = GameData.getRemotePlayerById(playerData.id);
        if(!player) {
          return;
        }
        player.kill();
        GameData.remotePlayers.splice(GameData.remotePlayers.indexOf(player),1);
      }

      game.socket.on('disconnect',function(playerData) {
        removeRemotePlayer(playerData);
        game.scope.$emit('game:removePlayer',playerData);
      });

      game.socket.on('kill',removeRemotePlayer);
    },
    remoteBulletsShotSocketUpdate: function() {
      this.game.socket.on('bulletShot', function(bulletData) {
        var player = GameData.getRemotePlayerById(bulletData.id);

        if(!player) {
          return;
        }

        this.fireBullet(player,this.remoteBullets,bulletData.id);
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
          game.scope.$emit('game:addPlayer', playerData);

          // skip if its ourself (the main player) 
          // or we already have them in our gameData.remotePlayers array
          if ( playerData.id === GameData.mainPlayer.id || GameData.getRemotePlayerById(playerData.id) ) {
            continue;
          }

          GameData.toAdd.push(playerData);
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
        orientation: this.mainPlayer.orientation,
        xScale: this.mainPlayer.scale.x,
        health: this.mainPlayer.health,
        timestamp: new Date().getTime()
      });
      this.playerDataSocketUpdates = this.game.time.events.add(0,this.playerDataSocketUpdate.bind(this));
    },
    updatePlayerDatafromServer: function(player,serverData) {
      player.x = serverData.x;
      player.y = serverData.y;
      player.scale.x = serverData.xScale;
      player.orientation = serverData.orientation;
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
      player.orientation = 'right';
      player.health = 100;
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

      var startPos = this.generatePosition();

      var config = {
        id: this.game.socket.id,
        x: startPos.x,
        y: startPos.y
      };

      this.mainPlayer = this.initPlayer(config);
      this.game.socket.emit('newPlayer',config);
      GameData.mainPlayer = this.mainPlayer;
      this.game.scope.$emit('game:healthChange', this.mainPlayer.health);

      this.camera.follow(this.mainPlayer);
    },
    damagePlayer: function(mainPlayer,remoteBullet) {
      this.game.scope.$emit('game:healthChange', mainPlayer.health-= 20);
      this.playExplosion(mainPlayer);
      if( mainPlayer.health === 0 ) {
        this.game.socket.emit('playerScored',remoteBullet.id);
        this.killPlayer(mainPlayer);
      }
      remoteBullet.kill();
    },
    shotRemotePlayer: function(remotePlayer,bullet) {
      var explosion;

      bullet.kill();
      
      this.playExplosion(remotePlayer);
    },
    movePlayer: function(player) {
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;

      if (this.cursors.up.isDown) {
        player.body.velocity.y = -100;
      } else if (this.cursors.down.isDown) {
        player.body.velocity.y = 100;
      }

      if (this.cursors.left.isDown) {
        player.body.velocity.x = -100;
        player.scale.x = -1;
      } else if (this.cursors.right.isDown) {
        player.body.velocity.x = 100;
        player.scale.x = 1;
      }
    },
    fireBullet: function(player,bulletGroup,remoteID) {

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
        bullet.reset(player.x - 8, player.y + 8);
        bullet.body.velocity.x = -400;
      } else if( player.orientation === 'right' ) {
        bullet.reset(player.x + 8, player.y + 8);
        bullet.body.velocity.x = 400;
      }

      this.bulletTime = this.time.now + 200;

      if(remoteID) {
        bullet.id = remoteID;
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