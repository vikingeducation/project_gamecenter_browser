LEFT  = 37;
RIGHT = 39;
UP    = 38;
DOWN  = 40;

var snakeGame = {
  init: function(){
    var counter=1;
    for (var i=0; i<snakeGame.scale; i++) {
      $(".gameBoard").append('<tr></tr>');
      for(var j=0; j<snakeGame.scale; j++) {
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
    snake_id = Math.round(Math.random()*(snakeGame.scale*snakeGame.scale)) + 1;
    $(".gameBoard td#"+snake_id).addClass("snake-head snake");
    snakeGame.snake.push(snake_id);
  },

  draw_food: function(){
    var food_id = Math.round(Math.random()*(snakeGame.scale*snakeGame.scale)) + 1;
    while ($(".gameBoard td#"+food_id).hasClass('snake')){
      food_id = Math.round(Math.random()*(snakeGame.scale*snakeGame.scale)) + 1;
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
      if (event.which === RIGHT) {
        currentMove = 'r';
      } else if (event.which === LEFT) {
        currentMove = 'l';
      } else if (event.which === UP) {
        currentMove = 'u';
      } else if (event.which === DOWN) {
        currentMove = 'd';
      }
    });
  },

  setNext: function(direction, currentID) {
    switch(direction) {
      case 'r':
        return currentID+1;
      case 'l':
        return currentID-1;
      case 'u':
        return currentID-snakeGame.scale;
      case 'd':
        return currentID+snakeGame.scale;
    }
  },

  move: function(direction){
    var $current  = $('td.snake-head');
    var currentID = parseInt($current.attr('id'));
    var nextID    = snakeGame.setNext(direction, currentID);
    var $next     = $('#'+nextID);

    if($next.hasClass('food'))
      { $next.removeClass('food');
        snakeGame.draw_food();
        $('#score-box').text(snakeGame.snake.length+1); }
    else
      { snakeGame.snake.shift(); }

    if($next.hasClass('snake') || nextID > snakeGame.scale*snakeGame.scale || nextID < 1 || (nextID % snakeGame.scale === 0 && nextID == currentID - 1) || (currentID % snakeGame.scale === 0 && nextID == currentID + 1) )
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