var controller = {

  init: function(){
    model.init();
    snake.init();
    model.placeFood();
    view.init();
    this.game_over = false;
    setInterval(this.gameLoop, 300);
  },
  gameLoop: function(){

    if (this.game_over){
      return
    }

    if (!snake.grow()){
      alert("You lose :(");
        this.game_over = true;
    }
    
    view.render();

    if(model.wonGame()){
      alert("You win!")
      this.game_over = true;
    }    
  }
}

$(document).ready(function() {
    controller.init();
});

