var SegmentsController = {
  update: function(id, data) {
    var segment = Segment.find(id);
    segment.update(data);
    segment.move();
  }
};

ApplicationController.register(SegmentsController);

