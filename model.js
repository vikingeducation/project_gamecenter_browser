"use strict"

var model = {
	score: 0,

	direction: {
		x: 1,
		y: 0
	},

	snake: [{
		x: 0,
		y: 0
	}, {
		x: 1,
		y: 0
	}, {
		x: 2,
		y: 0
	}, {
		x: 3,
		y: 0
	}, {
		x: 4,
		y: 0
	}, {
		x: 5,
		y: 0
	}],

	food: {
		x: 100,
		y: 100
	},

	randomFood: function () {
		var xValue = Math.floor(Math.random() * 49) + 1;
		var yValue = Math.floor(Math.random() * 49) + 1;
		return {
			x: xValue,
			y: yValue
		};
	},

	foodOnSnake: function (food) {
		for (var i = 0; i < this.snake.length; i++) {
			if (this.snake[i].x === food.x && this.snake[i].y === food.y) {
				return true;
			};
		};
		return false;
	},

	generateFood: function () {
		var food = this.randomFood();
		while (this.foodOnSnake(food)) {
			food = this.randomFood();
		};
		this.food.x = food.x;
		this.food.y = food.y;
	},

	getFood: function () {
		return this.food;
	},

	incrementScore: function () {
		this.score += 1;
	},

	getScore: function () {
		return this.score;
	},

	getSnake: function () {
		return this.snake;
	},

	lastSnakeCell: function () {
		return this.snake[this.snake.length - 1];
	},

	newSnakeHead: function () {
		var last = this.lastSnakeCell();
		var newHead = {
			x: last.x + this.direction.x,
			y: last.y + this.direction.y
		};
		return newHead;
	},

	snakeAddNewHead: function () {
		var newHead = this.newSnakeHead();
		this.snake.push(newHead);
	},

	snakeTailDelete: function () {
		return this.snake.shift();
	},

	changeDirection: function (key) {
		var x = this.direction.x;
		var y = this.direction.y;
		if (key === 37 && x !== 1) {
			this.direction.x = -1;
			this.direction.y = 0;
		} else if (key === 38 && y !== 1) {
			this.direction.x = 0;
			this.direction.y = -1;
		} else if (key === 39 && x !== -1) {
			this.direction.x = 1;
			this.direction.y = 0;
		} else if (key === 40 && y !== -1) {
			this.direction.x = 0;
			this.direction.y = 1;
		};
	},

	snakeGrow: function () {
		this.snake.push(this.newSnakeHead());
	},

	outBoundary: function () {
		for (var i = 0; i < this.snake.length; i++) {
			var x = this.snake[i].x;
			var y = this.snake[i].y;
			if (x > 49 || x < 0 || y > 49 || y < 0) {
				return true;
			};
		};
		return false;
	},

	deepEqual(objectA, objectB) {
		if (objectA.x === objectB.x && objectA.y === objectB.y) {
			return true;
		} else {
			return false;
		};
	},

	touchSelf: function () {
		for (var i = 0; i < this.snake.length - 1; i++) {
			if (this.deepEqual(this.snake[i], this.lastSnakeCell())) {
				return true;
			};
		};
		return false;
	},

}
