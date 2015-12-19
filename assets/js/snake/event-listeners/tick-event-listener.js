var TickEventListener = {
  selector: document,
  event: 'tick',

  callback: function(e, data) {
    var snakeId = $('div[data-snake-id]').attr('data-snake-id');
    var snake = Snake.find(snakeId);
    SegmentsController.update(snake.head.id, {direction: snake.direction});
    TickEventListener._updatePositions();
  },

  _updatePositions: function() {
    var $segments = $('div[data-segment-id]');
    $.each($segments, function(index, element) {
      var $segment = $(element);
      var segment = Segment.find($segment.attr('data-segment-id'));
      $segment.css({
        top: segment.y + 'px',
        left: segment.x + 'px'
      });
    });
  }
};

ApplicationEventListener.register(TickEventListener);

