
//upper bound should be 26 or so

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

// function turnCardsUp(card, value){
//   // FIRST FLIP
//   if(turned_card_values.length == 0){

//     card.style.background = #FFF;
//     card.innerhtml = value;
//     turned_card_values.push(value);

//     // SECOND FLIP
//   } else if(turned_card_values.length == 1){
//     card.style.background = #FFF;
//     card.innerhtml = value;
//     turned_card_values.push(value);

//     // MATCH CASE
//     if(turned_card_values[0] == turned_card_values[1]){
//       counter += 1;
//       count_of_cards_up += 2;
//       turned_card_values = [];

//       // GAME WIN CASE
//       if(count_of_cards_up == selected_card_faces.length){
//         alert("You won! It took syou COUNTER turns");
//         newBoard();
//       }
//       // cards don't match flip things down.
//     } else {

//       function returnCards(){
//         counter += 1;
//         turned_card_values = [];
//         var card1 = GETCARD;
//         var card2 = GETCARD;
//         card1.style.background = #AAA;
//         card1.innerhtml = "";
//         card2.style.background = #AAA;
//         card2.innerhtml = "";
//       }
//     }
//   }
// }

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
    cardValue = card.data("val");

    if((moves.length > 0) && (moves[0].attr("id") == card.attr("id"))){
      alert("invalid move. you must pick a different card");
    } else {
      match(card);
      }
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
    if(moves[0].data("val") == moves[1].data("val")){
      alert("you got one" + moves[0]);
    } else {
      turnCardDown(moves[0]);
      turnCardDown(card);
      $('span').text("no match");
    }
    moves = []
  }
}

function checkVictory() {
  if ($('.hidden').length == 0) {
    alert("You have won");
  }
}

// function setDimensions(rows, col) {
//   while !((rows * col)%2 == 0 && side >= 2) {
//     return prompt("How many" + side)
//   }
// }



$(document).ready(function () {
  do {
    rows = prompt("How many rows, bros?");
    cols = prompt("How many columns, golems?");
  }
  while (((rows * cols) % 2 !== 0) || rows < 2 || cols < 2);

  var numCards = rows * cols;
  moves = []
  var deck = setUpDeck(numCards);


  setUpBoard(rows, cols);
	renderCards(deck);

  $('.card').click(function(e){
    var $target = $(e.target);
    turnCardUp($target);
    checkVictory();
  });

});