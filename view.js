var view = {
  init: function(){
    this.gridSize = prompt("How large a grid do you want? (in px)");
    var $mainBox = $("<div></div>")
                    .addClass("box")
                    .css("width", this.gridSize + "px")
                    .css("height", this.gridSize + "px");
    $('body').append($mainBox);
    //keyboard listeners
  },
  render: function(coords){
    var $food = $("<div></div>")
      .addClass("food")
      .css("left", coords.food.x)
      .css("top", coords.food.y)
      .css("width", (this.gridSize/40) + "px")
      .css("height", (this.gridSize/40) + "px");
    $('.box').append($food);
  }
}