var Game = {
  SQUARE_SIZE: 32,
  GRID_SIZE: 24,

  defaults: {
    snake: null,
    player: null
  }
};

ApplicationModel.register(Game);

Game.addCallback('after', 'create', 'createSnake', function(game) {
  var snake = Snake.create();
  game.snake = snake;
});

Game.addCallback('after', 'create', 'createPlayer', function(game) {
  var player = Player.create();
  game.player = player;
});

