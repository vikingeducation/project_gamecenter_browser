	LEFT=37;
	RIGHT=39;
	UP=38;
	DOWN=40;
var snakeGame = {


	init: function(){
		var num = 20;
		var counter=1;
    snakeLength = [];
    for (var i=0; i<num; i++) {
			$(".gameBoard").append('<tr></tr>');
			for(var j=0; j<num; j++) {
				$(".gameBoard tr").last().append('<td id='+counter+'></td>');
				counter+=1;
			}
		}
		snakeGame.draw_snake(num);
		snakeGame.draw_food(num);
		snakeGame.play(num);
  },

  draw_snake: function(num){
  	snake_id = Math.round(Math.random()*(num*num)) + 1;
  	$(".gameBoard td#"+snake_id).addClass("snake-head");
    snakeLength.push(parseInt(snake_id));
  },

  draw_food: function(num){
  	var food_id = Math.round(Math.random()*(num*num)) + 1;
  	while (food_id == snake_id){
  		food_id = Math.round(Math.random()*(num*num)) + 1;
  	}
  	$(".gameBoard td#"+food_id).addClass("food");
  },

  play: function(num){
  	var currentMove = '';

		setInterval(function() {
		  if (currentMove !== '') {
		    snakeGame.move(currentMove,num);
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

  move: function(direction,num){
  	var currentID = parseInt($('td.snake-head').attr('id'));
    var nextID;

  	switch(direction) {
			case 'r':
				nextID = currentID+1;
				break;
			case 'l':
				nextID = currentID-1;
				break;
			case 'u':
				nextID = currentID-num;
				break;
			case 'd':
				nextID = currentID+num;
				break;
		}

		$('#'+currentID).removeClass('snake-head');
		$('#'+nextID).addClass('snake-head');

    if($('#'+nextID).hasClass('food'))
      { $('#'+nextID).removeClass('food');
        snakeGame.draw_food(num); }
    else
      { snakeLength.shift(); }

    if($('#'+nextID).hasClass('snake')
      || nextID > num*num || nextID < 1
      || (nextID % num == 0 && nextID == currentID - 1)
      || (currentID % num == 0 && nextID == currentID + 1) )
      { alert('GAME OVER\nFinal Length:' + (snakeLength.length + 1));
        snakeLength = [];
        currentMove = undefined;
        $('td').removeClass('snake');
        $('td').removeClass('snake-head'); }
    else {
      snakeLength.push(nextID);

      $('td').removeClass('snake');

      snakeLength.forEach(function(section)
        { $("#"+section).addClass('snake'); });
    }

  }

}





$( document ).ready( function(){snakeGame.init();} );