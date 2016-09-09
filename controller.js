
var controller = {
  init: function(){
    this.view = view;
    this.model = model;
    this.view.init();
    this.model.init(parseInt(this.view.gridSize));
    var coords = {
      snake: this.model.snake.body,
      food: this.model.food
    }
    view.render(coords);
  }
}