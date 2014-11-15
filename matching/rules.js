function turnCardsUp(card, value){
  // FIRST FLIP
  if(turned_card_values.length == 0){

    card.style.background = #FFF;
    card.innerhtml = value;
    turned_card_values.push(value);

    // SECOND FLIP
  } else if(turned_card_values.length == 1){
    card.style.background = #FFF;
    card.innerhtml = value;
    turned_card_values.push(value);

    // MATCH CASE
    if(turned_card_values[0] == turned_card_values[1]){
      counter += 1;
      count_of_cards_up += 2;
      turned_card_values = [];

      // GAME WIN CASE
      if(count_of_cards_up == selected_card_faces.length){
        alert("You won! It took syou COUNTER turns");
        newBoard();
      }
      // cards don't match flip things down.
    } else {

      function returnCards(){
        counter += 1;
        turned_card_values = [];
        var card1 = GETCARD;
        var card2 = GETCARD;
        card1.style.background = #AAA;
        card1.innerhtml = "";
        card2.style.background = #AAA;
        card2.innerhtml = "";
      }
    }
  }
}