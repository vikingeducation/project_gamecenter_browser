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
    var snake = model.snake.getPosition();
    var food = model.food.position;

    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board.length; j++) {
        var newDiv = $("<div></div>");
        newDiv.attr("class", "unit");

        occupied = occupied.map(function(obj) {
          return obj.toString();
        } );

        if ( occupied.indexOf(i.toString() + "," + j.toString()) > -1 ) {

          newDiv.text("o");
        }

        $(".board").append(newDiv);
      }
    }
  }

};

$(document).ready(function() {
  model.generateNewBoard();
  view.render();
});
