var view = {
  init: function(){
    view.eventListeners.keypressListener();
  },

  renderNode: function(){

  },


  renderSnake: function() {
    $.each($('.node'), function(index, node) {
      $(node).css('top', $(node).data('top')+"px");
      $(node).css('left', $(node).data('left')+"px");
    })
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
          break;

          case 40: // down
          controller.direction = "down";
          break;
        }
      })
    }
  }
}
