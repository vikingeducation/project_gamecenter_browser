var Game = {
  SQUARE_SIZE: 32,
  GRID_WIDTH: 24,
  GRID_HEIGHT: 16,

  defaults: {
    snake: null,
    player: null,
    foods: []
  },

  minX: function() {
    return 0;
  },

  minY: function() {
    return 0;
  },

  maxX: function() {
    return this.SQUARE_SIZE * (this.GRID_WIDTH - 1);
  },

  maxY: function() {
    return this.SQUARE_SIZE * (this.GRID_HEIGHT - 1);
  },

  randomPosition: function() {
    return {
      x: (this.SQUARE_SIZE * ~~((Math.random() * 100) % this.GRID_WIDTH)),
      y: (this.SQUARE_SIZE * ~~((Math.random() * 100) % this.GRID_HEIGHT))
    }
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

Game.addCallback('after', 'create', 'createFood', function(game) {
  var food = Food.create({
    game: game
  });
  game.foods.push(food);
});

