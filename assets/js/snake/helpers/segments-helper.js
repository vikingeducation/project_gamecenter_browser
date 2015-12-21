var SegmentsHelper = {
  renderSegment: function(segment) {
    var data = {
      segmentId: segment.id
    };
    return partial('segments/segment', data);
  },

  positionSegment: function(segment) {
    var $segment = $('#games-show div[data-segment-id="' + segment.id + '"]');
    $segment.css({
      top: segment.y + 'px',
      left: segment.x + 'px'
    });
  },

  removeAllSegments: function() {
    $('#game-show div[data-segment-id]').remove();
  }
};

ApplicationHelper.register(SegmentsHelper);

