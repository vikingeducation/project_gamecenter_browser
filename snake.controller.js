snakeGame.controller = {
  init: function(num) {
    var size = num || 25;
    this.setReferences();
    this.reset(size);
    this.view.init({
      dir: this.changeDirection,
      start: this.run
    });
    this.view.render(this.board, "Welcome to Snake")
  },
  setReferences: function(){
    this.board = snakeGame.boardModel;
    this.snake = snakeGame.snakeModel;
    this.view = snakeGame.view;
  },
  reset: function(size, message){
    this.snake.init(size);
    this.board.init(size, this.snake.snakeBody);
  },
  run: function(e) {
    var self = snakeGame.controller;
    if(!self.gameRunning){
      console.log("Game Started")
      self.gameRunning = true;
      self.view.render(self.board)
      self.gameSpeed(1);
    }
  },
  gameOver: function() {
    console.log("Game Over")
    clearInterval(this.gameLoop);
    this.gameRunning = false;
    var self = this;
    setTimeout(function(){
      self.reset(self.board.size);
      self.view.listeners({start: self.run});
    }, 200)
  },
  gameSpeed: function(modifier){
    clearInterval(this.gameLoop);
    var self = snakeGame.controller;
    self.gameLoop = setInterval(function(){
      self.move()
    }, (2000/(self.board.size + modifier)))
  },
  move: function() {
    this.snake.changeDirection();
    var res = this.board.checkNextPosition(this.snake.nextPostion());
    if(res === "crash"){
      this.view.render(this.board, "Game Over")
      this.gameOver();
    } else {
      if(res){
        this.gameSpeed(this.snake.snakeBody.length)
      }
      var tail = this.snake.move(res);
      this.board.unset(tail);
      this.view.updateCells(this.board.changedCells);
      this.board.changedCells = [];
    }
  },
  changeDirection: function(e){
    var dir = {
      "left": {x: -1, y: 0},// left
      "up": {y: -1, x: 0},// up
      "right": {x: 1, y: 0},// right
      "down": {y: 1, x: 0},// down
    }[e]
    if(dir)
      snakeGame.snakeModel.addDirChange(dir)
  },
  // keyboardChangeDirection: function(e) {
  //   var dir = {
  //     37: {x: -1, y: 0},// left
  //     38: {y: -1, x: 0},// up
  //     39: {x: 1, y: 0},// right
  //     40: {y: 1, x: 0},// down
  //   }[e.which || e.keyCode]
  //   if(dir)
  //     snakeGame.snakeModel.addDirChange(dir)
  //   // var dir = {
  //   //   37: function(){ //left
  //   //     console.log("left")
  //   //     if(sM.snakeHead.d.x === 0){
  //   //       return {x: -1, y: 0}
  //   //     }
  //   //   },
  //   //   38: function(){ // up
  //   //     if(sM.snakeHead.d.y === 0){
  //   //       return {y: -1, x: 0}
  //   //     }
  //   //   },
  //   //   39: function(){// right
  //   //     if(sM.snakeHead.d.x === 0){
  //   //       return {x: 1, y: 0}
  //   //     }
  //   //   },
  //   //   40: function(){ // down
  //   //     console.log("down")
  //   //     if(sM.snakeHead.d.y === 0){
  //   //       return {y: 1, x: 0}
  //   //     }
  //   //   },
  //   // }[e.which || e.keyCode]
  //   //
  //   // if(dir = (dir ? dir() : false))
  //     // snakeGame.snakeModel.addDirChange(dir)
  // }
}
