'use strict;'

var view = {

  init: function(){
    // Begin play listener
    $('#play-button').click(controller.beginGame);

    // Change direction listener
    $(document).keydown(model.setDirection);

  },

  render: function(){
    var score = controller.getScore();
    $('#score').text(score);

    // Render snake
    model.snake.forEach(function(segment){
      $('div[data-x="' + segment.x + '"][data-y="' + segment.y + '"]')
        .removeClass('empty')
        .addClass('snake');
    });

    // Change previous tail back to empty
    $('div[data-x="' + model.previousTail.x + '"][data-y="' + model.previousTail.y + '"]')
        .removeClass('snake')
        .addClass('empty');
  },

  renderFood: function(){
    $('div[data-x="' + model.food.x + '"][data-y="' + model.food.y + '"]')
        .html('<img class="food" src="images/mouse.png">');
  },

  removeFood: function(){
    $('div[data-x="' + model.food.x + '"][data-y="' + model.food.y + '"]')
        .html('');
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