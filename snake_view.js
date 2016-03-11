var view = {

  init: function() {

  },


  buildGrid: function( gridSize ) {
    for ( var row = 0; row < gridSize; row++ ) {
      $(".board").append( $("<div class='row' id='row-" + row + "'></div>") );
      for ( var col = 0; col < gridSize; col++ ) {
        $("#row-" + row).append( $("<div class='col' id='col-" + col + "'></div>") )
      }
    }
  },


  registerEventListeners: function() {
    $(document).keypress( function( event ) {
      switch ( event.key ) {
      case "ArrowDown":
        controller.changeDirection( "down" );
      break;
      case "ArrowUp":
        controller.changeDirection( "up" );
      break;
      case "ArrowRight":
        controller.changeDirection( "right" );
      break;
      case "ArrowLeft":
        controller.changeDirection( "left" );
      break;
      }
    });
  },


  render: function( snakeAdd, snakeRemove, foodAdd, foodRemove ) {
    if (snakeAdd) {
      location = snakeAdd.location;
      x = location.x;
      y = location.y;
      $("#row-" + y + " " + "#col-" + x).addClass("snake")
    }

    if (snakeRemove) {
      location = snakeRemove.location;
      x = location.x;
      y = location.y;
      $("#row-" + y + " " + "#col-" + x).removeClass("snake")
    }

    if (foodAdd) {
      location = foodAdd.location;
      x = location.x;
      y = location.y;
      $("#row-" + y + " " + "#col-" + x).addClass("food")
    }

    if (foodRemove) {
      location = foodRemove.location;
      x = location.x;
      y = location.y;
      $("#row-" + y + " " + "#col-" + x).removeClass("food")
    }
  },

}
