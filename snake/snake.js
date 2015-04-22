

var model = {
  //this is where we gen board! :D
  board: function(){

  },

  gridSize: {
    height: 6,
    width: 10
  }

};

var view = {
  init: function(gridSize){
    for( var y = gridSize.height; y > 0; y--){
      var $row = $("<div />", {
        class: 'row',
        'data-y': y
      });
      $('#container').append($row);
      for( var x = gridSize.width; x > 0; x--){
        var $cell = $("<div />", {
          class: 'cell',
          'data-x': x,
          'data-y': y
        });
        $row.append($cell);
      }
    }
  }
};

var controller = {
  init: function(){
    view.init(model.gridSize);
  }

};

$( document ).ready(function() {
  controller.init();
});