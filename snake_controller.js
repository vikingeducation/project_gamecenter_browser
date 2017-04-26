var snakeController = {
  speed: 100,
  loop: null,
  inputEnabled: true,
  init: function() {
    snakeView.hideBoard();
    $(".snake-play").click(function() {
      // reset game
      snakeModel.new();
      snakeView.init([400, 400]);
      snakeController.inputEnabled = true;
      //
      $(document).keydown( function(event) {
        if (snakeController.inputEnabled) {
          var keycode = event.keyCode; 
          var direction = snakeController.getDirection(keycode);
          clearInterval(snakeController.loop);
          snakeView.hidePausePopup();
          if (keycode === 80) {
            snakeView.renderPausePopup();
          } else if (keycode === 27) {
            // reset game
          } else if (keycode === 189) {
            if (direction !== null) {
              snakeController.speed += 10;
              snakeController.loop = setInterval(snakeController.moveSnake, snakeController.speed);
            };
          } else if (keycode === 187) {
            if (direction !== null) {
              snakeController.speed -= 10;
              snakeController.loop = setInterval(snakeController.moveSnake, snakeController.speed);
            };
          } else {
            if (direction !== null) {
              snakeModel.setDirection(direction);
              snakeController.loop = setInterval(snakeController.moveSnake, snakeController.speed);
            };
          };
        }
      });
    });
    $(".spcs-submit").click(function() {
      $('.spcs-error').remove(); 
      var w = $('#sc-width').val();
      var h = $('#sc-height').val();
      var validW = snakeModel.validCanvasSize('Width', w);
      var validH = snakeModel.validCanvasSize('Height', h); 
      if (validW && validH) {
        $('#snake-play-custom-settings').modal('hide');
        snakeModel.new();
        snakeView.init([w, h]);
        snakeController.inputEnabled = true;
        // dry?
        $(document).keydown( function(event) {
        if (snakeController.inputEnabled) {
          var keycode = event.keyCode; 
          var direction = snakeController.getDirection(keycode);
          clearInterval(snakeController.loop);
          snakeView.hidePausePopup();
          if (keycode === 80) {
            snakeView.renderPausePopup();
          } else if (keycode === 27) {
            // reset game
          } else if (keycode === 189) {
            if (direction !== null) {
              snakeController.speed += 10;
              snakeController.loop = setInterval(snakeController.moveSnake, snakeController.speed);
            };
          } else if (keycode === 187) {
            if (direction !== null) {
              snakeController.speed -= 10;
              snakeController.loop = setInterval(snakeController.moveSnake, snakeController.speed);
            };
          } else {
            if (direction !== null) {
              snakeModel.setDirection(direction);
              snakeController.loop = setInterval(snakeController.moveSnake, snakeController.speed);
            };
          };
        }
      });

      } else {
        $('<small>', { 'class': 'spcs-error alert-danger', 'text': snakeModel.canvasWidthError }).insertAfter('#sc-width');
        $('<small>', { 'class': 'spcs-error alert-danger', 'text': snakeModel.canvasHeightError }).insertAfter('#sc-height');
      }
    });
  },
  getDirection: function(keycode) {
    switch(keycode) {
      case 37:
        return 'left';
      case 38:
        return 'up';
      case 39: 
        return 'right';
      case 40:
        return 'down';
    }
    return snakeModel.direction;
  },
  moveSnake: function() {
    snakeModel.updateSnakeLoc();
    if (snakeModel.snakeIsAlive()) {
      snakeView.renderGameFrame();
    } else {
      clearInterval(snakeController.loop);
      snakeController.inputEnabled = false;
      snakeView.renderGameOverPopup();
      snakeView.playAgain();
    };
  }
}