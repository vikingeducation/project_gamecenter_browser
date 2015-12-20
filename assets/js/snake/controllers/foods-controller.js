var FoodsController = {
  update: function(id, data) {
    var food = Food.find(id);
    food.update(data);
  }
};

ApplicationController.register(FoodsController);

