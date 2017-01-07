snakeGame.boardModel = {
  init: function(boardSize, snake) {
    this.size = boardSize || 25;
    this.changedCells = [];
    this._setupNewBoard(this.size, snake);
  },
  _setupNewBoard: function(size, snake) {
    console.log("setup");
    this._newBoard(size)
        ._addSnake(snake)
        ._placeFood();
  },
  _addSnake: function(snake){
    for(i = 0; i < snake.length; i ++){
      this.grid[snake[i].toPropKey()] = snake[i];
    }
    return this;
  },
  _newBoard: function(size) {
    this.grid = {};

    for(var x = 0; x < size; x++) {
      for(var y = 0; y < size; y++) {
        this.grid[x + "_" + y] = new snakeGame.Coord(x,y);
      }
    }

    return this;
  },
  coordToKey: function(x, y){
    return x + "_" + y;
  },
  checkNextPosition: function(cell){
    cell = this.grid[this.coordToKey(cell.x, cell.y)]
    var value = cell ? cell.value : null
    if((!cell) || value === "snake" ){
      return "crash";
    } else {
      cell.value = "snake";
      this.changedCells.push(cell);
      if(value === "food"){
        this._placeFood();
        return "grow";
      }
    }
  },
  _placeFood: function(){
    var cell;
    do{
      cell = this.grid[this._randomCell()]
    }while(cell.value === "snake")
    cell.value = "food";
    this.changedCells.push(cell)
    return this;
  },
  _randomCell: function(){
    return this.coordToKey(Math.floor(Math.random() * this.size),
                      Math.floor(Math.random() * this.size));
  },
  unset: function(cell){
    if(cell){
      this.grid[cell.toPropKey()].value = null;
      this.changedCells.push(this.grid[cell.toPropKey()])
    }
  }
}
