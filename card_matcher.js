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

    $( '.turnable' ).click(function(){
      controller.handleClick(this);
    });
  },

  addRow: function(grid, columns){
    grid.append('<div class="row"></div>');
    for (var i = 1; i <= columns; i++) {
      var $row = $('#container .row').last();
      $row.append('<div class="card turnable"></div>');
    }
  },

  attachCardValues: function(cardList){
    $cards = $( '.card' );
    $cards.each(function(){
      var value = cardList.pop()
      $( this ).html( '<span class="number" data-value ="' + value +'">' + value + '</span>' );
    });
  }
};

var controller = {
  init: function(){
    view.init();
    controller.cardList = model.generateCardList();
    view.attachCardValues(controller.cardList);
  },

  cardList: [],

  handleClick: function(card){
    var howManyFaceUp = $( '.face-up' ).length;
    // if zero or one card turned over, turn over
    if(howManyFaceUp === 0 || howManyFaceUp === 1){
      $(card).addClass('face-up');
    };
    howManyFaceUp = $( '.face-up' ).length;
    if(howManyFaceUp === 2){
      $cards = $( '.face-up span' );
      if($cards.first().data('value') === $cards.last().data('value')){
        $cards.parent()
          .addClass('matched')
          .removeClass('face-up')
          .removeClass('turnable');

        // if matched, assign matched class
        console.log("they match! huzzah!");
      } else {
        setTimeout(function() {
          $cards.parent().removeClass('face-up')
        }, 1500);
        console.log("they didn't match. sad face!");
      }
    }
  }
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