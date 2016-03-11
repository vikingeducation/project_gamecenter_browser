jQuery.fn.reverse = [].reverse;
var model = {
//////////////////////////BOARD INFO/////////////////////////////
  boardSize: 12,//from window size

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


  // actually change the data values of each node
  updateCoordinates: function() {
      if (model.nodeFromID(1).attr('data-top') < $(window).height() && model.nodeFromID(1).attr('data-top') > 0){
        // add vector to top
        model.nodeFromID(1).attr('data-top', (parseInt(model.nodeFromID(1).attr('data-top')) + parseInt(model.directions[controller.direction]['top'])))
      }
      if (model.nodeFromID(1).attr('data-left') < $(window).width() && model.nodeFromID(1).attr('data-left') > 0){
        // add vector to left
        model.nodeFromID(1).attr('data-left', (parseInt(model.nodeFromID(1).attr('data-left')) + parseInt(model.directions[controller.direction]['left'])))
      }

  },

  updateBody: function() {
    $('.node').reverse().each(function(index, node){
      if ($(node).data('id') > 1){
        $(node).attr('data-top', model.nodeFromID($(node).attr('data-parent')).attr('data-top'));
        $(node).attr('data-left', model.nodeFromID($(node).attr('data-parent')).attr('data-left'));
      }
    })
  },

  nodeFromID: function(id){
    return $('[data-id="' + id + '"]')
  }





////////////////////////////////////////////////////////////////

}
