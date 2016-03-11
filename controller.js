var controller = {
  init: function(){

  },

  direction: "right",

  updateSnakePosition: function() {
    model.updateCoordinates();
    view.renderSnake();
  },


  moveTheSnake: function() {
      setInterval(controller.updateSnakePosition, 500)
  },


}
