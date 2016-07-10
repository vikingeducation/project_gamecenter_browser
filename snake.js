'use_strict;'

var controller = {

	init: function(){
  		model.init();
  		view.init();

  		gameOverInterval = 0;

	  	myInterval = setInterval(function(){ 
  		// I need to know where the head is...
  		if (model.nextMoveIsPossible()) {
  			// Gotta move head to the next square
  			// Gotta update the variable that holds the position of the head
  			// Gotta go through the grid and gotta increase the number of all numbers in the grid but get rid of the last number. 
  			var rowOfHead = model.positionOfHead[0];
  			var columnOfHead = model.positionOfHead[1];
  			switch(model.nextMove) {
  				// left
	    		case 37:
	    			model.grid[rowOfHead][columnOfHead - 1] = 0;
	    			model.positionOfHead = [rowOfHead, columnOfHead - 1];
	        		break;
	        	// up
	    		case 38:
	    			model.grid[rowOfHead - 1][columnOfHead] = 0;
	    			model.positionOfHead = [rowOfHead - 1, columnOfHead];
	        		break;
	        	// right
	    		case 39:
	    			model.grid[rowOfHead][columnOfHead + 1] = 0;
					model.positionOfHead = [rowOfHead, columnOfHead + 1];
	        		break;
	        	// down
	        	case 40:
	        		model.grid[rowOfHead + 1][columnOfHead] = 0;
	        		model.positionOfHead = [rowOfHead + 1, columnOfHead];
	        		break;
			};
			model.eatMouse();
			model.moveSnakeOnGrid();
			view.updateGrid();
			model.previousMove = model.nextMove;
  		} else {
  			// Stop this interval but start up another interval for the game over sign...
  			clearInterval(myInterval);
  			controller.updateHighScores();
  			gameOverInterval = setInterval(function(){
			if ($("#game-over").length > 0) {
				$("#game-over").remove();
			} else {
				$(".game-container").first().append("<div id='game-over'><h2>Game Over</h2></div>")
			};
		}, 1000);
  		};
  		}, 600)
  	},

  	updateHighScores: function(){
  		model.highScores.push(model.lengthOfSnake - 1);
  		model.highScores.sort();
  		model.highScores.shift();
  		$("#list-one").text(model.highScores[2]);
  		$("#list-two").text(model.highScores[1]);
  		$("#list-two").text(model.highScores[0]);
  	}

  	//gameOverInterval: setInterval(function(){
  	//	console.log("Game Over");
  	//}, 1000)

};

