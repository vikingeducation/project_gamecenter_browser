snakeGame.view = {
  init: function(cb) {
    this.gameWrapper = document.getElementsByTagName('snake-game')[0];
    this.gameWrapper.style.height = this.windowSize()
    this.gameWrapper.style.width = this.windowSize()
    this.listeners(cb);
  },
  listeners: function(cb){
    if(cb.start){
      snakeGame.TouchListener(this.gameWrapper, cb.start, true);
      snakeGame.KeyboardListener(cb.start, true)
    }
    if(cb.dir){
      snakeGame.TouchListener(this.gameWrapper, cb.dir);
      snakeGame.KeyboardListener(cb.dir)
    }
  },
  windowSize: function(){
    return (Math.min(window.innerWidth,window.innerHeight) - 100 )
  },
  render: function(board, waiting) {
    this.elements = {};
    this.gameWrapper.innerHTML = "";
    if(waiting){
      this.addWelcome(waiting);
    }
    var size = Math.round(this.windowSize()/ board.size);
    var grid = board.grid;
    for(coord in grid) {
      cell = this.elements[grid[coord].toPropKey()] = document.createElement('DIV');
      cell.classList.add('cell');

      if (grid[coord].value) {cell.classList.add(grid[coord].value)};
      cell.style.height = size;
      cell.style.width = size;
      cell.style.top = grid[coord].y * size;
      cell.style.left = grid[coord].x * size;

      this.gameWrapper.appendChild(cell);

    }
  },
  addWelcome: function(waiting){
    var welcome = document.createElement('DIV');
    welcome.innerHTML = "<h1>" + (waiting || "") + "</h1><h2>Press an Arrow Key to Play</h2>";
    welcome.classList.add('welcome');


    welcome.style.padding = this.windowSize()/4;

    this.gameWrapper.appendChild(welcome);
  },
  updateCells: function(cells){
    for(var i = 0; i < cells.length; i++){
      this.updateCell(cells[i]);
    }
  },
  updateCell: function(cell){
    this.elements[cell.toPropKey()].setAttribute('class', 'cell '+cell.value)
  }
}
