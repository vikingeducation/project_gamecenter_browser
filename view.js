var view = {
	setGrid: function(grid) {
		var grid = grid;

		for (var i = 0; i < grid.length; i++) {
			var row = grid[i];
			for (var j = 0; j < row.length; j++) {
				view.setTile(i, j);
			}
			view.setNewRow();
		}
	},

	getTile: function(x, y) {
		var $tile = $('.tile');
		for (var i = 0; i < $tile.length; i++) {
			var tile = $($tile[i]);
			if ( parseInt( tile.attr("row") ) === y && parseInt( tile.attr("col") ) === x ) {
				return tile;
			}
		}
	},

	setTile: function(row, column) {
		var tile = $('<div>')
				   .addClass("tile")
				   .attr("row", row)
				   .attr("col", column);
	    tile.appendTo($('.game'));
	},

	setNewRow: function() {
		var clearFix = $("<div>")
					   .addClass("clearfix");

	    clearFix.appendTo($('.game'));
	}
}

view.snake = {

	printSnake: function() {

		var tail = model.snake.tail;

		for (var i = 0; i < tail.length; i++) {
			var tailPiece = tail[i];
			var x = tailPiece.px;
			var y = tailPiece.py;
			var tailPiece = view.getTile(x, y);
			if (i === 0) {
				$(tailPiece).addClass("head");
			} else {
				$(tailPiece).addClass("tail");
			}
		}
	},

	removeOldSnake: function() {

		var tail = model.snake.tail;

		for (var i = 0; i < tail.length; i++) {
			var tailPiece = tail[i];
			var x = tailPiece.px;
			var y = tailPiece.py;
			var tailPiece = view.getTile(x, y);
			if (i === 0) {
				$(tailPiece).removeClass("head");
			} else {
				$(tailPiece).removeClass("tail");
			}
		}
	}
}

view.apple = {
	printApple: function() {
		var x = model.apple.px;
		var y = model.apple.py;
		var apple = view.getTile(x, y);
		$(apple).addClass("apple");
	},

	removeOldApple: function() {
		var x = model.apple.px;
		var y = model.apple.py;
		var apple = view.getTile(x, y);
		$(apple).removeClass("apple");
	}
}

view.score = {
	update: function() {
		$('.score').html(model.score.value);
	}
}