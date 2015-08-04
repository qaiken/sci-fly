var preloader = function(GameData) {

  GameData.States.Preloader = function(game) {
  };

  GameData.States.Preloader.prototype = {
    preload: function() {
      this.load.tilemap('level3', 'tilemaps/cybernoid.json', null, Phaser.Tilemap.TILED_JSON);
      
      this.load.image('tiles', 'img/cybernoid.png', 16, 16);
      this.load.image('phaser', 'img/phaser-ship.png');
      this.load.image('chunk', 'img/chunk.png');
      this.load.image('bullet', 'img/bullet.png');

      this.load.spritesheet('kaboom', 'img/explode.png', 128, 128);

    },
    create: function() {
      this.game.stage.disableVisibilityChange = true;
      this.state.start('Play');
    }
  };

};

module.exports = preloader;