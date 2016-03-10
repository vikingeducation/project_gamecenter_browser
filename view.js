var view = {
  init: function(){
    view.eventListeners.keypressListener();
  },

  createNode: function(){

  },

  moveSnake: function(direction){
    $('#1').css('top', this.calcNewCSS()['top ']+ model.directions[String(direction)]['top'] + "px")
    $('#1').css('left', this.calcNewCSS()['left'] + model.directions[String(direction)]['left'] + "px")
  },

  calcNewCSS: function(){
    var top = $('#1').css('top');
    var left = $('#1').css('left');
    return {top: parseInt(top.split('px')[0]),
            left: parseInt(left.split('px')[0])
            }
  },

  eventListeners: {
    keypressListener: function(){
      $( document ).keydown(function(e) {
        switch(e.which) {
          case 37: // left
          controller.direction = "left"
          break;

          case 38: // up
          controller.direction = "up"
          break;

          case 39: // right
          controller.direction = "right"
          break;

          case 40: // down
          controller.direction = "down"
          break;
        }
        e.preventDefault();
      })
    }
  }
}
// e.which
