'use strict;'


var model = {
  init: function() {
    // build array of units (each a pair of coords)
    // create snake with starting coords
    // randomly spawn food
  },

  units: [],
  // array of coords, first in array is head
  // move snake by looking at head and direction, figure out new coords, shift new coords onto snake array, pop tail coords off(unless food is eaten)

  snake: {
    coordinates: [],
    direction: 'left'
  },

  food: {
    coordinates: []
  },
}



var view = {
  init: function(gridSize) {
    view.buildGrid(gridSize);
  },

  buildGrid: function(size) {
    // set .board max width
    for(var i = 0; i < Math.pow(size, 2); i++) {
      $('.board').append("<div class='unit'></div>")
    }

  },

  render: function() {

  }
}



var controller = {
  init: function() {
    //fire up the model
    //start and render the view
    view.init(10);
    //start the loop
  }
}



$(document).ready( function() {
  controller.init();
})