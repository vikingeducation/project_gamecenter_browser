var CollisionEventEmitter = {
  selector: document,
  event: 'collision',
  
  emit: function() {
    var snakeId = $('div[data-snake-id]').attr('data-snake-id');
    var snake = Snake.find(snakeId);
    CollisionEventEmitter._emitSnakeSelfCollision(snake);
    CollisionEventEmitter._emitSnakeFoodCollision(snake);
  },

  _emitSnakeSelfCollision: function(snake) {
    var data;
    if (snake.isSelfColliding()) {
      data = {
        a: snake,
        b: snake
      };
    }
    if (data) {
      $(CollisionEventEmitter.selector)
        .trigger(CollisionEventEmitter.event, data);
    }
  },

  _emitSnakeFoodCollision: function(snake) {
    var data;
    var $food = $('#games-show div[data-food-id]');
    var foodId = $food.attr('data-food-id');
    var food = Food.find(foodId);

    if (!food.isCollected && snake.isCollidingWith(food)) {
      FoodsController.update(food.id, {
        isCollected: true
      });

      data = {
        a: snake,
        b: food
      };
    }
    if (data) {
      $(CollisionEventEmitter.selector)
        .trigger(CollisionEventEmitter.event, data);
    }
  }
};

ApplicationEventEmitter.register(CollisionEventEmitter);

