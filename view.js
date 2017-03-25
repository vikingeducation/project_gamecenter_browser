'use strict';

var View = {

  init: function(cols, rows){
    this.createBoard(cols, rows);
    this.renderNewScore("0");
  },

  addArrowKeyListeners: function(updateKeyCode, controllerRender){
    $(document).keydown(function(event){
      var keyCode = event.which,
          validKeyCodes = [37, 38, 39, 40];

      if ((validKeyCodes.indexOf(keyCode) !== -1) && (keyCode !== Model.keyCode)) {
        updateKeyCode(keyCode);
        controllerRender();
      }
    });
  },

  render: function(snakeSegments){
    var x, y, coords;
    $('.snake').removeClass('snake');

    for (var i = 0; i < snakeSegments.length; i++){
      coords = snakeSegments[i];
          x = coords[0];
          y = coords[1];
      $(Model.board[x][y]).addClass('snake');
    }
  },

  renderNewApple: function(appleEl){
    $('.apple').removeClass('apple');
    $(appleEl).addClass('apple');
  },

  renderNewScore: function(score){
    $('.score').text(score);
  },

  renderSnakeDeath: function(){
    $('.snake').fadeIn().fadeOut().fadeIn();
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
  }

};
