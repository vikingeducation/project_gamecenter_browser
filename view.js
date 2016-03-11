var view = {
  init: function(){
    view.eventListeners.keypressListener();
  },

  windowHeight: $(window).height(),
  windowWidth: $(window).width(),
  docHeight: $(document).height(),

  createFoodNode: function(){
    var newNode = $('body').append($('<div class="food" data-top="0" data-left="0"></div>'));
    return newNode;
  },

  createNode: function(){
    var newNode = $('body').append($('<div class="node" data-id="' + model.snakeSize + '" data-parent="' + (model.snakeSize - 1) + '"></div>'));
    return newNode;
  },


  renderHead: function() {
    $.each($('.node'), function(index, node) {
      $(node).css('top', $(node).attr('data-top')+"px");
      $(node).css('left', $(node).attr('data-left')+"px");
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
