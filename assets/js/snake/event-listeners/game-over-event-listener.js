var GameOverEventListener = {
  selector: document,
  event: 'gameover',

  callback: function(e) {
    GameOverEventListener._removeAllGameObjects();
    var gameId = $('div[data-game-id]').attr('data-game-id');
    GamesController.remove(gameId);
  },

  _removeAllGameObjects: function() {
    removeAllFoods();
    removeAllSegments();
  }
};

ApplicationEventListener.register(GameOverEventListener);

