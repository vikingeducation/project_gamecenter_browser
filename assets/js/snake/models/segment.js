var Segment = {
  defaults: {
    x: 0,
    y: 0,
    next: null,
    prev: null,
    direction: {
      x: 1,
      y: 0
    },

    move: function() {
      this._incrementPosition();
      this._enforceBoundaries();
      this._movePrevious();
      this._getNextDirection();
    },

    isCollidingWith: function(object) {
      return (this.x === object.x && this.y === object.y);
    },

    _incrementPosition: function() {
      this.x += (Game.SQUARE_SIZE * this.direction.x);
      this.y += (Game.SQUARE_SIZE * this.direction.y);
    },

    _enforceBoundaries: function() {
      if (this.x > Game.maxX()) {
        this.x = Game.minX();
      } else if (this.x < Game.minX()) {
        this.x = Game.maxX();
      }

      if (this.y > Game.maxY()) {
        this.y = Game.minY();
      } else if (this.y < Game.minY()) {
        this.y = Game.maxY();
      }
    },

    _movePrevious: function() {
      if (this.prev) {
        this.prev.move();
      }
    },

    _getNextDirection: function() {
      if (this.next) {
        this.direction = this.next.direction
      }
    }
  }
};

ApplicationModel.register(Segment);

