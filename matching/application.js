var matchingGame = {

	init: function(num){
    for (var i=0; i<num; i++) {
			$(".cards").append('<tr></tr>');

			for(var j=0; j<num; j++) {
				$(".cards tr").append('<td>X</td>');
			}
		}
	}

};

$( document ).ready( function(){matchingGame.init(2);} );