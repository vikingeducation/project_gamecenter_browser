var view = {
  init: function() {
    $(document).on("keypress", function(e) {
      var dir;
      var currPos = model.snake.getPosition()[0];
      console.log(e.keyCode);
      if (e.keyCode == 97) {
        dir = "left";
        model.snake.setPosition([currPos[0], currPos[1] - 1]);
        view.render();
      } else if (e.keyCode == 119) {
        dir = "up";
        model.snake.setPosition([currPos[0] - 1, currPos[1]]);
        view.render();
      } else if (e.keyCode == 100) {
        dir = "right";
        model.snake.setPosition([currPos[0], currPos[1] + 1]);
        view.render();
      } else if (e.keyCode == 115) {
        dir = "down";
        model.snake.setPosition([currPos[0] + 1, currPos[1]]);
        view.render();
      }
    });
  },

  render: function() {
    $(".board div").remove();
    var board = controller.getBoard();
    var snake = model.snake.getPosition();
    var food = model.food.position.toString();

    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board.length; j++) {
        var newDiv = $("<div></div>");
        newDiv.attr("class", "unit");

        snake = snake.map(function(obj) {
          return obj.toString();
        });
        var indexString = i.toString() + "," + j.toString();

        if ( snake.indexOf(indexString) > -1) {
          newDiv.text("s");
        } else if (food === indexString) {
          newDiv.text("o");
        }
        $(".board").append(newDiv);
      }
    }
  }

};

$(document).ready(function() {
  model.generateNewBoard();
  view.init();
  view.render();
});
