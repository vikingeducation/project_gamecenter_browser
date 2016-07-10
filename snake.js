'use_strict;'

var controller = {

	init: function(){
  		model.init();
  		view.init();

	  	// I think we should set up the interval timer here...
	  	// This really is the hub of everything cos every tick will have to set off a bunch of stuff.
	  	controller.myInterval;
  	},

  	myInterval: setInterval(function(){ 
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
  			clearInterval(controller.myInterval);
  			controller.updateHighScores();
  		};
  	}, 600),

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
  },

  // Adding and removing classes depending on model.grid
  updateGrid: function(){
  	for (var rowNumber = 0; rowNumber < model.grid.length; rowNumber++) {
  		for (var columnNumber = 0; columnNumber < model.grid[rowNumber].length; columnNumber++) {
  			switch(model.grid[rowNumber][columnNumber]) {
  				case 0: 
  					$(".game-square").eq([rowNumber * 6 + columnNumber]).addClass("head").removeClass("mouse body tail");
  					break;
  				case "m": 
  					$(".game-square").eq([rowNumber * 6 + columnNumber]).addClass("mouse").removeClass("head body tail");
  					break;
  				case undefined:
  					$(".game-square").eq([rowNumber * 6 + columnNumber]).removeClass("mouse head body tail");
  					break;
  				default: 
  					$(".game-square").eq([rowNumber * 6 + columnNumber]).addClass("body").removeClass("mouse head tail");
  			};

  			if(model.lengthOfSnake >= 2 && model.grid[rowNumber][columnNumber] === model.lengthOfSnake - 1){
  				$(".game-square").eq([rowNumber * 6 + columnNumber]).addClass("tail").removeClass("mouse head body");
  			};
  		};
  	};
  }

};

$(document).ready(function(){
  controller.init();
});