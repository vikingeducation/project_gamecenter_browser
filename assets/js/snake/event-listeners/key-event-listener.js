var KeyEventListener = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,

  selector: document,
  event: 'keydown',

  callback: function(e) {
    var snakeId = $('div[data-snake-id]').attr('data-snake-id');
    var direction = KeyEventListener._directionFor(e.keyCode);
    if (direction) {
      var snake = Snake.find(snakeId);
      if (-1 * snake.direction.x === direction.x ||
          -1 * snake.direction.y === direction.y) {
        $('body').addClass('error');
        setTimeout(function() {
          $('body').removeClass('error');
        }, 100);
      } else {
        SnakesController.update(snakeId, {direction: direction});
      }
    }
  },

  _directionFor: function(keyCode) {
    if (keyCode === this.LEFT) {
      return {
        x: -1,
        y: 0
      };
    } else if (keyCode === this.UP) {
      return {
        x: 0,
        y: -1
      }
    } else if (keyCode === this.RIGHT) {
      return {
        x: 1,
        y: 0
      }
    } else if (keyCode === this.DOWN) {
      return {
        x: 0,
        y: 1
      }
    }
    return false;
  }
};

ApplicationEventListener.register(KeyEventListener);

