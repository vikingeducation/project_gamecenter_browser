

var model = {
  //this is where we gen board! :D
  board: function(){

  },

  gridSize: {
    height: 6,
    width: 10
  },

  snakeHeadCoordinates: {
    x: 1,
    y: 1
  },
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

  attachSnakeHead: function(coordinates){

  },

  detachSnakeHead: function(coordinates){

  },

  moveSnake: function(keypress){
  }
};

var controller = {
  init: function(){
    view.init(model.gridSize);
  }
};

$( document ).ready(function() {
  controller.init();
});