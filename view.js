var view = {
  init: function() {

    var interval;

    $(document).on("keypress", function(e) {

      if (interval) {
        clearInterval(interval);
      }

      var dir;
      var currPos = model.snake.getPosition()[0];
      console.log(e.keyCode);
      if (e.keyCode == 97) {
        console.log(e.keyCode);
        dir = "left";
        controller.move(dir);
        view.render();
      } else if (e.keyCode == 119) {
        dir = "up";
        controller.move(dir);
        view.render();
      } else if (e.keyCode == 100) {
        dir = "right";
        controller.move(dir);
        view.render();
      } else if (e.keyCode == 115) {
        dir = "down";
        controller.move(dir);
        view.render();
      }

      interval = setInterval(function() {
        controller.move(dir);
        view.render();
      }, 500);

    } );
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
  //view.init();
  model.board.generateNewBoard();
  view.init();
  view.render();
});
