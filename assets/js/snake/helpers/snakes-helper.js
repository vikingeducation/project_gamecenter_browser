var SnakesHelper = {
  renderSnake: function(snake) {
    var rendered = '';
    snake.segments.forEach(function(segment) {
      rendered += renderSegment(segment);
    });
    return rendered;
  }
};

ApplicationHelper.register(SnakesHelper);

