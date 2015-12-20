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
      e.preventDefault();
      var snake = Snake.find(snakeId);
      if (snake.canMoveTo(direction)) {
        SnakesController.update(snake.id, {direction: direction});
      } else {
        $('body').addClass('error');
        setTimeout(function() {
          $('body').removeClass('error');
        }, 100);
      }
      return false;
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

