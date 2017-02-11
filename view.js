'use strict';

var view = {
  gameBoard: $('.game-board'),

  init: function(cols, rows){
    view.createBoard(cols, rows);
    $(document).keydown(function(event){
      // model.keyCode = event.which;
      var notReversed = model.checkReverse(event.which)

      if (notReversed) {
        model.updateKeyCode(event.which);
      }
      event.preventDefault();
    });
  },

  render: function(snakeSegments){
    var x, y, coords;
    $('.snake').removeClass('snake');

    for (var i = 0; i < snakeSegments.length; i++){
      coords = snakeSegments[i];
          x = coords[0];
          y = coords[1];
      $(model.board[x][y]).addClass('snake');
    }
  },

  displayScore: {

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
