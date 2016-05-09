'use strict;'

var view = {

  init: function(){
    // set listeners
    $('#play-button').click(controller.beginGame);

  },

  render: function(){
    var score = controller.getScore();
    $('#score').text(score);

    // Re-render board with snake and food
  },

  initializeBoard: function(){
    // render initial empty board
    var boardSize = controller.getBoardSize();

    for (var row = 0; row < boardSize; row++) {
      for (var col = 0; col < boardSize; col++) {
        var $square = $('<div class="empty"></div>')
          .attr('class', 'empty')
          .attr('data-x', col)
          .attr('data-y', row);

        $('#board').append($square);
      }
      $('#board').append('<br>');
    }

  }

};