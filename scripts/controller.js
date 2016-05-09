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
    view.render();
    view.renderCards();
  }

};

$(document).ready(function(){
    controller.init();
});
