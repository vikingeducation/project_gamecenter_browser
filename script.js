'use strict;'


var model = {
  init: function(gridSize) {
    model.units = model.buildGrid(gridSize);
    model.snake.spawn();
    model.food.spawn();
  },

  gameover: false,

  // All units in grid [id,x,y,snake?,food?]
  units: [],
  // array of coords, first in array is head
  // move snake by looking at head and direction, figure out new coords, shift new coords onto snake array, pop tail coords off(unless food is eaten)

  snake: {
    units: [],
    direction: 'right',
    directionNext: 'right',

    spawn:function() {
      var startingUnit = model.findUnitByCoordinates(3,4);
      model.snake.units = [startingUnit];
      startingUnit.snake = true;
    },


    move: function() {
      model.snake.direction = model.snake.directionNext;
      var newX = model.snake.units[0].x + model.snake.movementX();
      var newY = model.snake.units[0].y + model.snake.movementY();
      var newUnit = model.findUnitByCoordinates(newX, newY);

      model.gameover = (model.snake.flagWallCollision(newX, newY) || model.snake.flagSnakeCollision(newUnit))

      if (!model.gameover) {
        model.snake.units.unshift(newUnit);
        model.snake.units[0].snake = true;

        model.snake.units.pop().snake = false;

        return newUnit;
      };
    },


    movementX: function() {
      if (model.snake.direction === 'right') {
        return 1
      }
      else if (model.snake.direction === 'left') {
        return -1
      }
      else {
        return 0
      };
    },

    movementY: function() {
      if (model.snake.direction === 'down') {
        return 1
      }
      else if (model.snake.direction === 'up') {
        return -1
      }
      else {
        return 0
      };
    },

    newDirection: function() {
      model.snake.directionNext = model.snake.filterInput(event.which);
    },

    filterInput: function(input) {
      // if current is left/right, should only accept up/down
      if (model.snake.direction === 'left' || model.snake.direction === 'right') {
        switch (input) {
          case 38:
            return 'up';
            break;
          case 40:
            return 'down';
            break;
          default:
            return model.snake.directionNext;
        };
      }
      // if current is up/down, should only accept left/right
      else {
        switch (input) {
          case 37:
            return 'left';
            break;
          case 39:
            return 'right';
            break;
          default:
            return model.snake.directionNext;
        };
      };
    },


    flagWallCollision: function(newX, newY) {
      return (model.outOfBounds(newX) || model.outOfBounds(newY));
    },


    flagSnakeCollision: function(newUnit) {
      // currently won't detect if it's the tail piece and a valid move
      return !!newUnit.snake;
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

  outOfBounds: function(coordinate) {
    if (coordinate < 0 || coordinate >= Math.pow(model.units.length, 0.5)) {
      return true
    };
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
  },

  nextFrame: function() {
    var newUnit = model.snake.move();

    // check snake collision
    // check food collision
  },



}



var view = {
  init: function(gridSize) {
    view.buildGrid(gridSize);
    controller.show();
    $(window).on('keydown', model.snake.newDirection) },

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

  renderEndgame: function(snakeIDs, snakeHeadID, foodID) {
    view.resetFrame();
    $.each( snakeIDs, function(i,id) { view.drawSnake(id) } );
    view.drawDeadSnake(snakeHeadID);
    view.drawFood(foodID);
    $('.board').after("<h3>Game Over!</h3>");
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
  },

  drawDeadSnake: function(i) {
    $('.board').children().eq(i).addClass('dead');
  }



}



var controller = {
  init: function() {
    model.init(10);
    view.init(10);
    //start the loop
    controller.play();
  },

  gameInterval: null,

  show: function() {
    var snakeIDs = model.getSnakeIDs();
    var snakeHeadID = snakeIDs[0];
    var direction = model.getSnakeDirection();
    var foodID = model.getFoodIDs();
    view.renderFrame(snakeIDs, snakeHeadID, direction, foodID);
  },

  play: function() {
    // every 2 seconds
    controller.gameInterval = setInterval(controller.gameloop, 1000);
  },

  gameloop: function() {
    // update model
    model.nextFrame();
    // check for loss
    // check for food gain

    if (model.gameover) {
      controller.endGame();
    }
    else {
      controller.show();
    };
  },

  endGame: function() {
    clearInterval(controller.gameInterval);
    var snakeIDs = model.getSnakeIDs();
    var snakeHeadID = snakeIDs[0];
    var foodID = model.getFoodIDs();
    view.renderEndgame(snakeIDs, snakeHeadID, foodID);
  }
}



$(document).ready( function() {
  controller.init();
})