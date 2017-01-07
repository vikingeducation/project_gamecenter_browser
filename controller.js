snakeGame.controller = {
  init: function(num) {
    var size = num || 25;
    this.setReferences();
    this.reset(size);
    this.view.init({dir: this.changeDirection, start: this.run});
    this.view.render(this.board);
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
    console.log("running")
    var self = snakeGame.controller;
    self.view.render(self.board)
    self.gameSpeed(1);
  },
  gameOver: function() {
    clearInterval(this.gameLoop)
    this.reset(this.board.size);
    this.view.listeners({start: this.run});
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
  changeDirection: function(e) {
    var sM = snakeGame.snakeModel
    var dir = {
      37: {x: -1, y: 0},// left
      38: {y: -1, x: 0},// up
      39: {x: 1, y: 0},// right
      40: {y: 1, x: 0},// down
      65: {x: -1, y: 0}, // a
      87: {y: -1, x: 0},// w
      83: {y: 1, x: 0},// s
      68: {x: 1, y: 0},// d
      
      
    }[e.which || e.keyCode]
    if(dir)
      snakeGame.snakeModel.addDirChange(dir)
    // var dir = {
    //   37: function(){ //left
    //     console.log("left")
    //     if(sM.snakeHead.d.x === 0){
    //       return {x: -1, y: 0}
    //     }
    //   },
    //   38: function(){ // up
    //     if(sM.snakeHead.d.y === 0){
    //       return {y: -1, x: 0}
    //     }
    //   },
    //   39: function(){// right
    //     if(sM.snakeHead.d.x === 0){
    //       return {x: 1, y: 0}
    //     }
    //   },
    //   40: function(){ // down
    //     console.log("down")
    //     if(sM.snakeHead.d.y === 0){
    //       return {y: 1, x: 0}
    //     }
    //   },
    // }[e.which || e.keyCode]
    //
    // if(dir = (dir ? dir() : false))
      // snakeGame.snakeModel.addDirChange(dir)
  }
}
