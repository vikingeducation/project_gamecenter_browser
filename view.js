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
      snakeGame.ButtonListener(this.gameWrapper, cb.start, true);
    }
    if(cb.dir){
      snakeGame.TouchListener(this.gameWrapper, cb.dir);
      snakeGame.KeyboardListener(cb.dir)
      snakeGame.ButtonListener(this.gameWrapper, cb.dir);
    }
  },
  windowSize: function(){
    return (Math.min(window.innerWidth,window.innerHeight) - 200 )
  },
  render: function(board, waiting) {
    this.elements = {};
    this.gameWrapper.innerHTML = "";
    if(waiting){
      this.addWelcome(waiting);
    }
    var size = Math.round(this.windowSize()/ board.size),
        grid = board.grid,
        cell;
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
    this.addButtons();
  },
  addButtons: function(){
    var cell  = document.createElement('DIV'),
        left  = document.createElement('BUTTON'),
        right = document.createElement('BUTTON'),
        up    = document.createElement('BUTTON'),
        down  = document.createElement('BUTTON'),
        buttons = [left, up, down, right];
    cell.classList.add('snake-buttons');
    cell.style.height = 100;
    cell.style.width = this.windowSize();
    cell.style.top = this.windowSize() + 50;
    cell.style.margin = "auto";

    for(i = 0; i < 4; i++){
      buttons[i].style.width =(this.windowSize()/4) - 5;
      if (i < 3){buttons[i].style.marginRight = 5};
    }

    left.innerHTML = "&lArr;";
    right.innerHTML = "&rArr;";
    up.innerHTML = "&uArr;";
    down.innerHTML = "&dArr;";

    left.setAttribute('direction', "left");
    right.setAttribute('direction', "right");
    up.setAttribute('direction', "up");
    down.setAttribute('direction', "down");


    cell.appendChild(left);
    cell.appendChild(up);
    cell.appendChild(down);
    cell.appendChild(right);
    this.gameWrapper.appendChild(cell);
  },
  addWelcome: function(waiting){
    var welcome = document.createElement('DIV');
    welcome.innerHTML =
      "<h1>" +
        (waiting || "") +
      `</h1>
      <h3>Swipe, click the buttons at the bottom, or press one of the keyboard controls to begin</h3>
      <h3>Keyboard Controls:</h3>
      <ul>
        <li>W, &uArr; = Up</li>
        <li>A, &lArr; = Left</li>
        <li>D, &rArr; = Right</li>
        <li>S, &dArr; = Down</li>
      </ul>`;

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
