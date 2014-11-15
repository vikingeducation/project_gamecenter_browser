var matchingGame = {

	init: function(num){
    for (var i=0; i<num; i++) {
			$(".cards").append('<tr></tr>');

			for(var j=0; j<num; j++) {
				$(".cards tr").last().append('<td class="hidden-card"></td>');
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
		}

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
			}
      $(this).removeClass("hidden-card");
			choices.push($(this));
			if (choices[0].text() == choices[1].text()){
        alert('Match!');
      } else if (choices[1]) {
        setTimeout(function() {
        choices[0].addClass("hidden-card");
        choices[1].addClass("hidden-card"); }, 1000);
      }
		});
	},

	make_move: function(){

	}


};

Array.prototype.shuffle = function(){
 for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
};


$( document ).ready( function(){matchingGame.init(4);} );