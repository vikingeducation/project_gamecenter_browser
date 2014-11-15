

var Game = {

	var initialize = function(num){
		for (var i=0; i<num; i++) {
			$(".cards").append('<tr>');

			for(var j=0; j<num; j++) {
				$(".cards").find('<tr>').last.append('<td>X</td>');

			}
			$(".cards").find('</td>').last.append('</tr>');
		}
	}







};