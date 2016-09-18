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

	incrementScore: function () {
		this.score += 1;
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
	}
}
