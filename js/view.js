var view = {

  init: function(){
    //SET UP EVENT LISTENERS AND run buildBoard first time, called in 
    //controller

    this.buildBoard();

    
    $(document).keyup(function(event){
      
      controller.keyUpActions(event);
    })
  },


  render: function(){
    this.displayBoard();
    this.displayScore();
  },

  displayScore: function(){
    $("#score").text("Score: " + controller.score());
  },



  displayBoard: function(){
    $(".col").removeClass("snake");
    $(".col").removeClass("food");

    var snake = model.snake;
    var food = model.food;
    //console.log("start adding snakes");
    snake.forEach(function(coords){
      var row = coords[0];
      var col = coords[1];

      $segment = $('.row[data-row="' + row + '"]')
                  .find('.col[data-col="' + col + '"]');
      //console.log($segment.length + " snake added");
      $segment.addClass("snake");
    })
    //console.log("stop adding snakes");

    //console.log($(".snake").length);  //no elements with class snake

    var row = food[0];
    var col = food[1];

    $food = $(".row[data-row=" + row + "]")
                  .find(".col[data-col=" + col + "]");

    $food.addClass("food");
  },

  buildBoard: function(){
    var grid = model.grid;

    for(var row = 0; row < 8; row++){
      var $row = $("<div class='row'></div>")
                    .attr("data-row", row);

      $("#board").append($row);

      for( var col = 0; col < 8; col++){
        var $col = $("<div class='col'></div>")
                    .attr("data-col", col)
                    .attr("data-row", row);

        $row.append($col);


      };//end cols
    };//end rows
  },//END buildBoard()

  gameOver: function(){
    $("#status").text("GAME OVER");

    //$(document).off();
    //turned off for debugging
  },

  eatFood: function(){
    $(".food").removeClass("food");
  }


}//end view