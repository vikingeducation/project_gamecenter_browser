function shuffle(array) {
  var counter = array.length, temp, index;

  // While there are elements in the array
  while (counter > 0) {
  // Pick a random index
  index = Math.floor(Math.random() * counter);

  // Decrease counter by 1
  counter--;

  // And swap the last element with it
  temp = array[counter];
  array[counter] = array[index];
  array[index] = temp;
  }

  return array;
}

function renderCards(deck) {

  var length = deck.length;
 	for (i = 1; i <= length; i++) {
 		// create X number of divs
 		// each has an individual ID


    var cardValue = deck.pop();

 		$('#board').append(
			"<div class='card' data-val = '" + cardValue + "'  id=\'card" + i + "\'>" +
			"<div class='front hidden'>" + cardValue + "</div>" +
      "<div class='back'></div>" +
			"</div>"
		);
 	}
}

function setUpBoard(rows, cols) {
  $('#board').css({
    'height' : (100 * rows) + 'px',
    'width' : (100 * cols) + 'px'
  });

};


function setUpDeck(numCards) {
  var arr = [];
  for (i = 1; i <= numCards / 2; i++){
    arr.push(i);
    arr.push(i);
  };
  console.log(arr);
  return shuffle(arr);
}

function turnCardUp(card) {
  if (card.children().filter(".front").hasClass("hidden")) {
    card.children().filter(".front").removeClass("hidden");
    match(card);
  }
}

function turnCardDown(card) {
  setTimeout(function(){
    card.children().filter(".front").addClass("hidden");
  }, 500);
}

function match(card){
  if(moves.length == 0){
    moves.push(card);
  } else {
    moves.push(card);
    if (moves[0].data("val") !== moves[1].data("val")){
      turnCardDown(moves[0]);
      turnCardDown(card);
    }
    moves = []
  }
}

function checkVictory() {
  if ($('.hidden').length == 0) {
    alert("You have won");
  }
}



$(document).ready(function () {

  while(true) {
    rows = prompt("How many rows, bros?");
    cols = prompt("How many columns, golems?");
    numCards = rows * cols;

    if ( (numCards % 2 == 0) || (rows >= 2) || (cols >= 2) ) break

    //only runs if you got something wrong
    alert('Try again. You need an even number of cards total, and there must be at least 2 rows and 2 columns.');
  }

  moves = [];
  var deck = setUpDeck(numCards);


  setUpBoard(rows, cols);
	renderCards(deck);

  $('.card').click(function(e){
    var $target = $(e.target);
    turnCardUp($target);
    checkVictory();
  });

});