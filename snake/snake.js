// add point if hit
// snake body w/ food
// death if hit body
// speed up


var model = {

  board: {
    gridSize: {
      height: 10,
      width: 15
    },
    snakeHead: {
      x: 1,
      y: 1
    },
    apple: {
      x: 5,
      y: 6
    },
    score: 0
  },

  gameOver: function(){
    return (model.board.snakeHead.x > model.board.gridSize.width ||
            model.board.snakeHead.x < 1 ||
            model.board.snakeHead.y > model.board.gridSize.height ||
            model.board.snakeHead.y < 1 );
  },

  direction: "right",

  move: function(){
    model.moveSnakeHead();
    if(model.snakeEatsApple()){
      model.placeApple();
      model.board.score ++;
    }
  },

  moveSnakeHead: function(){
    if(model.direction === "left"){
      model.moveLeft();
    } else if(model.direction === "up"){
      model.moveUp();
    } else if(model.direction === "right"){
      model.moveRight();
    } else if(model.direction === "down"){
      model.moveDown();
    }
  },

  moveRight: function(){
    model.board.snakeHead.x++;
  },

  moveLeft: function(){
    model.board.snakeHead.x--;
  },

  moveUp: function(){
    model.board.snakeHead.y++;
  },

  moveDown: function(){
    model.board.snakeHead.y--;
  },

  placeApple: function(){
    var applePlaced = false;
    while(!applePlaced){
      var y = Math.floor((Math.random() * model.board.gridSize.height) + 1);
      var x = Math.floor((Math.random() * model.board.gridSize.width) + 1);
      if(!model.appleOnTopOfSnake(x,y)){
        model.board.apple = {
          x: x,
          y: y
        };
        applePlaced = true;
      }
    }
  },

  appleOnTopOfSnake: function(x,y){
    return model.appleOnSnakesX(x) && model.appleOnSnakesY(y);
  },

  snakeEatsApple: function(){
    return model.appleOnTopOfSnake(model.board.apple.x, model.board.apple.y);
  },

  appleOnSnakesX: function(x){
    return model.board.snakeHead.x === x;
  },

  appleOnSnakesY: function(y){
    return model.board.snakeHead.y === y;
  }
};

var view = {

  init: function(){
    view.attachArrowListener();
  },

  attachArrowListener: function(){
    $( window ).keydown(function(e){
      if(e.which === 37){
         controller.setDirection("left");
      } else if(e.which === 38){
         controller.setDirection("up");
      } else if(e.which === 39){
         controller.setDirection("right");
      } else if(e.which === 40){
         controller.setDirection("down");
      }
    });
  },

  appendRowsToContainer: function(gridSize){
    for( var y = gridSize.height; y > 0; y--){
      var $row = $("<div />", {
        class: 'row',
        'data-y': y
      });

      $('#container').append($row);
      view.appendCellsToRow($row, gridSize.width);
    }
  },

  appendCellsToRow: function(row, width){
    for( var x = 1; x <= width; x++){
      var $cell = $("<div />", {
        class: 'cell',
        'data-x': x,
        'data-y': row.data('y')
      });
      row.append($cell);
    }
  },

  render: function(board){
    view.clearBoard();
    view.appendRowsToContainer(board.gridSize);
    view.attachSnakeHead(board.snakeHead);
    view.attachApple(board.apple);
    view.showScore(board.score);
  },

  clearBoard: function(){
    $( '#container').html("");
  },

  attachSnakeHead: function(snakeHead){
    $("div[data-y='" + snakeHead.y + "'] div[data-x='" + snakeHead.x + "']").addClass( 'snake-head' );
  },

  attachApple: function(apple){
    var $apple = $("<div />", {
      class: 'apple'
    });
    $("div[data-y='" + apple.y + "'] div[data-x='" + apple.x + "']").append( $apple );
  },

  showScore: function(score){
   $( '#score' ).text(score);
  }
};

var controller = {
  init: function(){
    view.init();
    controller.gameLoop();
  },

  setDirection: function(direction){
    model.direction = direction;
  },

  gameLoop: function(){
    setInterval(function(){
      if(model.gameOver()){
        alert("GAME OVER");
      }
      model.move();
      view.render(model.board);
    }, 500);
  }
};

$( document ).ready(function() {
  controller.init();
});