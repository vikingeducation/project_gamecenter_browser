var view = {

  init: function(callbacks) {
    // register callbacks
    var changeDirection = callbacks.changeDirection;

    // listener for direction changes
    $(document).keydown( function(event) {
      var newDir = view.newDirection(event);
      changeDirection(newDir);
    });
  },

  // returns direction value based on key pressed
  newDirection: function(event) {
    switch (event.keyCode) {
      case 37: 
        return 'left';
      case 38: 
        return 'up';
      case 39: 
        return 'right'
      case 40:
        return 'down';
    }
  },

  resetCanvas: function(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 500, 500);
  },

  renderSnake: function(ctx, snake) {
    ctx.fillStyle = 'green';
    snake.forEach( function(segment) {
      ctx.fillRect(segment.x * 10, 
                   segment.y * 10, 
                   10, 
                   10);
    });
  },

  renderFood: function(ctx, food) {
    ctx.fillStyle = 'orange';
    ctx.fillRect(food.x * 10, 
                 food.y * 10, 
                 10, 
                 10);
  },

  renderScore: function(score) {
    $('#score').text('Score: ' + score);
  },

  endGame: function() {
    $('#score').addClass('game-over');
  },

  render: function(snake, food, score) {
    var ctx = $('#board').get(0).getContext("2d");
    view.resetCanvas(ctx);
    view.renderSnake(ctx, snake);
    view.renderFood(ctx, food);
    view.renderScore(score);
  }
};