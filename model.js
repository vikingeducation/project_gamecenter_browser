jQuery.fn.reverse = [].reverse;
var model = {
//////////////////////////BOARD INFO/////////////////////////////

  snakeSize: 1,
////////////////////////////////////////////////////////////////

//////////////////////////FOOD INFO/////////////////////////////
  foodLocation:{
    top: 0,
    left: 0,
  },

  //gets random place to put food
  randCoord: function(){
    return {
      top: (Math.round(Math.random() * $(window).height() / 10) * 10),
      left: (Math.round(Math.random() * $(window).width() / 10) * 10)
    }
  },
////////////////////////////////////////////////////////////////

//////////////////////////SNAKE INFO/////////////////////////////
  snakeHeadLocation:{
    top: 0,
    left: 0,
  },


  directions: {
    up: {top: -10,
         left: 0},
    down: {top: 10,
           left: 0},
    left: {top: 0,
           left: -10},
    right: {top: 0,
            left: 10}
  },


  $snake: $('.node'),


  // change the data values of the head
  updateCoordinates: function() {
      if (model.nodeFromID(1).attr('data-top') < view.windowHeight && model.nodeFromID(1).attr('data-top') > 0){
        // add vector to top
        model.nodeFromID(1).attr('data-top', (parseInt(model.nodeFromID(1).attr('data-top')) + parseInt(model.directions[controller.direction]['top'])))
      }
      if (model.nodeFromID(1).attr('data-left') < view.windowWidth && model.nodeFromID(1).attr('data-left') > 0){
        // add vector to left
        model.nodeFromID(1).attr('data-left', (parseInt(model.nodeFromID(1).attr('data-left')) + parseInt(model.directions[controller.direction]['left'])))
      }

  },

  // move the body of the snake up by one
  updateBody: function() {
    $('.node').reverse().each(function(index, node){
      if ($(node).data('id') > 1){
        $(node).attr('data-top', 
                      model.nodeFromID(
                        $(node).attr('data-parent')).attr('data-top')
                      );
        $(node).attr('data-left', 
                      model.nodeFromID(
                      $(node).attr('data-parent')).attr('data-left')
                      );
      }
    })
  },

  nodeFromID: function(id){
    return $('[data-id="' + id + '"]')
  },


  stopFunction: function() {
    clearInterval(controller.moveTheSnake);
  },


  checkOffScreen: function() {
    var headTop = model.nodeFromID(1).attr("data-top");
    var headLeft = model.nodeFromID(1).attr("data-left");
    // if top or left is 0, you die
    // if top or left is window height or width, you die
    if (headTop == 0 || headLeft == 0 || headTop > view.docHeight || headLeft > view.windowWidth) {
      // brute force :(
      for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
      console.log("Game over!");
    } 
  },





////////////////////////////////////////////////////////////////

}
