var controller = {
  init: function() {
    model.init();
    view.init();
    console.log('hi');
  }
}


$( document ).ready( function() { 
  controller.init(); 
} );