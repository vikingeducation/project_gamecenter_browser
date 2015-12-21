var GamesController = {
  templateDirectory: 'games',

  make: function() {
    this.render('make');
    PlayEventListener.start();
  },

  show: function(id) {
    PlayEventListener.stop();

    var game = Game.find(id);

    this.render('show', {
      snake: renderSnake(game.snake),
      food: renderFoods(game.foods),
      score: renderScore(game.player),
      gameId: game.id,
      playerId: game.player.id,
      snakeId: game.snake.id
    });

    TickEventEmitter.start();
    TickEventListener.start();
    KeyEventListener.start();
    CollisionEventListener.start();
    ScoreEventListener.start();
    GameOverEventListener.start();
  },

  create: function() {
    var game = Game.create();
    this.show(game.id);
  },

  remove: function(id) {
    CollisionEventEmitter.stop();
    GameOverEventEmitter.stop();
    ScoreEventEmitter.stop();
    TickEventEmitter.stop();

    CollisionEventListener.stop();
    GameOverEventListener.stop();
    KeyEventListener.stop();
    ScoreEventListener.stop();
    TickEventListener.stop();

    var game = Game.find(id);
    game.destroy();

    this.render('remove');

    PlayEventListener.start();
  }
};

ApplicationController.register(GamesController);

