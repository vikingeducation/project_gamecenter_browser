var snakeView = {
  init: function(array) {
    snakeView.hideButtons();
    snakeView.showBoard();
    snakeView.renderCanvas(array);
    snakeView.renderSnake();
    snakeView.renderFood();
  },
  hideBoard: function() {
    $(".snake-board").hide();
  },
  showBoard: function() {
    $(".snake-board").show();
  },
  hideButtons: function() {
    $(".snake-play").hide();
    $(".snake-play-custom").hide();
  },
  renderCanvas: function(array) {
    $('.snake-canvas').removeClass('sc-hidden')
                      .css({"width": array[0] + "px", "height": array[1] + "px"})
                      .addClass('sc-visible');
    $('.snake-canvas')[0].width = array[0];
    $('.snake-canvas')[0].height = array[1];
  },
  renderSnake: function() {
    ctx = $('.snake-canvas')[0].getContext('2d');
    ctx.fillStyle = 'red';
    startLoc = snakeModel.generateRandStartLoc();
    ctx.fillRect(startLoc[0], startLoc[1], 10, 10);
  },
  renderFood: function() {
    ctx = $('.snake-canvas')[0].getContext('2d');
    ctx.fillStyle = 'green';
    foodLoc = snakeModel.generateFood();
    ctx.fillRect(foodLoc[0], foodLoc[1], 10, 10);
  } 
}