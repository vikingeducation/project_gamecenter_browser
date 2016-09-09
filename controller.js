
var controller = {
  init: function(){
    this.view = view;
    this.model = model;
    this.view.init();
    this.model.init(parseInt(this.view.gridSize));
    
    var coords = {
      snake: this.model.snake.body,
      food: this.model.food
    }
   this.view.render(coords);


    var thatController = this;
    setInterval( function(e) {
      
      thatController.moveSnake();
      
      coords = {
        snake: thatController.model.snake.body,
        food: thatController.model.food
      };

      //debugger;
      thatController.view.clear();
      thatController.view.render(coords);

    }, 1000);

  },

  moveSnake: function(){
    var direction = this.view.keyPress;
    this.model.updateSnake(direction);
  }
}