var model = {

  init: function(){
  	// Setting up the grid
  	// 0 - head
  	// 1 onwards - body
  	// 'm' - mouse
  	// Could just leave everything else as undefined...
  	model.grid = [[undefined, undefined, undefined, undefined, undefined, undefined],
  				  [undefined, undefined, undefined, undefined, undefined, undefined],
  				  [undefined, undefined, undefined, undefined, undefined, undefined],
  				  [undefined, undefined, undefined, undefined, undefined, undefined],
  				  [undefined, undefined, undefined, undefined, undefined, undefined],
  				  [undefined, undefined, undefined, undefined, undefined, undefined]];
  	model.lengthOfSnake = 1;
  	model.positionOfHead = [1, 0];
  	model.placeMouseOnEmptySquare();

  	// Keys
  	// 39 - Right
  	// 38 - Up
  	// 37 - Left
  	// 40 - Down
  	model.nextMove = 39;
  	model.previousMove = 39;
  },

  highScores: [0, 0, 0],

  eatMouse: function(){
  	if (model.positionOfHead[0] === model.positionOfMouse[0] && model.positionOfHead[1] === model.positionOfMouse[1]) {
  		model.placeMouseOnEmptySquare();
  		model.lengthOfSnake++;
  		$("#current-score").text(model.lengthOfSnake - 1)
  	};
  },

  moveSnakeOnGrid: function(){
  	for (var rowNumber = 0; rowNumber < model.grid.length; rowNumber++) {
  		for (var columnNumber = 0; columnNumber < model.grid[rowNumber].length; columnNumber++) {
  			if ( !isNaN(model.grid[rowNumber][columnNumber]) ) {
  				model.grid[rowNumber][columnNumber]++;
  				model.grid[model.positionOfHead[0]][model.positionOfHead[1]] = 0;
  				if ( model.grid[rowNumber][columnNumber] === model.lengthOfSnake ){
  					model.grid[rowNumber][columnNumber] = undefined;
  				};
  			};
  		};
  	};
  },

  placeMouseOnEmptySquare: function(){
  	model.positionOfMouse = [model.randomNumber(), model.randomNumber()];
  	while ( !model.squareIsEmpty(model.positionOfMouse[0], model.positionOfMouse[1]) ) {
  		model.positionOfMouse = [model.randomNumber(), model.randomNumber()];
  	};
  	model.grid[model.positionOfMouse[0]][model.positionOfMouse[1]] = "m";
  },

  randomNumber: function(){
  	return Number( (Math.random() * 5).toFixed(0) )
  },

  squareIsEmpty: function( rowNumber, columnNumber ){
  	if (model.grid[rowNumber][columnNumber] === undefined) {
  		return true;
  	} else {
  		return false;
  	};
  },

  // This is here to figure out whether a snake can go a certain direction.
  // So that if a snake is going right, it can't double back and start going immediately left.
  nextDirectionIsPossible: function( key ){
  	switch(key) {
  		// Left
  		case 37:
  			if (model.previousMove !== 39) {
  				return true;
  			};
  			break;
  		// Up
  		case 38:
  			if (model.previousMove !== 40) {
  				return true;
  			};
  			break;
  		// Right
  		case 39:
  			if (model.previousMove !== 37) {
  				return true;
  			};
  			break;
  		// Down
  		case 40:
  			if (model.previousMove !== 38) {
  				return true;
  			};
  			break;
  	};
  },

  nextMoveIsWithinBoundaries: function(){
  	switch(model.nextMove) {
  		// Left
  		case 37:
  			if (model.positionOfHead[1] - 1 >= 0) {
  				return true
  			} else {
  				return false
  			};
  			break;
  		// Up
  		case 38:
  			if (model.positionOfHead[0] - 1 >= 0) {
  				return true
  			} else {
  				return false
  			};
  			break;
  		// Right
  		case 39:
  			if (model.positionOfHead[1] + 1 <= 5) {
  				return true
  			} else {
  				return false
  			};
  			break;
  		// Down
  		case 40:
  			if (model.positionOfHead[0] + 1 <= 5) {
  				return true
  			} else {
  				return false
  			};
  			break;
  	};
  },

  // So just gotta make sure that the space we're going into is within the boundaries
  // And also that the space we're going into is undefined
  nextMoveIsPossible: function(){
  	var headRow = model.positionOfHead[0];
  	var headColumn = model.positionOfHead[1];
  	if ( model.nextMoveIsWithinBoundaries() ) {
  		switch(model.nextMove) {
	  		// Left
	  		case 37:
	  			if (model.grid[headRow][headColumn - 1] === "m" || model.squareIsEmpty(headRow, headColumn - 1) || model.grid[headRow][headColumn - 1] === model.lengthOfSnake - 1) {
  					return true
  				} else {
  					return false
  				};
  	  			break;
	  		// Up
	  		case 38:
	  			if (model.grid[headRow - 1][headColumn] === "m" || model.squareIsEmpty(headRow - 1, headColumn) || model.grid[headRow - 1][headColumn] === model.lengthOfSnake - 1) {
  					return true
  				} else {
  					return false
  				};
	  			break;
	  		// Right
	  		case 39:
	  			if (model.grid[headRow][headColumn + 1] === "m" || model.squareIsEmpty(headRow, headColumn + 1) || model.grid[headRow][headColumn + 1] === model.lengthOfSnake - 1) {
  					return true
  				} else {
  					return false
  				};
	  			break;
	  		// Down
	  		case 40:
	  			if (model.grid[headRow + 1][headColumn] === "m" || model.squareIsEmpty(headRow + 1, headColumn) || model.grid[headRow + 1][headColumn] === model.lengthOfSnake - 1) {
  					return true
  				} else {
  					return false
  				};
	  			break;
	  	};
  	} else {
  		return false;
  	};
  },

  directionOfNextBodyPart: function(rowNumber, columnNumber){
  	var value = model.grid[rowNumber][columnNumber]
	  	if (rowNumber > 0 && model.grid[rowNumber - 1][columnNumber] === value - 1) {
	  		return "up"
	  	} else if (rowNumber < 5 && model.grid[rowNumber + 1][columnNumber] === value - 1) {
	  		return "down"
	  	} else if (columnNumber > 0 && model.grid[rowNumber][columnNumber - 1] === value - 1) {
	  		return "left"
	  	} else {
	  		return "right"
	  	};
  },

  directionOfBodyPartBehindThisOne: function(rowNumber, columnNumber){
  	var value = model.grid[rowNumber][columnNumber]
	  	if (rowNumber > 0 && model.grid[rowNumber - 1][columnNumber] === value + 1) {
	  		return "up"
	  	} else if (rowNumber < 5 && model.grid[rowNumber + 1][columnNumber] === value + 1) {
	  		return "down"
	  	} else if (columnNumber > 0 && model.grid[rowNumber][columnNumber - 1] === value + 1) {
	  		return "left"
	  	} else {
	  		return "right"
	  	};
  }

};

