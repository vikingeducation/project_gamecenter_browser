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
    Segment.all().forEach(function(segment) {
      positionSegment(segment);
    });

    Food.all().forEach(function(food) {
      positionFood(food);
    });
  },

  _appendUnappendedSegments: function() {
    Segment.all().forEach(function(segment) {
      var $segment = $('#games-show div[data-segment-id="' + segment.id + '"]');
      if (!$segment.length) {
        $segment = $(renderSegment(segment));
        $segment.appendTo('#games-show');
        positionSegment(segment);
      }
    });
  },

  _appendUnappendedFoods: function() {
    Food.uncollected().forEach(function(food) {
      var $food = $('#games-show div[data-food-id="' + food.id + '"]');
      if (!$food.length) {
        $food = $(renderFood(food));
        $food.appendTo('#games-show');
        positionFood(food);
      }
    });
  }
};

ApplicationEventListener.register(TickEventListener);

