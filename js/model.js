var model = {

  grid: [new Array(8),
         new Array(8),
         new Array(8),
         new Array(8),
         new Array(8),
         new Array(8),
         new Array(8),
         new Array(8) ],

  snakeHead: {},

  snakeBody: [],

  nextSnakeCoords: function(){
    var body = this.snakeBody.unshift();
    var head = [[this.snakeHead['row'], this.snakeHead['col']]];

    var final = body.concat(head);
    return final;
  },


  setUpBoard: function(){
    var snakeRow = 7;
    var snakeCol = 2;

    this.snakeHead['row'] = snakeRow;
    this.snakeHead['col'] = snakeCol;
    this.grid[4][4] = 2;
    this.grid[snakeRow][snakeCol] = 1;
  },

  moveSnake: function(event){
    this.moveSnakeHead(event);
    this.moveSnakeBody();
  },

  moveSnakeBody: function(){
    if(this.snakeBody.length > 0){
      //turn all snake body coords to 0
      var body = this.snakeBody();
      body.forEach(function(coords){
        model.removeSegment(coords[0], coords[1]);

      })

      var nextMoves = this.nextSnakeCoords();

      nextMoves.forEach(function(coords){
        model.addSegment(coords[0], coords[1], 8);
      })


    }
  },

  moveSnakeHead: function(event){
    var coords = [this.snakeHead['row'], this.snakeHead['col']];

    var row = coords[0];
    var col = coords[1];

    if(this.gameOver(row, col)) {
      controller.gameOver();
    } else {
    //get rid of previous snake tag
      this.removeSegment(row, col);
      if(event){
        var keyCode = event.which;
        // for if a keyCode is passed
        this.placeSegment(row, col, keyCode);
      } else {
        //up
        this.addSegment(row - 1, col, 1);
      }//END IF EVENT

      //will try to assign undefined property col idx of undefined row when off 
      //the board

    } //END ELSE IF NOT GAME OVER
  },//END MOVE SNAKE

  gameOver: function(row, col){
   if(this.rowValid(row) && this.colValid(col)){
    return false;
   } else {
    return true;
   }
  },

  validCoords: function(row, col){
    if(this.rowValid(row) && this.colValid(col)){
    return true;
   } else {
    return false;
   }
  },

  rowValid: function(row){
    return ((row >= 0) && (row <= 7))
  },

  colValid: function(col){
    return ((col >= 0) && (col <= 7))
  },

  placeSegment: function(row, col, keyCode){
    if(keyCode === 39){
      //right
      this.addSegment(row, col + 1, 1);
    } else if(keyCode === 40){
      //down
      
      //ROW IS SEVEN when down
      this.addSegment(row + 1, col, 1);
    } else if(keyCode === 37){
      //left
      this.addSegment(row, col - 1, 1);
    } else if(keyCode === 38){
      this.addSegment(row - 1, col, 1)
    }
    
  },

  removeSegment: function(row, col){
    this.grid[row][col] = 0;
    
  },

  addSegment: function(row, col, segValue){
    //THIS IS FOR THE SNAKE HEAD
    if(this.gameOver(row, col)){
      controller.gameOver();
    }
    
    this.manageEatFood(row, col);
    this.grid[row][col] = segValue;
    this.snakeHead['row'] = row;
    this.snakeHead['col'] = col;
  },

  growSnake: function(){
    if(this.snakeBody.length > 0){
      var row = this.snake[0][0];
      var col = this.snake[0][1];
    } else {
      var row = this.snakeHead['row'];
      var col = this.snakeHead['col'];
    }

    if(this.validCoords(row + 1, col)){
      this.addSnakeSegment(row - 1, col);
      
    } else if(this.validCoords(row, col + 1)){
      this.addSnakeSegment(row, col + 1);
      
    } else {
      this.addSnakeSegment(row, col - 1);
        
    }

  },

  addSnakeSegment: function(row, col){
    this.addSegment(row, col, 8);
    this.snakeBody.unshift([row, col]);
  },

  manageEatFood: function(row, col){
    console.log(row);
    console.log(col);
    if(this.grid[row][col] === 2) {
      this.eatFood(row, col);
    }
  },

  eatFood: function(row, col){
    console.log("EATING FOOD");
    controller.eatFood(row, col);
    this.placeFood();
    this.growSnake();
  },

  placeFood: function(){
    var row = Math.floor(Math.random() * 7);
    var col = Math.floor(Math.random() * 7);
    this.grid[row][col] = 2;
  },

  findHead: function(){
    var headRow = undefined;
    var headCol = undefined;

    for(var row = 0; row < 8; row++){
      if(this.grid[row].indexOf(1) !== -1){
        headRow = row;
        headCol = this.grid[row].indexOf(1);
      }
    }

    return [headRow, headCol];
  }

  

}