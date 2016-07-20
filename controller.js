var controller = {
	createNewTail: false,
	speed: 300,

	init: function() {
		model.grid.createGrid();
		view.setGrid(model.grid.getGrid());
		controller.initSnake();
		view.snake.printSnake();
		model.apple.generateApple();
		view.apple.printApple();
		controller.keyboardListener();
		controller.gameLoop(controller.speed);
	},

	gameLoop: function(speed) {
		gameLoop = setInterval(function() {
			controller.refreshGame();
		}, speed);
	},

	refreshGame: function() {
		controller.checkDeath();

		controller.checkAppleEat();

		var lastTailPosition = [];
		var x = model.snake.tail[model.snake.tail.length-1].px;
		var y = model.snake.tail[model.snake.tail.length-1].py;
		lastTailPosition.push(x);
		lastTailPosition.push(y);

		view.snake.removeOldSnake();
		controller.updateTail();
		model.snake.makeNextMove();


		if (controller.createNewTail === true) {

			controller.createTail(lastTailPosition);
			controller.createNewTail = false;
		}

		view.snake.printSnake();

	},

	keyboardListener: function() {
		$(document).on("keydown", function(event) {
			var keypress = event.which;
			var direction = model.snake.direction
			switch(keypress) {
				case 37 :
					if (direction === "right") {
						$('.game').addClass("wrong-move")
						setTimeout(function() { $('.game').removeClass("wrong-move") }, 0);
					} else {
						model.snake.direction = "left";
					}
					break;
				case 39 :
					if (direction === "left") {
						$('.game').addClass("wrong-move")
						setTimeout(function() { $('.game').removeClass("wrong-move") }, 0);
					} else {
						model.snake.direction = "right";
					}
					break;
				case 38 :
					if (direction === "down") {
						$('.game').addClass("wrong-move")
						setTimeout(function() { $('.game').removeClass("wrong-move") }, 0);
					} else {
						model.snake.direction = "up";
					}
					break;
				case 40 :
					if (direction === "up") {
						$('.game').addClass("wrong-move")
						setTimeout(function() { $('.game').removeClass("wrong-move") }, 0);
					} else {
						model.snake.direction = "down";
					}
					break;
			}
		})
	},

	initSnake: function() {
		var head = new model.snake.head();
		model.snake.tail.push( head );
	},

	checkDeath: function() {
		var x = model.snake.tail[0].px;
		var y = model.snake.tail[0].py;
		var limitX = model.grid.column;
		var limitY = model.grid.row;
		var checkBody = controller.checkBodyDeath();
		if (x < 0 || x >= limitX || y < 0 || y >= limitY || checkBody ) {
			clearInterval(gameLoop);
			$loose = $("<div>")
					 .addClass("loose")
					 .html("You Loose");

			$looseBox = $("<div>")
					    .addClass("loose-box")
					    .html($loose)

			$looseBox.appendTo($(".game"));
		}
	},

	checkBodyDeath: function() {
		var tail = model.snake.tail;
		var tailEaten = false;

		if (tail.length > 1) {

			var x = tail[0].px;
			var y = tail[0].py;

			for (var i = 1; i < tail.length; i++) {
				var tailPiece = tail[i];
				if (x === tailPiece.px && y === tailPiece.py ) {
					tailEaten = true;
					break;
				}
			}
		}
		return tailEaten;
	},

	checkAppleEat: function() {
		var snakeX = model.snake.tail[0].px;
		var snakeY = model.snake.tail[0].py;
		var appleX = model.apple.px;
		var appleY = model.apple.py;
		if (snakeX === appleX && snakeY === appleY) {
			controller.appleEaten();
			model.score.update();
			view.score.update();
		}
	},

	appleEaten: function() {
		view.apple.removeOldApple();
		model.apple.generateApple();
		controller.createNewTail = true;
		view.apple.printApple();
		if (controller.speed > 105) {
			controller.speed -= 15;
		}
		clearInterval(gameLoop);
		controller.gameLoop(controller.speed);


	},

	createTail: function(position) {
		var newTail = new model.tail();
		var tail = model.snake.tail;

		newTail.px = position[0];
		newTail.py = position[1];

		tail.push(newTail);
	},

	updateTail: function() {
		var tail = model.snake.tail;

		for (var i = tail.length-1; i > 0; i--) {
			var tailPiece = tail[i];
			tailPiece.px = tail[i-1].px;
			tailPiece.py = tail[i-1].py;
		}
	}
}