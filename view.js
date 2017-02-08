'use strict';

var view = {
  gameBoard: $('.game-board'),

  init: function(cols, rows){
    view.createBoard(cols, rows);
  },

  render: function(snakeSegments){
    $('.cell').removeClass('snake');

    snakeSegments.forEach(function(coords){
      var x = coords[0],
          y = coords[1];
      $(model.board[x][y]).addClass('snake');
    });

    // $(snakeSegments).addClass('snake');
    // var x,
    //     y,
    //     currentSegment;
    // snakeSegments.forEach(function(segment) {
    //   x = segment.x;
    //   y = segment.y;
    //   $(model.board[x][y]).addClass('snake');;
    //
    //   console.log(segment)
    // });

    // setTimeout(function(){
    //   cell.removeClass('snake');
    // }, 600);

  },

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
