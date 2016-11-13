var DIR = {
  DOWN: 1,
  LEFT: 2,
  UP: 3,
  RIGHT: 4,
};

var model = {
  snake: undefined,
  speed: undefined,
  dirction: undefined,
  food: undefined,
  snakePoppedTail: undefined,
  gameLoop: undefined,
  score: 0,
  init: function() {
    model.snake = ["3_10", "2_10", "1_10"];
    model.dirction = DIR.DOWN;
    model.speed = 200;
    model.score = 0;
    view.renderScore();
  },
  incrScore: function() {
    model.score += 1;
    view.renderScore();
  }
};

var view = {
  init: function() {
    view.createCells();
    view.renderSnake();
    view.generatefood();
    model.gameLoop = setInterval( function(){
      view.moveSnake();
      controller.doeSnakeEatFood();
      controller.isGameOver();
    }, model.speed);
    view.dirctionKeyListener();
    view.OnNewGameListener();
  },

  createCells: function() {
    $('#div_main').html("");
    for (var r=0 ; r<20 ; r++) {
      for (var c=0; c<20 ; c++) {
        $('#div_main').append('<div class="cell" id=c_'+r+'_'+c+'></div>');
      }
    }
  },

  renderSnake: function() {
    $.each(model.snake, function(i, v) {
      $('#c_'+ v).addClass('snake');
    })
  },

  generatefood: function (){
    var r1 = Math.floor(Math.random() * 19);
    var c1 = Math.floor(Math.random() * 19);
    $('#c_'+r1+'_'+c1).addClass('food');
    model.food = ''+r1+'_'+c1;
  },

  moveSnake: function() {
    view.removeTail();
    view.addNewHead();
  },

  removeTail: function() {
  model.snakePoppedTail = model.snake.pop();
  $('#c_' + model.snakePoppedTail).removeClass('snake');
  },

  addNewHead: function() {
   var hh = model.snake[0];
   var rc = hh.split("_");
   var r = Number(rc[0]);
   var c = Number(rc[1]);
   switch(model.dirction) {
     case DIR.DOWN:  r=r+1; break; // Bottom
     case DIR.LEFT:  c=c-1; break; // Left
     case DIR.UP:    r=r-1; break; // Top
     case DIR.RIGHT: c=c+1; break;  // Right
   }
   var nn=""+r+"_"+c;
   model.snake.unshift(nn);
   view.renderSnake();
  },

  renderScore: function() {
    $('span#score').html(model.score);
  },

  OnNewGameListener: function() {
    $('#start-game').on('click', function() {
      clearInterval(model.gameLoop);
      controller.init();
    });
  },

  dirctionKeyListener: function() {
    $(document).keydown(function(e){
      if (e.keyCode == 37 && model.dirction !== DIR.RIGHT ) {
         model.dirction = DIR.LEFT;
      } else if (e.keyCode == 38 && model.dirction !== DIR.DOWN) {
         model.dirction = DIR.UP;
      } else if (e.keyCode == 39 && model.dirction !== DIR.LEFT) {
         model.dirction = DIR.RIGHT;
      } else if (e.keyCode == 40 && model.dirction !== DIR.UP) {
         model.dirction = DIR.DOWN;
      }
    });
  }
};

var controller = {
  init: function() {
    model.init();
    view.init();
  },

  doeSnakeEatFood: function() {
    if (model.snake[0] === model.food){
      model.snake.push(model.snakePoppedTail);
      $('#c_'+model.snakePoppedTail).addClass('snake');
      $('#c_'+model.food).removeClass('food');
      model.incrScore();
      view.generatefood();
    }
  },

  isGameOver: function() {
    var head = model.snake[0];
    var rc = head.split("_");
    var r = Number(rc[0]);
    var c = Number(rc[1]);
    if (c<0 || r<0 || c>19 || r>19 || $.inArray( head, model.snake.slice(1)) != -1) {
      clearInterval(model.gameLoop);
      alert("Game Over!");
    }
  }
};

$(document).ready( function() {
  controller.init();
});