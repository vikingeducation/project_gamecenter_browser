'use strict';

var view = {

  init: function(){
    view.createBoard(10, 10);
    // view.createSnake(3, 8);
  },

  render: function(){

  },

  gameBoard: $('.game-board'),

  createBoard: function(rows, columns){

    for (var row = 0; row <= rows; row++){
      for (var col = 0; col <= columns; col++){
        var cellEl = $('<div>').addClass('cell')
                               .attr('x', row)
                               .attr('y', col);
         view.gameBoard.append(cellEl);
      }
      view.gameBoard.append('<br>');
    }
  }

};
