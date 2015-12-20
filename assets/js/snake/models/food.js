var Food = {
  defaults: {
    type: null,
    points: 1,
    x: 0,
    y: 0,

    setPosition: function() {
      var randomPosition = Game.randomPosition();
      this.x = randomPosition.x;
      this.y = randomPosition.y;
    },

    isCollidingWith: function(object) {
      return (this.x === object.x && this.y === object.y);
    }
  }
};

ApplicationModel.register(Food);

Food.addCallback('after', 'create', 'setFoodPosition', function(food) {
  food.setPosition();
});

