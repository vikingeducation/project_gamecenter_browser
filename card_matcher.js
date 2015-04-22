" use strict";

var view = {
  init: function(){
    while(model.gridSize % 2 === 1){
      model.gridSize = prompt("Please enter an even number to start your game!","4");
    }

    var $container = $( '#container' );
    for (var i = 1; i <= model.gridSize; i++) {
      view.addRow($container, model.gridSize);
    }

    $cards = $( '.card' );
    $cards.click(function(){
      $(this).toggleClass('face-up');
    });
  },

  addRow: function(grid, columns){
    grid.append('<div class="row"></div>');
    for (var i = 1; i <= columns; i++) {
      var $row = $('#container .row').last();
      $row.append('<div class="card"></div>');
    }
  },

  attachCardValues: function(cardList){
    $cards = $( '.card' );
    $cards.each(function(){
      $( this ).html( '<span class="number">' + cardList.pop() + '</span>');
    });
  }
};

var controller = {
  init: function(){
    view.init();
    controller.cardList = model.generateCardList();
    view.attachCardValues(controller.cardList)
  },

  cardList: []
};

var model = {

  gridSize: 1,

  numOfCards: function(){
    return model.gridSize * model.gridSize;
  },

  generateCardList: function(){
    return model.shuffle(model.generateOrderedArray());
  },

  generateOrderedArray: function(){
    var orderedArray = [];
    var numOfPairs = model.numOfCards() / 2;
    for( var i = 1; i <= numOfPairs; i++ ) {
      orderedArray.push(i);
      orderedArray.push(i);
    }
    return orderedArray;
  },

  // Blatantly stolen from StackOverflow
  shuffle: function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
};

$( document ).ready(function() {
  controller.init();
});