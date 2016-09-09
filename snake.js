var snakeView = {

  init: function(){
    this.buildGrid();
  },

  buildGrid: function() {
    for (var i = 0; i < 400; i++) {
      $('body').append($('<div/>'));
      var row = Math.floor(i / 20);
      var col = Math.floor(i % 20);
      $('div').last().attr('row', row).attr('col', col);
    }
  }
};


function Snake(length) {
  this.length = length;
  this.headCoords = [10, 10]
}


var snakeModel = {

  init: function(){
    this.snake = new Snake(1);
  },





};





var snakeController = {
  init: function() {
    this.model = snakeModel;
    this.view = snakeView;
    this.model.init();
    this.view.init();
  }

  

};




$(document).ready(function() {
  snakeController.init();
});