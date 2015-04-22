

var model = {
  gridSize: {
    height: 6,
    width: 10
  },

  moveRight: function(){
    model.board.snakeHead.x++;
  },

  board: {
    snakeHead: {
      x: 1,
      y: 1
    }
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
    for( var x = 1; x <= width; x++){
      var $cell = $("<div />", {
        class: 'cell',
        'data-x': x,
        'data-y': row.data('y')
      });
      row.append($cell);
    }
  },

  render: function(board){
    var snakeHead = board.snakeHead;
    $("div[data-y='" + snakeHead.y + "'] div[data-x='" + snakeHead.x + "']").addClass( 'snake-head' );
  }


// $("div[data-y='6'] div[data-x='3']")
  // attachSnakeHead: function(coordinates){},
  // detachSnakeHead: function(coordinates){},
  // moveSnake: function(keypress){}
};

var controller = {
  init: function(){
    view.init(model.gridSize);
    controller.gameLoop();

  },
  gameLoop: function(){
    setInterval(function(){
      console.log("moving right");
      model.moveRight();
      console.log("rendering view");
      view.render(model.board)
    }, 1000);
  }
};

$( document ).ready(function() {
  controller.init();
});