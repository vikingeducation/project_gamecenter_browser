var view = {

  init: function(){
    //SET UP EVENT LISTENERS AND run buildBoard first time, called in 
    //controller

    this.buildBoard();

    
    $(document).keyup(function(event){
      
      controller.keyUpActions();
    })
  },


  render: function(){
    //RUN ALL FUNCTION NECESSARY TO RENDER CURRENT STATE OF DATA
    //I BELIEVE this is displayBoard, but I'll keep it for now
  },



  displayBoard: function(){
    var grid = model.grid;

    for(var row = 0; row < 8; row++){
      for( var col = 0; col < 8; col++){
        if(grid[row][col] === 1){
          $target = $(".row[data-row=" + row + "]")
                    .find(".col[data-col=" + col +"]");
          $target.addClass("snake");
        } else if(grid[row][col] === 8) {
          $target = $(".row[data-row=" + row + "]")
                    .find(".col[data-col=" + col +"]");
          $target.addClass("snake");
        } else if(grid[row][col] === 2){
          $(".row[data-row=" + row + "]").find(".col[data-col=" + col +"]")
                                          .addClass("food");
        } else if(grid[row][col] === 0){
          $(".row[data-row=" + row + "]").find(".col[data-col=" + col +"]")
                                          .removeClass("snake");
        }
      };//end col
    };//end row
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