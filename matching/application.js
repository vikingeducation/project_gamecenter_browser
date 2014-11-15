var matchingGame = {

	init: function(){
    var num = 1;

    while ( num % 2 !== 0 ) {
      num = prompt("How many rows would you like?");
    }

    for (var i=0; i<num; i++) {
			$(".cards").append('<tr></tr>');

			for(var j=0; j<num; j++) {
				$(".cards tr").last().append('<td><p id='+j+i+'></p></td>');
			}
		}
		this.add_value_to_cell(num);
		matchingGame.play_game();
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
    $('td p').each(function(){
      $(this).text(pairs_array.shuffle().pop());
      $(this).hide();
    });
	},

	play_game: function(){
		gameover = false;
		var choices=[];
		$('td').on('click',function(){
			if (choices.length ==2){
				choices=[];
			}
      $(this).find("p").show();
      choices.push($(this).find("p"));

			if ( choices[0].attr('id') != choices[1].attr('id') && choices[0].text() == choices[1].text()){
        alert('Match!');
      } else if (choices[1]) {
        setTimeout(function() {
        choices[0].hide();
        choices[1].hide(); }, 1000);
      }
		});
	}

};

Array.prototype.shuffle = function(){
 for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
};


$( document ).ready( function(){matchingGame.init();} );