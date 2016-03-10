var view = {
  // moveSnake: function() {
  //   var interval;
  //   $(document).keydown(function(event) {
  //     if (interval) clearInterval(interval);
  //
  //   });
  // }

  render: function() {
    var board = controller.getBoard();
    console.log(board.length * board.length);
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board.length; j++) {
        var newDiv = $("<div></div>");
        newDiv.attr("class", "unit");
        $(".board").append(newDiv);
        console.log("hihihi");
      }
    }
  }

};

$(document).ready(function() {
  model.generateNewBoard();
  view.render();
});
