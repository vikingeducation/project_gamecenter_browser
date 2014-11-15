function turnCardsUp(card, value){
  if(turned_card_values.length == 0){
    card.style.background = #FFF;
    card.innerhtml = value;
    turned_card_values.push(value);
  } else if(turned_card_values.length == 1){
    card.style.background = #FFF;
    card.innerhtml = value;
    turned_card_values.push(value);
    if(turned_card_values[0] == turned_card_values[1]){
      counter += 1;
      count_of_cards_up += 2;
      turned_card_values = [];
      if(count_of_cards_up == selected_card_faces.length){
        alert("You won! It took syou COUNTER turns");
        newBoard();
      }
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