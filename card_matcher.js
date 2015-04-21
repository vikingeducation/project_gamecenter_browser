"use strict";
var view = {
  init: function(){
    while(model.gridSize % 2 === 1){
      model.gridSize = prompt("Please enter an even number to start your game!","4");
    }

    var $container = $( '#container' );
    for (var i = 1; i <= model.gridSize; i++) {
      view.addRow($container, model.gridSize);
    }
  },


  addRow: function(grid, columns){
    grid.append('<div class="row"></div>');
    for (var i = 1; i <= columns; i++) {
      var $row = $('#container .row').last();
      $row.append('<div class="card"></div>');
    }
  }
};

var controller = {
  init: function(){
    view.init();

    var cardList = model.generateCardList(model.gridSize)
  }
};

var model = {

  gridSize: 1,

  generateCardList: function(numOfCards){
    return model.shuffle(model.generateOrderedArray(numOfCards));
  },

  generateOrderedArray: function(numOfCards){
    var orderedArray = [];
    for( var i = 1; i < numOfCards/2; i++ ) {
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