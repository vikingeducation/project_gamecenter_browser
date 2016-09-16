var Snake = {
  NUM_START_SEGMENTS: 4,

  defaults: {
    segments: [],
    head: null,
    tail: null,
    direction: {
      x: 1,
      y: 0
    },

    grow: function() {
      var segment = Segment.create();
      this.tail.prev = segment;
      segment.next = this.tail;
      segment.direction = this.tail.direction;
      segment.x = this.tail.x;
      segment.y = this.tail.y;
      segment._decrementPosition();
      this.tail = segment;
      this.segments.push(segment);
      return segment;
    },

    canMoveTo: function(direction) {
      if (direction.x !== 0) {
        return !(-1 * this.direction.x === direction.x);
      } else if (direction.y !== 0) {
        return !(-1 * this.direction.y === direction.y);
      }
    },

    isSelfColliding: function() {
      var segment = this.head.prev;
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
  for (var i = 0; i < Snake.NUM_START_SEGMENTS; i++) {
    var segment = Segment.create({
      x: Game.SQUARE_SIZE * (Snake.NUM_START_SEGMENTS - (i + 2)),
      y: 0
    });
    snake.segments.push(segment);
    if (i > 0) {
      snake.segments[i].next = snake.segments[i - 1];
      snake.segments[i - 1].prev = snake.segments[i];
    }
  }
  snake.head = snake.segments[0];
  snake.tail = snake.segments[snake.segments.length - 1];
});

Snake.addCallback('before', 'destroy', 'destroyDependents', function(snake) {
  Segment.destroyAll();
});

