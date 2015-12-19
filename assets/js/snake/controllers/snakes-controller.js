var SnakesController = {
  update: function(id, data) {
    var snake = Snake.find(id);
    snake.update(data);
    console.log(snake, data);
  }
};

ApplicationController.register(SnakesController);

