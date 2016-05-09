'use strict;'

var controller = {
  init: function(){
    view.init();
  },

  beginGame: function(){
    event.preventDefault();
    model.init();
    $('#play').hide();
    $('#score-box').show();
    view.initializeBoard();
    view.render();
  },

  getScore: function(){
    return model.getScore();
  },

  getBoardSize: function(){
    return model.getBoardSize();
  }

};

$(document).ready(function(){
    controller.init();
});
