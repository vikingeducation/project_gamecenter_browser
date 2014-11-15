function board(){

  var cols, rows;

  var cards = [];

  var selected_card_faces = [];

  count_of_cards_up = 0;

  var turned_card_values = [];

  counter = 0;

  //selecting card text
  var all_card_faces = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L' 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  //get dimension, assuming input boxes
  function getCols(){
  cols = $('#cols').value;
  return cols;
  }

  function getRows(){
  rows = $('#rows').value;
  return rows;
  }

  // select cards from all_card array
  function selectCards(){
    for (var i = 0; i < Number(getcols()) * Number(getrows()); i++){
    var random_card = floor(random(all_card_faces.length));
    var a_card_face = all_card_faces[random_card];
    selected_card_faces.push(a_card_face);
    selected_card_faces.push(a_card_face);
    all_card_faces.splice(random_card, 1);
    };
    selected_card_faces.sort(function(){
      return 0.5 - random();
    }
  }

  //pushing individual card into cards

  for (var c = 0; c < getcols(); c++) {
  for (var r = 0; r < getrows(); r++) {
    cards.push(new card)
  }
}

}