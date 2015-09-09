'use strict;'


var model = {
  init: function(gridSize) {
    model.units = model.buildGrid(gridSize);
    model.snake.spawn();
    model.food.spawn();
  },

  // All units in grid [id,x,y,snake?,food?]
  units: [],
  // array of coords, first in array is head
  // move snake by looking at head and direction, figure out new coords, shift new coords onto snake array, pop tail coords off(unless food is eaten)

  snake: {
    units: [],
    direction: 'right',

    spawn:function() {
      var startingUnit = model.findUnitByCoordinates(3,4);
      model.snake.units = [startingUnit];
      startingUnit.snake = true;
    }
  },


  food: {
    unit: [],

    spawn: function() {
      var sample = model.food.randomSpawn();
      model.food.unit = [sample];
      sample.food = true;
    },

    randomSpawn: function() {
      var available = $.grep(model.units, function(unit) {
        return (unit.snake === false);
      });
      return available[Math.floor(available.length * Math.random())];
    }
  },

  buildGrid: function(size) {
    var output = [];
    for(var i = 0; i < Math.pow(size, 2); i++) {
      var newUnit = new model.unitConstructor(i);
      output.push(newUnit);
    }
    return output;
  },

  unitConstructor: function(i) {
    this.id = i;
    this.x = i % 10;
    this.y = Math.floor(i / 10);
    this.snake = false;
    this.food = false;
  },

  findUnitByCoordinates: function(x, y) {
    var i = y*10 + x;
    return model.units[i];
  },

  getSnakeIDs: function() {
    return $.map(model.snake.units, function(unit) {
      return unit.id
    });
  },

  getSnakeDirection: function() {
    return model.snake.direction;
  },

  getFoodIDs: function() {
    return model.food.unit[0].id;
  }


}



var view = {
  init: function(gridSize) {
    view.buildGrid(gridSize);
    controller.show();
  },

  buildGrid: function(size) {
    // set .board max width
    for(var i = 0; i < Math.pow(size, 2); i++) {
      $('.board').append("<div class='unit'></div>")
    }

  },

  renderFrame: function(snakeIDs, snakeHeadID, direction, foodID) {
    view.resetFrame();
    $.each( snakeIDs, function(i,id) { view.drawSnake(id) } );
    view.drawSnakeHead(snakeHeadID, direction);
    view.drawFood(foodID);
  },

  resetFrame: function() {
    $('.board').children().removeClass('food snake head left right up down');
  },

  drawFood: function(i) {
    $('.board').children().eq(i).addClass('food');
  },

  drawSnake: function(i) {
    $('.board').children().eq(i).addClass('snake');
  },

  drawSnakeHead: function(i, direction) {
    $('.board').children().eq(i).addClass('head ' + direction);
  }
}



var controller = {
  init: function() {
    model.init(10);
    view.init(10);
    //start the loop
  },

  show: function() {
    var snakeIDs = model.getSnakeIDs();
    var snakeHeadID = snakeIDs[0];
    var direction = model.getSnakeDirection();
    var foodID = model.getFoodIDs();
    view.renderFrame(snakeIDs, snakeHeadID, direction, foodID);
  }
}



$(document).ready( function() {
  controller.init();
})