'use strict;'

var view = {

  init: function(){
    // set listeners
    $('#play-button').click(controller.beginGame);

  },

  render: function(){
    var score = controller.getScore();
    $('#score').text(score);
  }

};