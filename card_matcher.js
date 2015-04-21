var view = {
  init: function(){
    var size = prompt("Please enter an even number to start your game!","4");
    $container = $( '#container' );
    for (var i = 1; i <= size; i++) {
      view.addRow($container, size);
    }
  },

  addRow: function (grid, columns){
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
  }
};

$( document ).ready(function() {
  controller.init();
});