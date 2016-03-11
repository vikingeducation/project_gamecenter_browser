var view = {
  init: function(){
    view.eventListeners.keypressListener();
  },

  createNode: function(){

  },

  moveSnake: function(){
    $('.node').css('top', view.calcNewCSS()['top']+ model.directions[String(controller.direction)]['top'] + "px")


    $('.node').css('left', view.calcNewCSS()['left'] + model.directions[String(controller.direction)]['left'] + "px")
  },

  calcNewCSS: function(){
    var top = $('.node').css('top');
    var left = $('.node').css('left');
    return {top: parseInt(top.split('px')[0]),
            left: parseInt(left.split('px')[0])
            }
  },

  eventListeners: {
    keypressListener: function(){
      $( document ).keydown(function(e) {
        switch(e.which) {
          case 37: // left
          controller.direction = "left";
          break;

          case 38: // up
          controller.direction = "up";
          break;

          case 39: // right
          controller.direction = "right";
          // controller.moveTheSnake();
          break;

          case 40: // down
          controller.direction = "down";
          break;
        }
      })
    }
  }
}
