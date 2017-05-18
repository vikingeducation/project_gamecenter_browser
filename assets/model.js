"use strict";

var model = {

  keyCodes: {
    38: 'up',
    37: 'left',
    40: 'down',
    39: 'right'
  },
  padding: 20,

  init: function(args) {
    this.grid = args.grid || {
      width: 50,
      height: 50
    }
    this.newHead;
    this.food = {};
    this.score = 0;
    this.setStartDirection();
    this.hatchSnake();
    this.createFood();
  },

  getSnake: function() {
    return this.snake;
  },

  getFood: function() {
    return this.food;
  },

  getScore: function() {
    return this.score;
  },

  getGrid: function() {
    return this.grid;
  },

  foodEaten: function() {
    var food = this.food;
    var head = this.snake[0];
    return (food.x === head.x && food.y === head.y);
  },

  updateSettings: function() {
    this.score += 10;
    var division = this.grid.width * this.grid.height / 10;
  },

  attachNewHead: function() {
    this.snake.unshift(this.newHead);
  },

  moveSnake: function(callback) {
    this.createNewHead();
    this.updateDirection();
  },

  createNewHead: function() {
    var snake = this.getSnake();
    var head = snake[0];
    var newHead = {};
    switch (this.direction) {
      case 'up':
        newHead.x = head.x,
          newHead.y = head.y - 1;
        break;
      case 'left':
        newHead.x = head.x - 1,
          newHead.y = head.y
        break;
      case 'right':
        newHead.x = head.x + 1,
          newHead.y = head.y
        break;
      case 'down':
        newHead.x = head.x,
          newHead.y = head.y + 1
        break;
    }
    this.newHead = newHead;
  },

  isCollision: function() {
    var snake = this.snake;
    var head = this.newHead;
    if (head.x === this.grid.width || head.y < 0 || head.y === this.grid.height || head.x < 0) {
      return true;
    }
    for (var i = 0; i < this.snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    return false;
  },

  updateDirection: function(keycode) {
    if (this.newDirection) {
      switch (this.newDirection) {
        case 'up':
        case 'down':
          if (this.direction === 'left' || this.direction === 'right') {
            this.direction = this.newDirection;
          }
          break;
        case 'left':
        case 'right':
          if (this.direction === 'up' || this.direction === 'down') {
            this.direction = this.newDirection;
          }
      }
    }
  },

  createFood: function() {
    this.food = {};
    var food;
    var snake = this.snake;
    while ($.isEmptyObject(this.food)) {
      food = [Math.floor(Math.random() * this.grid.width), Math.floor(Math.random() * this.grid.height)];
      for (var i = 0; i < snake.length; i++) {
        if (snake[i].x !== food[0] && snake[i].y !== food[1]) {
          this.food.x = food[0]
          this.food.y = food[1];
          return;
        }
      }
    }
  },

  cutSnakeTail: function() {
    this.snake.pop();
  },

  setStartDirection: function() {
    var d = ['up', 'down', 'left', 'right'];
    this.direction = d[Math.floor(Math.random() * d.length)];
  },

  hatchSnake: function() {
    var start = [Math.floor(Math.random() * (this.grid.width - this.padding)) + this.padding / 2, Math.floor(Math.random() * (this.grid.height - this.padding)) + this.padding / 2];
    switch (this.direction) {
      case 'left':
        this.snake = [{
          x: start[0] - 2,
          y: start[1]
        }, {
          x: start[0] - 1,
          y: start[1]
        }, {
          x: start[0],
          y: start[1]
        }];
        break;
      case 'right':
        this.snake = [{
          x: start[0] + 2,
          y: start[1]
        }, {
          x: start[0] + 1,
          y: start[1]
        }, {
          x: start[0],
          y: start[1]
        }];
        break;
      case 'up':
        this.snake = [{
          x: start[0],
          y: start[1] - 2
        }, {
          x: start[0],
          y: start[1] - 1
        }, {
          x: start[0],
          y: start[1]
        }];
        break;
      case 'down':
        this.snake = [{
          x: start[0],
          y: start[1] + 2
        }, {
          x: start[0],
          y: start[1] + 1
        }, {
          x: start[0],
          y: start[1]
        }];
        break;
    }
  },

  setNewDirection: function(keycode) {
    this.newDirection = this.keyCodes[keycode];
  },
}