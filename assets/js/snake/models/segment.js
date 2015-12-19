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
      this.x += (Game.SQUARE_SIZE * this.direction.x);
      this.y += (Game.SQUARE_SIZE * this.direction.y);
      if (this.prev) {
        this.prev.move();
      }
      if (this.next) {
        this.direction = this.next.direction
      }
    }
  }
};

ApplicationModel.register(Segment);

