var model = {}

model.score = {
	value: 0,
	update: function() {
		model.score.value++;
	}
}

model.grid = {
	column: 13,
	row: 10,
	array: [],

	createGrid: function() {
		for (var i = 0; i < model.grid.row; i++) {
			var row = [];
			for (var j = 0; j < model.grid.column; j++) {
				row.push(j);
			}
			model.grid.array.push(row);
		}
	},

	getGrid: function() {
		return model.grid.array;
	}

}

model.snake = {
	tail: [],
	direction: "right",

	getDirection: function() {
		return model.snake.direction;
	},

	makeNextMove:function() {
		var direction = model.snake.getDirection();
		switch(direction) {
			case "right" :
				model.snake.tail[0].px++;
				break;
			case "left" :
				model.snake.tail[0].px--;
				break;
			case "down" :
				model.snake.tail[0].py++;
				break;
			case "up" :
				model.snake.tail[0].py--;
				break;
		}
	}
}

model.snake.head = function() {
	this.px = 0;
	this.py = 0;
}

model.tail = function() {
	this.px = 0;
	this.py = 0;
}

model.apple = {
	px: 0,
	py: 0,

	generateApple: function() {
		var arrayCoords = model.apple.generateAppleCoords();
		model.apple.px = arrayCoords[0];
		model.apple.py = arrayCoords[1];

	},

	generateAppleCoords: function() {
		var px ;
		var py;	

		do {

			px = Math.floor(Math.random() * (model.grid.column));
			py = Math.floor(Math.random() * (model.grid.row));	
		} while (px === model.snake.tail[0].px && py === model.snake.tail[0].py);
		return [px, py];
	}
}
