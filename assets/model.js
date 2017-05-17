"use strict";

var model = {
  snakeSize: 1,
  boardWidth: 40,
  boardHeight: 40,
  food: {},
  multiplier: 2,
  score: 0,
  padding: 10,

  reset: function() {
    this.snake = [];
    this.score = 0;
    this.food = {}
  },

  init: function(settings) {
    if (settings) {
      this.snakeSize = settings.snakeSize || 1;
      this.boardWidth = settings.boardWidth || 40;
      this.boardHeight = settings.boardHeight || 40;
    }
    this.getStartDirection();
    this.hatchSnake();
    this.createFood();
  },


  cutSnakeTail: function() {
    this.snake.pop();
  },

  getSnake: function() {
    return this.snake;
  },

  getFood: function() {
    return this.food;
  },

  moveSnake: function(callback) {
    console.log('model.moveSnake');
    var endGame = callback.endGame;
    model.updateGame = callback.updateGame;
    this.createNewHead();
    this.updateDirection();
    if (this.isCollision()) {
      endGame();
    } else {
      this.snake.unshift(this.newHead);
    }
    this.checkIfFoodEaten();
  },

  isCollision: function() {
    var snake = this.snake;
    var head = this.newHead;
    if (head[0] >= this.boardWidth || head[1] < 0 || head[1] >= this.boardHeight || head[0] < 0) {
      return true;
    }
    for (var i = 0; i < this.snake.length; i++) {
      if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
        return true;
      }
    }
    return false;
  },

  checkIfFoodEaten: function() {
    var food = this.food;
    var head = this.snake[0];
    if (food.x === head[0] && food.y === head[1]) {
      this.food = {};
      this.createFood();
      this.updateScore();
      this.updateGame();
    } else {
      this.cutSnakeTail();
    }
  },

  getScore: function() {
    return this.score;
  },

  updateScore: function() {
    this.score += 100;
  },

  createNewHead: function() {
    var snake = this.getSnake();
    var head = snake[0];
    var newHead;
    switch (this.direction) {
      case 'up':
        newHead = [head[0], head[1] - 1];
        break;
      case 'left':
        newHead = [head[0] - 1, head[1]];
        break;
      case 'right':
        newHead = [head[0] + 1, head[1]];
        break;
      case 'down':
        newHead = [head[0], head[1] + 1];
        break;
    }
    this.newHead = newHead;
  },

  getStartDirection: function() {
    var d = ['up', 'down', 'left', 'right'];
    this.direction = d[Math.floor(Math.random() * d.length)];
  },


  hatchSnake: function() {
    var start = [Math.floor(Math.random() * (this.boardWidth - this.padding)) + 2, Math.floor(Math.random() * (this.boardHeight - this.padding)) + 2];
    switch (this.direction) {
      case 'left':
        this.snake = [
          [start[0] - 2, start[1]],
          [start[0] - 1, start[1]],
          [start[0], start[1]],
        ];
        break;
      case 'right':
        this.snake = [
          [start[0] + 2, start[1]],
          [start[0] + 1, start[1]],
          [start[0], start[1]],
        ];
        break;
      case 'up':
        this.snake = [
          [start[0], start[1] - 2],
          [start[0], start[1] - 1],
          [start[0], start[1]],
        ];
        break;
      case 'down':
        this.snake = [
          [start[0], start[1] + 2],
          [start[0], start[1] + 1],
          [start[0], start[1]],
        ];
        break;
    }
  },

  createFood: function() {
    var food;
    var snake = this.snake;
    while ($.isEmptyObject(this.food)) {
      food = [Math.floor(Math.random() * this.boardWidth), Math.floor(Math.random() * this.boardHeight)];
      for (var i = 0; i < snake.length; i++) {
        if (snake[i][0] !== food[0] && snake[i][1] !== food[1]) {
          this.food.x = food[0]
          this.food.y = food[1];
          return;
        }
      }
    }
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

  setNewDirection: function(keycode) {
    switch (keycode) {
      case 38:
        this.newDirection = 'up';
        break;
      case 37:
        this.newDirection = 'left';
        break;
      case 40:
        this.newDirection = 'down';
        break;
      case 39:
        this.newDirection = 'right';
        break;
    }
  },



}