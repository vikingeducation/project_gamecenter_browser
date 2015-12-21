var TickEventListener = {
  selector: document,
  event: 'tick',

  callback: function(e, data) {
    TickEventListener._appendUnappendedSegments();
    TickEventListener._appendUnappendedFoods();
    TickEventListener._updateSnakeDirection();
    TickEventListener._updatePositions();
    CollisionEventEmitter.start();
  },

  _updateSnakeDirection: function() {
    var snakeId = $('div[data-snake-id]').attr('data-snake-id');
    var snake = Snake.find(snakeId);
    SegmentsController.update(snake.head.id, {direction: snake.direction});
  },

  _updatePositions: function() {
    var gameId = $('div[data-game-id]').attr('data-game-id');
    var game = Game.find(gameId);

    game.snake.segments.forEach(function(segment) {
      positionSegment(segment);
    });

    game.foods.forEach(function(food) {
      positionFood(food);
    });
  },

  _appendUnappendedSegments: function() {
    var gameId = $('div[data-game-id]').attr('data-game-id');
    var game = Game.find(gameId);

    game.snake.segments.forEach(function(segment) {
      var $segment = $('#games-show div[data-segment-id="' + segment.id + '"]');
      if (!$segment.length) {
        $segment = $(renderSegment(segment));
        $segment.appendTo('#games-show');
        positionSegment(segment);
      }
    });
  },

  _appendUnappendedFoods: function() {
    var gameId = $('div[data-game-id]').attr('data-game-id');
    var game = Game.find(gameId);

    game.foods.forEach(function(food) {
      if (!food.isCollected) {
        var $food = $('#games-show div[data-food-id="' + food.id + '"]');
        if (!$food.length) {
          $food = $(renderFood(food));
          $food.appendTo('#games-show');
          positionFood(food);
        }
      }
    });
  }
};

ApplicationEventListener.register(TickEventListener);

