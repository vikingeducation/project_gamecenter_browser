var snakeController = {
  init: function() {
    snakeView.hideBoard();
    $(".snake-play").click(function() {
      snakeView.init([400, 400]);
    });
    $(".spcs-submit").click(function() {
      $('.spcs-error').remove(); 
      var w = $('#sc-width')[0].value;
      var h = $('#sc-height')[0].value;
      if (snakeModel.validCanvasSize('Width', w) & snakeModel.validCanvasSize('Height', h)) {
        $('.spcs-submit-close').click();
        snakeView.init([w, h]);
      } else {
        $('<small>', { 'class': 'spcs-error alert-danger', 'text': snakeModel.canvasWidthError }).insertAfter('#sc-width');
        $('<small>', { 'class': 'spcs-error alert-danger', 'text': snakeModel.canvasHeightError }).insertAfter('#sc-height');
      }
    });
  }
}