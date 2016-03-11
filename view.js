var view = {
  interval: undefined,

  init: function() {

    $(document).on("keypress", function(e) {

      if (this.interval) {
        clearInterval(this.interval);
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

      this.interval = setInterval(function() {
        controller.move(dir);
      }, 500);

    } );
  },

  render: function() {
    $(".board div").remove();
    var board = controller.getBoard();
    
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board.length; j++) {
        var newDiv = $("<div></div>");
        newDiv.attr("class", "unit");
        newDiv.text(board[i][j]);
        $(".board").append(newDiv);
      }
    }
  },

  renderEnd: function() {
    clearInterval(this.interval);
    $(document).off();
    $(".game-status").text("You Lose!");
  }

};
