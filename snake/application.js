	LEFT=37;
	RIGHT=39;
	UP=38;
	DOWN=40;
var snakeGame = {


	init: function(){
		var num = 20;
		var counter=1;
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
  	$(".gameBoard td#"+snake_id).addClass("snake");
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
  	var currentID = parseInt($('td.snake').attr('id'));
  	alert(currentID);

  	switch(direction) {
			case 'r':
				var nextID = currentID+1;
				alert(nextID);
				break;
			case 'l':
				var nextID = currentID-1;
				alert(nextID);
				break;
			case 'u':
				var nextID = currentID-num;
				alert(nextID);
				break;
			case 'd':
				var nextID = currentID+num;
				alert(nextID);
				break;
		}

		$('#'+currentID).removeClass('snake');
		$('#'+nextID).addClass('snake');


  }

}





$( document ).ready( function(){snakeGame.init();} );