// Don't want to pullute the global namespace w. constants
// so I'll add them to an object
var constants = {
	grid_size: 12, 
	snake_move_delay: 400
}

var model = {
	// init()
		// set user score
		// set snake size
		// set snake initial location
		// set food initial location
	init: function(){
		this.snake_size = 1;
		this.user_score = 0;
		this.last_move = "left";
		this.snake_coords = [model.gen_random_snake_coords()];
		this.food_coords = model.gen_random_food_coords();
	},

	// Generate a random snake location
	// (used primarily when initializing the board)
	gen_random_snake_coords: function(){
		var x = model.gen_random_number();
		var y = model.gen_random_number();
		return {x: x, y: y};
	},

	// Generate a random food location
	// ensure the coord is not in snake_coords
	gen_random_food_coords: function(){
		var x = model.gen_random_number();
		var y = model.gen_random_number();
		return {x: x, y: y};
	}, 

	// Help us generate random coordinates
	gen_random_number: function(){
		return Math.floor((Math.random() * constants.grid_size));
	}, 

	incScore: function(amount){
		model.user_score += amount;
	}, 

	incSpeed: function(){
		if(constants.snake_move_delay >= 150){
			constants.snake_move_delay -= 25;
			clearInterval(constants.game_interval);
			constants.game_interval = window.setInterval(function(){
		  	controller.moveSnake();
			}, constants.snake_move_delay);
		}
	}
}

var view = {
	// init()
		// build grid
	
	init: function(){
		// Buffer will be the actual HTML output which 
		// will eventually get passed to the browser.
		var buffer = '';	
		
		// Rows- this needs to count DOWN in order 
		// for the coordinates to render properly.
		for(var i=constants.grid_size-1;i>=0;i--){
			buffer += '<tr>';
			// Cells
			for(var j=0;j<constants.grid_size;j++){
				buffer += '<td class="snake-cell" x="'+j+'" y="'+i+'"></td>';
			}
			buffer += '</tr>';
		}

		// Pass the buffer HTML to the browser
		$('#snake-grid').html(buffer);
		
		view.renderSnake();
		view.renderFood();
		
		// Setup our event listeners
		view.config();
	},

	// Set arrow listeners and push movement
	// to the controller stack
	config: function(){
		$(document).keydown(function(event){
			switch(event.which){
				case 37:
					controller.stack.push("left");
					break;
				case 38:
					controller.stack.push("up");
					break;
				case 39:
					controller.stack.push("right");
					break;
				case 40:
					controller.stack.push("down");
					break;
			}
			console.log(controller.stack);
		});
	},

	renderScore: function(){
		$('#user-score').html("Score: " + model.user_score);
	},

	renderSnake: function(){
		$('.snake-head').removeClass('snake-head');
		// Set the snake head
		$('td[x="'+model.snake_coords[0].x+'"][y="'+model.snake_coords[0].y+'"]').addClass('snake-head');
		// set the snake body
		$('.snake-body').removeClass('snake-body');
		model.snake_coords.slice(1).forEach(function(el){
			$('td[x="'+el.x+'"][y="'+el.y+'"]').addClass('snake-body');
		});
	}, 

	renderFood: function(){
		// Clear any old food
		$('.food').removeClass('food');
		// Set the food
		$('td[x="'+model.food_coords.x+'"][y="'+model.food_coords.y+'"]').addClass('food');
	}
}

var controller = {
	// init()
		// Setup move stack
		// Logic to wait for user's first move
	init: function(){
		this.stack = new Array;
		this.victory = false;
		this.loss = false;
		model.init();
		view.init();
		controller.runSnake();
	}, 

	runSnake: function(){
		constants.game_interval = window.setInterval(function(){
	  	controller.moveSnake();
		}, constants.snake_move_delay);
	}, 

	moveSnake: function(){
		var x, y, coords;
		// If the user doesn't input a move just use the previous move
		if(controller.stack.length === 0){controller.stack.push(model.last_move);}
		switch(controller.stack.pop()){
			case "left":
				x = model.snake_coords[0].x -1;
				y = model.snake_coords[0].y;
				model.last_move = "left";
				coords = {x: x, y: y};
				break;
			case "up":
				x = model.snake_coords[0].x;
				y = model.snake_coords[0].y +1;
				model.last_move = "up";
				coords = {x: x, y: y};
				break;
			case "right":
				x = model.snake_coords[0].x +1;
				y = model.snake_coords[0].y;
				model.last_move = "right";
				coords = {x: x, y: y};
				break;
			case "down":
				x = model.snake_coords[0].x;
				y = model.snake_coords[0].y -1;
				model.last_move = "down";
				coords = {x: x, y: y};
				break;
		}
		// Reset the stack
		controller.stack = new Array;
		model.snake_coords.unshift(coords);
		// Ensure the snake is within bounds
		controller.withinBounds();
		// Ensure the snake hasn't hit itself
		controller.hitItself();
		// Check if snake got food. Then render the 
		// resulting snake
		controller.eatFood();
	},

	withinBounds: function(){
		if(model.snake_coords[0].x >= constants.grid_size || model.snake_coords[0].x < 0 || model.snake_coords[0].y >= constants.grid_size || model.snake_coords[0].y < 0){
			controller.loss = true;
			clearInterval(constants.game_interval);
			alert("YOU LOSE!");
		}
	},

	hitItself: function(){
		model.snake_coords.slice(1).forEach(function(el){
			if(JSON.stringify(el) === JSON.stringify(model.snake_coords[0])){
				controller.loss = true;
				clearInterval(constants.game_interval);
				alert("DOH! You Hit Yourself :(");
			}
		});
	},

	eatFood: function(){
		if(JSON.stringify(model.food_coords) === JSON.stringify(model.snake_coords[0])){
			model.incScore(30);
			view.renderScore();
			model.food_coords = model.gen_random_food_coords();
			// TODO: This is a pretty inefficient way of checking where
			// the food is. I think it's still possible for food to land
			// on the snake, it would just have to have bad luck twice.
			controller.foodOnSnake();
			view.renderFood();
			view.renderSnake();
			model.incSpeed();
		} else {
			model.snake_coords.pop();
			view.renderSnake();
		}
	}, 

	foodOnSnake: function(){
		// Return true if the food coord is
		// already part of the snake_coords.
		model.snake_coords.forEach(function(snake_coord){
			if(model.food_coords.x == snake_coord.x && model.food_coords.y == snake_coord.y){
				model.food_coords = model.gen_random_food_coords();
			}
		});
	}

	// Snake head gets food

	// Snake hits boundary

}

$( document ).ready(function(){
	// Start things offs
	controller.init();
});