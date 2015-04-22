

var model = {

  moveRight: function(){
    model.board.snakeHead.x++;
  },

  board: {
    gridSize: {
      height: 6,
      width: 10
    },
    snakeHead: {
      x: 1,
      y: 1
    }
  }
};

var view = {
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
    view.clearBoard()
    view.appendRowsToContainer(board.gridSize);
    var snakeHead = board.snakeHead;
    $("div[data-y='" + snakeHead.y + "'] div[data-x='" + snakeHead.x + "']").addClass( 'snake-head' );
  },

  clearBoard: function(){
    $( '#container').html("");
  }
};

var controller = {
  init: function(){
    controller.gameLoop();

  },
  gameLoop: function(){
    setInterval(function(){
      console.log("rendering view");
      view.render(model.board);
      console.log("moving right");
      model.moveRight();
    }, 1000);
  }
};

$( document ).ready(function() {
  controller.init();
});