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
    snakeBody: [],
    apple: {
      x: 5,
      y: 6
    }
  },

  speed: 500,

  gameOver: function(){
    return model.wallDeath() || model.bodyDeath();
  },

  wallDeath: function(){
    return (model.board.snakeHead.x > model.board.gridSize.width ||
            model.board.snakeHead.x < 1 ||
            model.board.snakeHead.y > model.board.gridSize.height ||
            model.board.snakeHead.y < 1 );
  },

  bodyDeath: function(){
    var ateSelf = false;
    model.board.snakeBody.forEach(function(bodyPart){
      if(model.overlappingCoordinates(bodyPart, model.board.snakeHead)){
        ateSelf = true;
      }
    });
    return ateSelf;
  },

  overlappingCoordinates: function(coordsA,coordsB){
    return coordsA.x === coordsB.x && coordsA.y === coordsB.y;
  },

  direction: "right",

  move: function(){
    var snakeHeadCoords = jQuery.extend({}, model.board.snakeHead);
    model.board.snakeBody.push(snakeHeadCoords);
    model.moveSnakeHead();
    if(model.snakeEatsApple()){
      model.placeApple();
      model.board.score ++;
      model.speed = model.speed * 0.98;
    } else {
      model.board.snakeBody.shift();
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
      var tempApple = model.generateTempApple;
      if(!model.appleOnTopOfSnake(tempApple)){
        model.board.apple = tempApple;
        applePlaced = true;
      }
    }
  },

  generateTempApple: function(){
    var y = Math.floor((Math.random() * model.board.gridSize.height) + 1);
    var x = Math.floor((Math.random() * model.board.gridSize.width) + 1);
    return {x: x, y: y};
  },

  appleOnTopOfSnake: function(apple){
    return model.appleOnTopOfSnakeHead(apple) || model.appleOnTopOfSnakeBody(apple);
  },

  appleOnTopOfSnakeBody: function(apple){
    var appleOnBody = false;
    model.board.snakeBody.forEach(function(bodyPart){
      if(model.overlappingCoordinates(bodyPart, apple)){
        appleOnBody = true;
      }
    });
    return appleOnBody;
  },

  appleOnTopOfSnakeHead: function(apple){
    return model.overlappingCoordinates(model.board.snakeHead, apple);
  },

  snakeEatsApple: function(){
    return model.appleOnTopOfSnakeHead(model.board.apple);
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
    view.attachSnakeBody(board.snakeBody);
    view.attachApple(board.apple);
    view.showScore(board.snakeBody.length);
  },

  clearBoard: function(){
    $( '#container').html("");
  },

  attachSnakeHead: function(snakeHead){
    $("div[data-y='" + snakeHead.y + "'] div[data-x='" + snakeHead.x + "']").addClass( 'snake-head' );
  },

  attachSnakeBody: function(snakeBody){
    snakeBody.forEach(function(bodyPart){
      $("div[data-y='" + bodyPart.y + "'] div[data-x='" + bodyPart.x + "']").addClass( 'snake-body' );
    });
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
        console.log("GAME OVER")
        alert("GAME OVER");
      }
      model.move();
      view.render(model.board);
    }, model.speed);
  }
};

$( document ).ready(function() {
  controller.init();
});