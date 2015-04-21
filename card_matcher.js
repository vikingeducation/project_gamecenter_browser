var view = {
  init: function(){
    while(gridSize % 2 === 1){
      gridSize = prompt("Please enter an even number to start your game!","4");
    }

    $container = $( '#container' );
    for (var i = 1; i <= size; i++) {
      view.addRow($container, size);
    }
  },

  gridSize: 1,

  addRow: function(grid, columns){
    grid.append('<div class="row"></div>');
    for (var i = 1; i <= columns; i++) {
      $row = $('#container .row').last();
      $row.append('<div class="card"></div>');
    }
  }
};

var controller = {
  init: function(){
    view.init();

    var cardList = model.generateCardList(view.gridSize)
  }
};

var model = {

  generateCardList: function(numOfCards){
    model.shuffle(model.generateOrderedArray(numOfCards));
  }

  generateOrderedArray: function(numOfCards){
    var orderedArray = [];
    for( i = 1; i < numOfCards/2; i++ ) {
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