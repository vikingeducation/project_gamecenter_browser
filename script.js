'use strict;'


var model = {

  init: function(gridSize) {
    model.gridSize = gridSize;
    model.units = model.buildGrid(gridSize);
    model.snake.spawn();
    model.food.spawn();
  },


  gridSize: 0,
  score: 0,
  gameover: false,

  units: [],


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

        // don't pop if it ate!
        if (newUnit.food) {
          model.food.eaten()
        }
        else {
          model.snake.units.pop().snake = false;
        };

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
      tailUnit = model.snake.units[model.snake.units.length - 1];
      if (newUnit === tailUnit) {
        return false;
      }
      else {
        return !!newUnit.snake;
      };
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
    },


    eaten: function() {
      model.score += 1;
      model.food.unit[0].food = false;
      model.food.spawn();
    }
  },


  buildGrid: function() {
    var output = [];
    for(var i = 0; i < Math.pow(model.gridSize, 2); i++) {
      var newUnit = new model.unitConstructor(i);
      output.push(newUnit);
    }
    return output;
  },


  unitConstructor: function(i) {
    this.id = i;
    this.x = i % model.gridSize;
    this.y = Math.floor(i / model.gridSize);
    this.snake = false;
    this.food = false;
  },


  findUnitByCoordinates: function(x, y) {
    var i = y*(model.gridSize) + x;
    return model.units[i];
  },


  outOfBounds: function(coordinate) {
    if (coordinate < 0 || coordinate >= model.gridSize) {
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
  },

}



var view = {

  init: function(gridSize) {
    view.buildGrid(gridSize);
    controller.show();
    $(window).on('keydown', model.snake.newDirection) },


  buildGrid: function(size) {
    // set .board max width dynamically?
    for(var i = 0; i < Math.pow(size, 2); i++) {
      $('.board').append("<div class='unit'></div>")
    }
  },


 renderFrame: function(snakeIDs, snakeHeadID, direction, foodID, score, gameover) {
    view.resetFrame();
    view.renderScore(score)
    $.each( snakeIDs, function(i,id) { view.drawSnake(id) } );
    view.drawSnakeHead(snakeHeadID, direction, gameover);
    view.drawFood(foodID);
  },


  renderScore: function(score) {
    $('.scoreboard em')[0].innerHTML = score;
  },


  renderEndgame: function() {
    $('.board').after("<h3 class='gameover'>Game Over!</h3>");
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


  drawSnakeHead: function(i, direction, gameover) {
    if (gameover) {
      $('.board').children().eq(i).addClass('dead ' + direction);
    }
    else {
      $('.board').children().eq(i).addClass('head ' + direction);
    }
  },

}



var controller = {

  init: function(size, speed) {
    controller.size = size;
    controller.speed = speed;
    model.init(size);
    view.init(size);
    controller.play();
  },

  size: 0,
  speed: 0,
  gameInterval: null,


  show: function() {
    var snakeIDs = model.getSnakeIDs();
    var snakeHeadID = snakeIDs[0];
    var direction = model.getSnakeDirection();
    var foodID = model.getFoodIDs();
    var score = model.score;
    var gameover = model.gameover;
    view.renderFrame(snakeIDs, snakeHeadID, direction, foodID, score, gameover);
  },


  play: function() {
    controller.gameInterval = setInterval(controller.gameloop, controller.speed);
  },


  gameloop: function() {
    model.nextFrame();
    controller.show();

    if (model.gameover) {
      controller.endGame();
    };
  },


  endGame: function() {
    clearInterval(controller.gameInterval);
    view.renderEndgame();
  }
}




$(document).ready( function() {
  controller.init(20, 100);
})