var Food = {
  defaults: {
    type: null,
    points: 1,
    x: 0,
    y: 0,
    isCollected: false,
    game: null,

    setPosition: function() {
      var randomPosition = Game.randomPosition();
      this.x = randomPosition.x;
      this.y = randomPosition.y;
    },

    isCollidingWith: function(object) {
      return (this.x === object.x && this.y === object.y);
    }
  },

  collected: function() {
    return this.where(function(food) {
      return food.isCollected;
    });
  },

  uncollected: function() {
    return this.where(function(food) {
      return !food.isCollected;
    });
  }
};

ApplicationModel.register(Food);

Food.addCallback('after', 'create', 'setFoodPosition', function(food) {
  food.setPosition();
});

Food.addCallback('after', 'update', 'collectFood', function(food) {
  if (food.isCollected) {
    var game = Game.find(food.game.id);
    var food = Food.create({
      game: game,
      points: game.foods.length
    });
    game.foods.push(food);
    game.snake.grow();
    console.log(game);
  }
});

