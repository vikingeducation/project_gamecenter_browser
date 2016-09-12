
var controller = {
  init: function(){
    this.view = view;
    this.model = model;
    this.view.init();
    this.model.init(parseInt(this.view.gridSize));
    var coords = {
      snake: this.model.snake.body,
      food: this.model.food,
      score: this.model.score
    }
   this.view.render(coords);


    var thatController = this;
    tick = setInterval( function(e) {
      
      thatController.moveSnake();
      
      coords = {
        snake: thatController.model.snake.body,
        food: thatController.model.food,
        score: thatController.model.score
      };

      thatController.view.clear();
      thatController.view.render(coords);
      thatController.checkEndGame();
    }, 200);

  },

  moveSnake: function(){
    var direction = this.view.keyPress;
    this.model.updateSnake(direction);
    if(this.model.checkEatFood()){
      this.model.growSnake();
      this.model.createFood();
      this.model.updateScore();
    }
  },

  checkEndGame: function(){
   if(this.model.gameOver()){
    clearInterval(tick);
    setTimeout(function(){alert("Game over!");},100);
   }
  }

}