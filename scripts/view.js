'use strict;'

var view = {

  init: function(){
    // set listeners
    $('#play-button').click(controller.beginGame);

  },

  render: function(){
    var score = controller.getScore();
    $('#score').text(score);

    // Render snake
    model.snake.forEach(function(segment){
      $('div[data-x="' + segment.x + '"][data-y="' + segment.y + '"]')
        .removeClass('empty')
        .addClass('snake')
    });
  },

  renderFood: function(){
    // TODO: render only when re-generated
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