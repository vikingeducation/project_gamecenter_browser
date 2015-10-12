// Don't want to pullute the global namespace w. constants
// so I'll add them to an object
var constants = {
	grid_size: 6, 
	snake_move_delay: 200
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
		var temp_food_coord = {x: x, y: y};
		// Need to ensure that the food coord is not
		// already part of the snake_coords
		model.snake_coords.forEach(function(snake_coord){
			if(JSON.stringify(temp_food_coord) === JSON.stringify(snake_coord)){
				return model.gen_random_food_coords();
			}
		});
		return temp_food_coord;
	}, 

	// Help us generate random coordinates
	gen_random_number: function(){
		return Math.floor((Math.random() * constants.grid_size));
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

	// config
		// Set arrow listeners
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

	renderSnake: function(){
		$('.snake-head').removeClass('snake-head');
		// Set the snake head
		$('td[x="'+model.snake_coords[0].x+'"][y="'+model.snake_coords[0].y+'"]').addClass('snake-head');
	}, 

	renderFood: function(){
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
		model.snake_coords.pop();
		view.renderSnake();
		console.log(model.snake_coords);
	}

	// Move stack

	// Snake move function

	// Snake head gets food

	// Snake hits boundary

}

$( document ).ready(function(){
	// Start things offs
	controller.init();
});