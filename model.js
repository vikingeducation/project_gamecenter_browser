var model = {
  // default values
  // 500x500 board translates to 50x50 10px units
  snakeSegments: [ {x: 4, y: 0}, 
                   {x: 3, y: 0}, 
                   {x: 2, y: 0}, 
                   {x: 1, y: 0}, 
                   {x: 0, y: 0} ],
  food: { x: 4, y: 0 },
  score: 0,
  direction: 'right', 

  // snake moves by removing tail segment and generating new head segment
  incrementSnake: function() {  
    // generate + add new head
    var head = this.snakeSegments[0];
    model.getNewHead(head);
    
    // adjust snake length accordingly
    model.checkSnakeGrowth(head);

    return this.snakeSegments;
  },

  getNewHead: function(head) {
    var newHead = {};
    switch ( this.direction ) {
      case 'right':
        newHead.x = head.x + 1;
        newHead.y = head.y;
        break;
      case 'left': 
        newHead.x = head.x - 1;
        newHead.y = head.y;
        break;
      case 'up':
        newHead.x = head.x;
        newHead.y = head.y - 1;
        break;
      case 'down':
        newHead.x = head.x;
        newHead.y = head.y + 1;
        break;
    }
    this.snakeSegments.unshift(newHead);
  },

  // food
  checkSnakeGrowth: function(head) {
    if ( model.snakeAteFood(head) ) {
      // generate new food and keep tail
      model.scorePoint();
      model.generateNewFood();
    } else {
      // if not pop tail segment to retain original length
      this.snakeSegments.pop();
    }
  },

  snakeAteFood: function(head) {
    if ( head.x === this.food.x && head.y === this.food.y ) {
      return true;
    }
  },

  generateNewFood: function() {
    var foodX, foodY, food;
    do {
      foodX = Math.floor(Math.random() * 50);
      foodY = Math.floor(Math.random() * 50);
      food = {x: foodX, y: foodY};
    } while ( model.foodOnSnake(food) );
    this.food = food;
  },

  foodOnSnake: function(food) {
    this.snakeSegments.forEach( function(segment) { 
      if (segment.x === food.x && segment.y === food.y) {
        return false; }
    } );    
  },

  getFood: function() {
    return this.food;
  },

  // score
  scorePoint: function() {
    this.score++;
  },

  getScore: function() {
    return this.score;
  },

  changeDirection: function(newDirection) {
    if ( model.validDirection(newDirection) ) { this.direction = newDirection; }
  },

  validDirection: function(newDir) {
    var notReverse;
    switch (newDir) {
      case 'right':
        notReverse = !(this.direction === 'left');
        break;
      case 'left': 
        notReverse = !(this.direction === 'right');
        break;
      case 'up':
        notReverse = !(this.direction === 'down');
        break;
      case 'down':
        notReverse = !(this.direction === 'up');
        break;
    }
    return notReverse;
  },

  checkLoss: function() {
    var head = this.snakeSegments[0];
    if ( model.snakeHitsWall(head) || model.snakeSuicide(head) ) {
      return true;
    }
  },

  snakeHitsWall: function(head) {
    if ( [-1, 50].includes(head.x) || [-1, 50].includes(head.y) ) {
      return true;
    }
  },

  snakeSuicide: function(head) {
    for (var i = 1; i < this.snakeSegments.length; i++) {
      var segment = this.snakeSegments[i]
      if ( segment.x === head.x && segment.y === head.y ) {
        return true;
      }
    }
  }

};
