

var model = {
  gridSize: {
    height: 6,
    width: 10
  },

  snakeHeadCoordinates: {
    x: 1,
    y: 1
  },

  moveRight: function(){
    model.snakeHeadCoordinates.x++;
  },

  board: {
    snakeHead: model.snakeHeadCoordinates
  }
};

var view = {
  init: function(gridSize){
    view.appendRowsToContainer(gridSize);
  },

  appendRowsToContainer: function(gridSize){
    for( var y = gridSize.height; y > 0; y--){
      var $row = $("<div />", {
        class: 'row',
        'data-y': y
      });

      $('#container').append($row);
      view.appendCellsToRow($row, gridSize.width);
    }
  },

  appendCellsToRow: function(row, width){
    for( var x = width; x > 0; x--){
      var $cell = $("<div />", {
        class: 'cell',
        'data-x': x,
        'data-y': row.data('y')
      });
      row.append($cell);
    }
  },

  render(board){
    snakeHead = board.snakeHead
    $("div[data-y='" + snakeHead.y + "'] div[data-x='" + snakehead.x + "']").addClass( 'snake-head' );
  }


// $("div[data-y='6'] div[data-x='3']")
  // attachSnakeHead: function(coordinates){},
  // detachSnakeHead: function(coordinates){},
  // moveSnake: function(keypress){}
};

var controller = {
  init: function(){
    view.init(model.gridSize);
    setInterval(function(){
      console.log("moving right");
      model.moveRight();
      console.log("rendering view");
      view.render(model.board)
    }, 500);
  }
};

$( document ).ready(function() {
  controller.init();
});