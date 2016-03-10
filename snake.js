$( document ).ready(function(){

  controller.init();
  view.init();

  while(1===1){

    setTimeout(controller.moveTheSnake(), 2000);
  }
})
