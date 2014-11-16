var snakeGame = {
  init: function(){
    var counter=1;
    for (var i=0; i<this.scale; i++) {
      $(".gameBoard").append('<tr></tr>');
      for(var j=0; j<this.scale; j++) {
        $(".gameBoard tr").last().append('<td id='+counter+'></td>');
        counter+=1;
      }
    }
    snakeGame.draw_snake();
    snakeGame.draw_food();
    snakeGame.play();
  },

  snake: [],
  scale: 20,

  draw_snake: function(){
    snake_id = Math.round(Math.random()*(this.scale*this.scale)) + 1;
    $(".gameBoard td#"+snake_id).addClass("snake-head snake");
    snakeGame.snake.push(snake_id);
  },

  draw_food: function(){
    var food_id = Math.round(Math.random()*(this.scale*this.scale)) + 1;
    while ($(".gameBoard td#"+food_id).hasClass('snake')){
      food_id = Math.round(Math.random()*(this.scale*this.scale)) + 1;
    }
    $(".gameBoard td#"+food_id).addClass("food");
  },

  play: function(){
    var currentMove = '';

    setInterval(function() {
      if (currentMove !== '') {
        snakeGame.move(currentMove);
      }
    }, 100);

    $(document).keydown(function(event) {
      currentMove = event.which;
    });
  },

  setNext: function(direction, currentID) {
    switch(direction) {
      case 37: return currentID-1;          // left
      case 38: return currentID-this.scale; // up
      case 39: return currentID+1;          // right
      case 40: return currentID+this.scale; // down
    }
  },

  move: function(direction){
    var $current  = $('td.snake-head');
    var currentID = parseInt($current.attr('id'), 10);
    var nextID    = snakeGame.setNext(direction, currentID);
    var $next     = $('#'+nextID);

    if($next.hasClass('food'))
      { $next.removeClass('food');
        snakeGame.draw_food();
        $('#score-box').text(snakeGame.snake.length+1); }
    else
      { snakeGame.snake.shift(); }

    if($next.hasClass('snake') ||
        nextID > this.scale*this.scale ||
        nextID < 1 ||
        (nextID % this.scale === 0 && nextID == currentID - 1) ||
        (currentID % this.scale === 0 && nextID == currentID + 1) )
      { alert('GAME OVER\nFinal Length: ' + (snakeGame.snake.length + 1));
        snakeGame.snake = [];
        currentMove = undefined;
        $('td').removeClass('snake');
        $('td').removeClass('snake-head'); }
    else {
      $current.removeClass('snake-head');
      $next.addClass('snake-head');
      snakeGame.snake.push(nextID);

      $('td').removeClass('snake');

      snakeGame.snake.forEach(function(section)
        { $("#"+section).addClass('snake'); });
    }
  }
};

$( document ).ready( function(){snakeGame.init();} );