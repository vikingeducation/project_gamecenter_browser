var GamesController = {
  templateDirectory: 'games',

  make: function() {
    Game.create();
    this.render('make');
    PlayEventListener.start();
  },

  show: function() {
    var snake = Snake.first();

    this.render('show', {
      snake: renderSnake(snake),
      snakeId: snake.id
    });

    TickEventEmitter.start();
    TickEventListener.start();
    KeyEventListener.start();
  }
};

ApplicationController.register(GamesController);

