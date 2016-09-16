var model = {

  grid: [new Array(8),
         new Array(8),
         new Array(8),
         new Array(8),
         new Array(8),
         new Array(8),
         new Array(8),
         new Array(8) ],

  food: [],

  snake: [],

  score: 0,


  setUpBoard: function(){
    var snakeRow = 7;
    var snakeCol = 2;

    //put the snakes head on
    this.snake.push([snakeRow, snakeCol]);
    
    //assign food a spot
    this.food[0] = 4;
    this.food[1] = 4;
    
  },

  moveSnake: function(event){
    
    this.moveSnakeBody();
    this.moveSnakeHead(event);
    
    this.manageFood();
    
  },

  moveSnakeBody: function(){
    if(this.snake.length > 1){
      //CANT CHANGE THE AHEAD BECAUSE IT MESSES UP ADDITIONAL SEGMENTS AFTER 2 long
      for(var i = this.snake.length - 1; i > 0; i--){
        var ahead = this.snake[i - 1];
        var current = this.snake[i];
        var rowDif = ahead[0] - current[0];
        var colDif = ahead[1] - current[1];

        if(rowDif){
          this.snake[i][0] += rowDif;
        } 
        if(colDif){
          this.snake[i][1] += colDif;
        }
      }


    }
  },

  moveSnakeHead: function(event){
    var coords = this.snake[0];

    var row = coords[0];
    var col = coords[1];

    
      
    if(event){
      var keyCode = event.which;
      // for if a keyCode is passed
      this.moveSegment(row, col, keyCode);
    } else {
      //up
      this.moveSegment(row, col, 38);
    }


  },

  snakeInbounds: function(){
    var inbounds = true;

    this.snake.forEach(function(coords){
      if(coords[0] < 0 || coords[0] > 7){
        inbounds = false;
      }

      if(coords[1] < 0 || coords[1] > 7){
        inbounds = false;
      }
    })

    return inbounds;
  },

  snakeIntersects: function(){
    var intersects = false;
    this.snake.forEach(function(i, innerIndex){
      model.snake.forEach(function(j, outerIndex){
        if(innerIndex === outerIndex){
          return true;
        }

        if(i[0] === j[0] && i[1] === j[1]){
          intersects = true;
        }
      })
    })
    return intersects;

  },

  checkGameOver: function(){
    var playing = true;
   if(this.snakeInbounds() !== true){
    playing = false;
   }
   if(this.snakeIntersects()){
    playing = false;
   }

   return !playing;
  },

  moveSegment: function(row, col, keyCode){
    if(keyCode === 39){
      //right
      this.snake[0][0] = row;
      this.snake[0][1] = col + 1;
    } else if(keyCode === 40){
      //down
      this.snake[0][0] = row + 1;
      this.snake[0][1] = col;
    } else if(keyCode === 37){
      //left
      this.snake[0][0] = row;
      this.snake[0][1] = col - 1;
    } else if(keyCode === 38){
      //up
      this.snake[0][0] = row - 1;
      this.snake[0][1] = col;
    }
    
  },

  
  //if I store the previous tail I can just add a segment on that
  addSnakeSegment: function(){
    var index = this.snake.length - 1;
    var lastSeg = this.snake[index];

    if(lastSeg[1] > 0){
      var row = lastSeg[0];
      var col = lastSeg[1] - 1;
    } else if(lastSeg[0] < 7){
      var row = lastSeg[0] + 1;
      var col = lastSeg[1];
    } else if(lastSeg[1] < 7){
      var row = lastSeg[0];
      var col = lastSeg[1] + 1;
    }
    
    console.log("last item: " + this.snake[index]);
    console.log("newest item: " + [row,col])
    this.snake.push([row, col]);

  },

  

  manageFood: function(row, col){
    
    if(this.snakeIntersectsFood()) {
      this.score += (1 * this.snake.length);
      
      var row = Math.floor(Math.random() * 7);
      var col = Math.floor(Math.random() * 7);
      
      this.food[0] = row;
      this.food[1] = col;
      this.addSnakeSegment();
    }
  },

  snakeIntersectsFood: function(){
    var foodRow = this.food[0];
    var foodCol = this.food[1];
    var intersects = false;
    
    this.snake.forEach(function(coords){
      var snakeRow = coords[0];
      var snakeCol = coords[1];

      if(foodRow === snakeRow && foodCol === snakeCol){
        intersects = true;
      }
    })
    return intersects;
  }

  

  

}