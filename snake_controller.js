var controller = {

  init: function(){
    view.init();
    model.init();

    model.addFood();//adds food obj
    //adds snake obj

    setInterval(function(){game_loop();}, 1000);
  },
  
  game_loop: function(){
  }

}

$(document).ready(function() {
    controller.init();
});

