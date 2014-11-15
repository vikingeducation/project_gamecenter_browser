var snakeGame = {

	init: function(){
		num = 20;

    for (var i=0; i<num; i++) {
			$(".gameBoard").append('<tr></tr>');

			for(var j=0; j<num; j++) {
				$(".gameBoard tr").last().append('<td><p id='+j+i+'></p></td>');
			}
		}
		
  },

}





$( document ).ready( function(){snakeGame.init();} );