var view = {
  init: function(){
    this.gridSize = prompt("How large a grid do you want? (in px)");


    var $mainBox = $("<div></div>")
                    .addClass("box")
                    .css("width", this.gridSize + "px")
                    .css("height", this.gridSize + "px");
    $('#snake-body').append($mainBox);
    

    //keyboard listeners
    var thatView = this;
    $(document).on("keydown", function(e) {
      //console.log("hahahaha");
      //left: 37
      //up: 38
      //right: 39
      //down: 40
      thatView.keyPress = e.which;
      console.log("This is from the listener: "+ thatView.keyPress);
      
    });
  },

  done: function() {
    $(document).off();
  },

  clear: function(){
    $(".box").empty();
  },

  render: function(coords){
    //snake is dead?
    $('#status').text("dead is: " + coords.game);

    //update score
    $('#score').text("Length of Snake: " + coords.snake.length);

    // render food
    var $food = $("<div></div>")
      .addClass("food")
      .css("left", coords.food.x)
      .css("top", coords.food.y)
      .css("width", (this.gridSize/40) + "px")
      .css("height", (this.gridSize/40) + "px");
    $('.box').append($food);

    // render snake by iterating through snake's body
    var thatGridSize = this.gridSize;
    coords.snake.forEach( function(el) {
      var $snake = $("<div></div>")
        .addClass("snake")
        .css("left", el[0])
        .css("top" , el[1])
        .css("width", (thatGridSize/40) + "px")
        .css("height", (thatGridSize/40) + "px");
      $('.box').append($snake);
    });
  }
}