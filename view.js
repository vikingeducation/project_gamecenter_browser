'use strict';

var view = {

  init: function(cols, rows){

    view.createBoard(cols, rows);
    $(document).keydown(function(event){
      var notReversed = model.checkReverse(event.which)

      if (notReversed) {
        model.updateKeyCode(event.which);
      }
    });

    this.renderNewScore("0");
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

  renderNewApple: function(appleEl){
    $('.apple').removeClass('apple');
    $(appleEl).addClass('apple');
  },

  renderNewScore: function(score){
    $('.score').text(score);
  },

  createBoard: function(rows, columns){
    var gameBoard = $('.game-board');

    for (var row = 0; row <= rows; row++){
      for (var col = 0; col <= columns; col++){
        var cellEl = $('<div>').addClass('cell')
                               .attr('x', row)
                               .attr('y', col);
         gameBoard.append(cellEl);
      }
      gameBoard.append('<br>');
    }
  },



};
