var Snake = {
  defaults: {
    segments: [],
    head: null,
    tail: null,
    direction: {
      x: 1,
      y: 0
    }
  }
};

ApplicationModel.register(Snake);

Snake.addCallback('after', 'create', 'createHeadSegment', function(snake) {
  var numSegments = 5;
  for (var i = 0; i < numSegments; i++) {
    var segment = Segment.create({
      x: Game.SQUARE_SIZE * (numSegments - (i + 2)),
      y: 0
    });
    snake.segments.push(segment);
    if (i > 0) {
      snake.segments[i].next = snake.segments[i - 1];
      snake.segments[i - 1].prev = snake.segments[i];
    }
  }
  snake.head = Segment.first();
  snake.tail = Segment.last();
});