var view = {

  init: function(){

  	// So we're going to record the next move via key press if it's right keys
  	// and the direction isn't opposite of where the snake is going now.
  	$(window).keydown(function(event){
  		if (( event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40 ) && model.nextDirectionIsPossible(event.keyCode) ) {
  			model.nextMove = event.keyCode;
  		}
  	});

  	$("#new-game").click(function(event){
  		if (myInterval) {
  			clearInterval(myInterval);
  		};

  		if (gameOverInterval) {
  			clearInterval(gameOverInterval);
  		};
  		controller.init();
  	});
  },

  // Adding and removing classes depending on model.grid
  updateGrid: function(){
  	for (var rowNumber = 0; rowNumber < model.grid.length; rowNumber++) {
  		for (var columnNumber = 0; columnNumber < model.grid[rowNumber].length; columnNumber++) {
  			switch(model.grid[rowNumber][columnNumber]) {
  				case 0:
  					var $head = $(".game-square").eq([rowNumber * 6 + columnNumber]);
  					$head.attr("class","game-square").addClass("head");
  					view.styleSnake($head, "head");
  					break;
  				case "m": 
  					$(".game-square").eq([rowNumber * 6 + columnNumber]).attr("class","game-square").addClass("mouse");
  					break;
  				case undefined:
  					$(".game-square").eq([rowNumber * 6 + columnNumber]).attr("class","game-square");
  					break;
  				default:
  					var $body = $(".game-square").eq([rowNumber * 6 + columnNumber]);
  					$body.attr("class","game-square").addClass("body");
  					view.styleSnake($body, "body", rowNumber, columnNumber, model.grid[rowNumber][columnNumber]);
  			};

  			if(model.lengthOfSnake >= 2 && model.grid[rowNumber][columnNumber] === model.lengthOfSnake - 1){
  				var $tail = $(".game-square").eq([rowNumber * 6 + columnNumber]);
  				$tail.attr("class","game-square").addClass("tail");
  				view.styleSnake($tail, "tail", rowNumber, columnNumber, model.grid[rowNumber][columnNumber]);
  			};
  		};
  	};
  },

  removeBorderForBodyPartAhead: function($square, rowNumber, columnNumber){
  	if (model.directionOfNextBodyPart(rowNumber, columnNumber) === "up") {
		$square.addClass("body-up");
	} else if (model.directionOfNextBodyPart(rowNumber, columnNumber) === "down") {
		$square.addClass("body-down");
	} else if (model.directionOfNextBodyPart(rowNumber, columnNumber) === "left") {
		$square.addClass("body-left");
	} else {
		$square.addClass("body-right");
	};
  },

  removeBorderForBodyPartBehind: function($square, rowNumber, columnNumber){
  	if (model.directionOfBodyPartBehindThisOne(rowNumber, columnNumber) === "up") {
		$square.addClass("body-up");
	} else if (model.directionOfBodyPartBehindThisOne(rowNumber, columnNumber) === "down") {
		$square.addClass("body-down");
	} else if (model.directionOfBodyPartBehindThisOne(rowNumber, columnNumber) === "left") {
		$square.addClass("body-left");
	} else {
		$square.addClass("body-right");
	};
  },

  styleSnake: function($square, type, rowNumber, columnNumber, value) {
  	if (type === "head") {
  		// Left
  		if (model.nextMove === 37) {
  			$square.addClass("head-left");
  		// Top
  		} else if (model.nextMove === 38) {
  			$square.addClass("head-up");
  		// Right
  		} else if (model.nextMove === 39) {
  			$square.addClass("head-right");
  		} else {
  		// Bottom
  			$square.addClass("head-down");
  		};
  	} else if (type === "body") {
  		view.removeBorderForBodyPartAhead($square, rowNumber, columnNumber);
  		view.removeBorderForBodyPartBehind($square, rowNumber, columnNumber);
  	} else {
  		if (model.directionOfNextBodyPart(rowNumber, columnNumber) === "up") {
  			$square.addClass("tail-up");
  		} else if (model.directionOfNextBodyPart(rowNumber, columnNumber) === "down") {
  			$square.addClass("tail-down");
  		} else if (model.directionOfNextBodyPart(rowNumber, columnNumber) === "left") {
  			$square.addClass("tail-left");
  		} else {
  			$square.addClass("tail-right");
  		};
  	};
  }

};

$(document).ready(function(){
  controller.init();
});