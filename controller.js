var controller = {
  init: function(){

  },

  direction: "right",

  updateSnakePosition: function() {

    model.updateCoordinates();
    view.renderHead();
    controller.makeFood();
    controller.checkFoodEat();
    controller.addNode();
    model.updateBody();
    model.checkOffScreen();
  },

  makeFood: function() {
    if($('.food').length === 0){
      var coords = model.randCoord()
      view.createFoodNode()
      $('.food').css('left', coords.left + "px").css('top', coords.top + "px");
      $('.food').first().attr('data-left', coords.left);
      $('.food').first().attr('data-top', coords.top);

    }
  },

  addNode: function(){
    if ($('.node').length !== model.snakeSize){
      view.createNode();
      $('[date-id="' + model.snakeSize + '"').data('parent', model.snakeSize - 1)
    }
  },

  checkFoodEat: function(){
    if($('.node').attr('data-left') === $('.food').attr('data-left') && $('.node').attr('data-top') === $('.food').attr('data-top')){
      $('.food').remove();
      model.snakeSize++;
      console.log(model.snakeSize)
    }
  },

  // actually move the snake every 100ms
  moveTheSnake: function() {
    setInterval(controller.updateSnakePosition, 100);
  },

}
