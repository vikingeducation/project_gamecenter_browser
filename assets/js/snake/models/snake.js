var Snake = {
  defaults: {
    segments: [],
    head: null,
    tail: null,
    direction: {
      x: 1,
      y: 0
    },

    canMoveTo: function(direction) {
      if (direction.x !== 0) {
        return !(-1 * this.direction.x === direction.x);
      } else if (direction.y !== 0) {
        return !(-1 * this.direction.y === direction.y);
      }
    },

    isSelfColliding: function() {
      var segment = this.head
        .prev
        .prev
        .prev;
      while (segment) {
        if (this.head.isCollidingWith(segment)) {
          return true;
        }
        segment = segment.prev
      }
      return false;
    },

    isCollidingWith: function(object) {
      var segment = this.head;
      while (segment) {
        if (segment.isCollidingWith(object)) {
          return true;
        }
        segment = segment.prev;
      }
      return false;
    }
  }
};

ApplicationModel.register(Snake);

Snake.addCallback('after', 'create', 'createHeadSegment', function(snake) {
  var numSegments = 10;
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

