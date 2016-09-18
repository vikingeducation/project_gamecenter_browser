"use strict"

var controller = {
	init: function () {
		view.init();
	},

	readSnake: function () {
		return model.getSnake();
	},

	moveSanke: function () {
		setInterval(function () {
			controller.oneMove();
		}, 100);
	},

	oneMove: function () {
		model.snakeAddNewHead();
		var tail = model.snakeTailDelete();
		var snake = this.readSnake();
		view.draw(snake);
		view.snakeCellPaint(tail, "white", "white");
		// console.log(snake);
	},
};

$(document).ready(function () {
	controller.init();
});
