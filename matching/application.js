var matchingGame = {

	init: function(num){
    for (var i=0; i<num; i++) {
			$(".cards").append('<tr></tr>');

			for(var j=0; j<num; j++) {
				$(".cards tr").last().append('<td></td>');
			}
		}	
		this.add_value_to_cell(num);
	},

	generate_matches: function(num){
		var num_pairs = (num*num)/2;
		var pairs = [];
		for (var i=0; i<num_pairs; i++) {
			random_num = i ;
			pairs.push(random_num);
			pairs.push(random_num);
		};
		
		return pairs;
	},

	add_value_to_cell: function(num){
		var pairs_array = matchingGame.generate_matches(num);
		$('td').each(function(){
			$(this).text(pairs_array.shuffle().pop());	
		});
		matchingGame.play_game();
	},

	play_game: function(){
		gameover = false;
		choices=[];
		$('td').on('click',function(){
			if (choices.length ==2){
				choices=[];
			};

			choices.push($(this).text());
			if (choices[0] == choices[1]){
				alert('Match!');
			};	
		});
	},

	make_move: function(){

	}


};

Array.prototype.shuffle = function(){
 for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
}


$( document ).ready( function(){matchingGame.init(4);} );