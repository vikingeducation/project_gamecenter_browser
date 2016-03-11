var model = {
//////////////////////////BOARD INFO/////////////////////////////
  boardSize: 12,//from window size

  snakeSize: 1,
////////////////////////////////////////////////////////////////

//////////////////////////FOOD INFO/////////////////////////////
  foodLocation:{
    top: 0,
    left: 0,
  },

  //gets random place to put food
  randFoodLocation: function(){

  },
////////////////////////////////////////////////////////////////

//////////////////////////SNAKE INFO/////////////////////////////
  snakeHeadLocation:{
    top: 0,
    left: 0,
  },


  directions: {
    up: {top: -10,
         left: 0},
    down: {top: 10,
           left: 0},
    left: {top: 0,
           left: -10},
    right: {top: 0,
            left: 10}
  },


  $snake: $('.node'),


  // actually change the data values of each node
  updateCoordinates: function() {
    $.each(this.$snake, function(index, node) {
      // add vector to top
      $(node).attr('data-top', $(node).data('top') + model.directions[controller.direction]['top'])
      // add vector to left
      $(node).attr('data-left', $(node).data('left') + model.directions[controller.direction]['left'])
    })
  }





////////////////////////////////////////////////////////////////

}

