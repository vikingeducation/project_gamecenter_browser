var view = {

  init: function(){
    $(document).keydown(function(event){
      if (event.keyCode == 37){
        snake.setDirection(0);
      }
      else if (event.keyCode == 38){
        snake.setDirection(1);
      }
      else if (event.keyCode == 39){
        snake.setDirection(2);
      }
      else if (event.keyCode ==40){
        snake.setDirection(3);
      }
    })
    this.render();
  },

  render: function(){
    $("#board").html("");
    $("#score").html(model.score);

    for (var y = 0; y < model.board_size; y++){
      for (var x = 0; x < model.board_size; x++){
    
        if(snake.snakeOnPoint([x,y])){
          $("#board").append("S");
        }
        else if(snake.foodOnPoint([x,y])){
           $("#board").append("F");
        }
        else{
          $("#board").append("<span class='open'>o</span>");
        }                                                            
      }
      $("#board").append('<br>');
    }
  },
}
