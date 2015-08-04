var preloader = require('./preloader');
var play = require('./play');

var GameData = {
  States: {},
  mainPlayer: null,
  remotePlayers: [],
  toAdd: [],
  width: 800,
  height: 600,
  getRemotePlayerById: function(id) {
    for (var i = 0; i < this.remotePlayers.length; i++) {
      if ( this.remotePlayers[i].id === id ) {
        return this.remotePlayers[i];
      }
    }
    return false;
  }
};

preloader(GameData);
play(GameData);

module.exports = GameData;