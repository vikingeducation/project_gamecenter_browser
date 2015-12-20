var GamesController = {
  templateDirectory: 'games',

  make: function() {
    this.render('make');
    PlayEventListener.start();
  },

  show: function(id) {
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
  },

  create: function() {
    var game = Game.create();
    this.show(game.id);
  }
};

ApplicationController.register(GamesController);

