var model = {

  init: function(){
    this.board_size = 10;
    this.score = 0;
  },

  randomLocation: function(){
    return [
      _.random(1, this.board_size) - 1,
      _.random(1, this.board_size) - 1 
    ]
  },

  placeFood: function(){
    this.food_location = this.randomLocation();

    while(snake.snakeOnPoint(this.food_location)){
      this.food_location = this.randomLocation();
    }
  },

  wonGame: function(){
    return this.score == (this.board_size*this.board_size)-1;
  }
}


var snake = {
  
  init: function(){
    this.currentLocation = model.randomLocation();
    this.moves_array = [[-1,0], [0,-1], [1,0], [0,1]];
    this.direction = _.sample(this.moves_array);
    this.nodes = [this.currentLocation];
  },

  snakeOnPoint: function(coordinate) {
    var return_value = false;
    for (i = 0; i < snake.nodes.length; i++) {
      node = snake.nodes[i];

      if(_.isEqual(node, coordinate)) {
        return_value = true;
        break;
      }
    };
    return return_value;
  },

  foodOnPoint: function(coordinate){
    var return_value = false;
    if(_.isEqual(model.food_location, coordinate)){
      return_value = true;
    }
    return return_value;
  },

  grow: function(){
    var new_location = 
    [this.direction[0] + this.currentLocation[0], 
    this.direction[1] + this.currentLocation[1]];

    if(this.checkLocation(new_location)){
      this.currentLocation = new_location;
      this.nodes.unshift(new_location);

      if (this.foodOnPoint(new_location)){
        model.placeFood();
        model.score++;
      }
      else{
        this.nodes.pop();
      }
      return true;
    }
    else{
      return false;
    }
  },

  checkLocation: function(new_location){
    if (this.offBoard(new_location) || this.snakeOnPoint(new_location)){
      return false;
    }
    else{
      return true;
    }
  },

  offBoard: function(coordinate){
    return coordinate[0] > model.board_size-1 || coordinate[0] < 0 ||
    coordinate[1] > model.board_size-1 || coordinate[1] < 0
  },

  setDirection: function(index){
    this.direction = this.moves_array[index];  
  }

}

