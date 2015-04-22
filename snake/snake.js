var model = {
  //this is where we gen board! :D
  board: funciton(){

  },

  gridSize: 6

};

var view = {
  init: function(gridSize){
    for( var y = gridSize; y > 0; y--){
      $('#container').append
      //WHERE WE LEFT OFF
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