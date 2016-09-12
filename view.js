var view = {
  init: function(){
    alert("Welcome to Snake! Use the arrow keys to move the snake to eat the food. If the snake hits the wall or itself, the game is over. Hit OK to start playing.")
    this.gridSize = "400";

    var $mainBox = $("<div></div>")
                    .addClass("box")
                    .css("width", this.gridSize + "px")
                    .css("height", this.gridSize + "px");
    $('body').append($mainBox);
    

    //keyboard listeners
    var thatView = this;
    $(document).on("keydown", function(e) {
      thatView.keyPress = e.which;      
    });
  },

  clear: function(){
    $(".box").empty();
  },

  render: function(coords){
    //render score
    $("#score").text("Your score: " + coords.score);
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