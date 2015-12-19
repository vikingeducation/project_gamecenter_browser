var SnakesHelper = {
  renderSnake: function(snake) {
    var rendered = '';
    snake.segments.forEach(function(segment) {
      var data = {
        segmentId: segment.id
      };
      rendered += partial('segments/segment', data);
    });
    return rendered;
  }
};

ApplicationHelper.registerHelper(SnakesHelper);

