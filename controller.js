"use strict"

var controller = {
	init: function () {
		view.init();
	},

	readSnake: function () {
		return model.getSnake();
	},

	moveSnake: function () {
		var myInterval = setInterval(function () {
			controller.oneMove();
			if (controller.userLoss()) {
				clearInterval(myInterval);
			}
		}, 100);
	},

	oneMove: function () {
		model.snakeAddNewHead();
		var tail = model.snakeTailDelete();
		var snake = this.readSnake();
		view.draw(snake);
		view.snakeCellPaint(tail, "white", "white");
		this.checkIfEatFood();
	},

	userLoss: function () {
		if (model.outBoundary() || model.touchSelf()) {
			view.showGameOver();
			return true;
		} else {
			return false;
		};
	},

	checkIfEatFood: function () {
		var food = model.getFood();
		if (model.foodOnSnake(food)) {
			this.placeFood();
			model.snakeGrow();
			this.updateScore();
		};
	},

	updateScore: function () {
		model.incrementScore();
		var score = model.getScore();
		view.showScore(score);
	},

	pressKeyLisener: function () {
		$(document).keydown(function (e) {
			model.changeDirection(e.keyCode);
		});
	},

	placeFood: function () {
		model.generateFood();
		var food = model.getFood();
		view.snakeCellPaint(food, "red", "white");
	},
};

$(document).ready(function () {
	controller.init();
});
