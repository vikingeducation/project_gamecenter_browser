var matchingGame = {

	init: function(){
    var num = 1;

    while ( num % 2 !== 0 ) {
      num = prompt("How many rows would you like?");
    }

    for (var i=0; i<num; i++) {
			$(".cards").append('<tr></tr>');

			for(var j=0; j<num; j++) {
				$(".cards tr").last().append('<td><p class="unmatched" id='+j+i+'></p></td>');
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
		$('td').on('click',function(){
      $(this).find("p.unmatched").addClass('selected');
      $(this).find("p").show();
      var $selection = $('p.selected');

      if($selection.length >= 2) {
        if ($($selection[0]).attr('id') != $($selection[1]).attr('id') && $($selection[0]).text() == $($selection[1]).text())
          { alert('match');
            $selection.removeClass('selected');
            $selection.removeClass('unmatched');
        } else {
          $selection.removeClass('selected');
          setTimeout(function() { $selection.filter('.unmatched').hide(); }, 1000);
        }
      }
		});
	}

};

Array.prototype.shuffle = function(){
 for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
};


$( document ).ready( function(){matchingGame.init();} );