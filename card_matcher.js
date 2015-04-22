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

    $( '.card' ).click(function(){
      controller.handleClick(this);
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
        model.pointCounter++;
        $( '#points' ).text( model.pointCounter );
        $cards.parent()
          .addClass('matched')
          .removeClass('face-up')
          .off('click');
      } else {
        setTimeout(function() {
          $cards.parent().removeClass('face-up');
        }, 1500);
      }
    }
    if(model.gameOver()){
      alert("YOU WON!");
    }
  }
};

var model = {

  gridSize: 1,

  pointCounter: 0,

  gameOver: function(){
    return $( '.matched' ).length == model.numOfCards();
  },

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