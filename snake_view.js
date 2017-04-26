var snakeView = {
  init: function(array) {
    snakeView.hidePausePopup();
    snakeView.hideGameOverPopup();
    snakeView.hideButtons();
    snakeView.showBoard();
    snakeView.renderCanvas(array);
    var ctx = $('.snake-canvas')[0].getContext('2d');
    snakeView.renderSnake(ctx);
    snakeView.renderFood(ctx);
    $('#sb-score-val').text("0");
    $('#sb-length').text("1");
    $('#sb-distance').text("0");
    $('#sb-time').text("0.00");
    $('#sb-speed').text((1/snakeController.speed*1000).toFixed(2));
    $('#sb-avg-speed').text("-");
  },
  renderGameFrame: function() {
    ctx = $('.snake-canvas')[0].getContext('2d');
    snakeView.resetCanvas(ctx);
    snakeView.renderSnake(ctx);
    snakeView.renderFood(ctx);
    snakeView.renderScoreInfo();
  },
  renderSnake: function(ctx) {
    ctx.fillStyle = 'red';
    snakeModel.snakeLoc.forEach(function(el) {
      ctx.fillRect(10*el.x, 10*el.y, 10, 10);
    });
  },
  renderFood: function(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(10*snakeModel.foodLoc.x, 10*snakeModel.foodLoc.y, 10, 10);
  },
  renderScoreInfo: function() {
    var length = snakeModel.snakeLoc.length;
    var dist = snakeModel.distance;
    var speed = 1/snakeController.speed*1000;
    var time = snakeModel.timeElapsed;
    $('#sb-score-val').text(snakeModel.score);
    $('#sb-length').text(length);
    $('#sb-distance').text(dist);
    $('#sb-time').text(time.toFixed(2));
    $('#sb-speed').text(speed.toFixed(2));
    $('#sb-avg-speed').text((dist/time).toFixed(2));
  },
  resetCanvas: function(ctx) {
    ctx.fillStyle = '#fafad2';
    ctx.fillRect(0, 0, snakeModel.canvasWidth, snakeModel.canvasHeight);
  },
  renderCanvas: function(array) {
    $('.snake-canvas').css({"width": array[0] + "px", "height": array[1] + "px"})
                      .removeClass('sc-hidden')
                      .addClass('sc-visible');
    $('.snake-canvas')[0].width = array[0];
    $('.snake-canvas')[0].height = array[1];
    $('.sb-score').css({"width": snakeModel.canvasWidth + "px"})
                  .removeClass('ss-hidden')
                  .addClass('ss-visible');
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
  showButtons: function() {
    $(".snake-play").show();
    $(".snake-play-custom").show();
    $(".snake-play-buttons").css({"margin-bottom": "0"});
  },
  playAgain: function() {
    $(".snake-play").text("Play Again!").show();
    $(".snake-play-custom").show();
    $(".snake-play-buttons").css({"margin-bottom": "20px"});
  },
  renderGameOverPopup: function() {
    $('#sb-go-base').text(snakeModel.snakeLoc.length*100);
    $('#sb-go-fatigue').text(snakeModel.distance/10);
    $('#sb-go-multiplier').text((snakeModel.distance/snakeModel.timeElapsed/10).toFixed(2));
    $('#sb-go-score').text(snakeModel.score);
    $('#sb-game-over').css({"width": snakeModel.canvasWidth + "px", "height": snakeModel.canvasHeight + "px"})
                      .removeClass('sb-popup-hidden')
                      .addClass('sb-popup-visible');
  },
  hideGameOverPopup: function() {
    $('#sb-game-over').removeClass('sb-popup-visible').addClass('sb-popup-hidden');
  },
  renderPausePopup: function() {
    $('#sb-pause').css({"width": snakeModel.canvasWidth + "px", "height": snakeModel.canvasHeight + "px"})
                  .removeClass('sb-popup-hidden')
                  .addClass('sb-popup-visible');
  },
  hidePausePopup: function() {
    $('#sb-pause').removeClass('sb-popup-visible').addClass('sb-popup-hidden');
  },
  reset: function() {
    snakeView.hideBoard();
    snakeView.showButtons();
    $(".snake-play").text("Play!")
    $('.snake-canvas').css({"width": "0", "height": "0"})
                      .removeClass('sc-visible')
                      .addClass('sc-hidden');
    $('.sb-score').removeClass('ss-visible').addClass('ss-hidden');
  }
}