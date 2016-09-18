
var controller = {
  init: function(){
    this.view = view;
    this.model = model;
    this.view.init();
    this.model.init(parseInt(this.view.gridSize));
    var coords = {
      game: this.model.snake.dead,
      snake: this.model.snake.body,
      food: this.model.food
    };
   this.view.render(coords);

    var thatView = this.view;
    var thatController = this;
    
    var play = setInterval( function(e) {
      if (thatController.model.snake.dead) {
        thatView.done();
        alert("Game is Over");
        clearInterval(play);
      } else {
      
        thatController.moveSnake();
        
        coords = {
          game: thatController.model.snake.dead,
          snake: thatController.model.snake.body,
          food: thatController.model.food
        };



        //debugger;
        thatController.view.clear();
        thatController.view.render(coords);
      }


    }, 200);

    

  },

  moveSnake: function(){
    var direction = this.view.keyPress;
    this.model.updateSnake(direction);
  }
}