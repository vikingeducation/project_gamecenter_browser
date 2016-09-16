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
    //RUN ALL FUNCTION NECESSARY TO RENDER CURRENT STATE OF DATA
    //I BELIEVE this is displayBoard, but I'll keep it for now
  },



  displayBoard: function(){
    $(".col").removeClass("snake");
    $(".col").removeClass("food");

    var snake = model.snake;
    var food = model.food;

    snake.forEach(function(coords){
      var row = coords[0];
      var col = coords[1];

      $segment = $(".row[data-row=" + row + "]")
                  .find(".col[data-col=" + col + "]");
      
      $segment.addClass("snake");
    })

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
  },

  eatFood: function(){
    $(".food").removeClass("food");
  }


}//end view