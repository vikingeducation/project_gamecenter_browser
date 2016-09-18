"use strict"

var view = {

	init: function () {
		this.drawSnakes();
		this.startGame();
	},

	startGame: function () {
		$('#start').click(function (event) {
			var $target = $(event.target);
			$target.hide();
			controller.placeFood();
			controller.moveSnake();
			controller.pressKeyLisener();
		});
	},

	drawSnakes: function () {
		var snake = controller.readSnake();
		this.draw(snake);
	},

	draw: function (snake) {
		snake.forEach(function (el) {
			view.snakeCellPaint(el, "grey", "white")
		});
	},

	snakeCellPaint: function (cell, fillColor, strokeColor) {
		var canvas = document.getElementById('gameboard');
		var ctx = canvas.getContext('2d');
		var size = 10;
		var x = cell.x;
		var y = cell.y;
		// fill in cell color
		ctx.fillStyle = fillColor;
		ctx.fillRect(x * size, y * size, size, size);
		// draw the cell border
		ctx.strokeStyle = strokeColor;
		ctx.strokeRect(x * size, y * size, size, size);
	},
}
