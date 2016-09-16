var FoodsHelper = {
  renderFoods: function(foods) {
    var rendered = '';
    foods.forEach(function(food) {
      if (!food.isCollected) {
        rendered += renderFood(food);
      }
    });
    return rendered;
  },

  renderFood: function(food) {
    var data = {
      foodId: food.id
    };
    return partial('foods/food', data);
  },

  positionFood: function(food) {
    var $food = $('#games-show div[data-food-id="' + food.id + '"]');
    if (food.isCollected) {
      $food
        .removeAttr('style')
        .detach();
      $food.appendTo('#collected-foods');
    } else {
      $food.css({
        top: food.y + 'px',
        left: food.x + 'px'
      });
    }
  },

  removeAllFoods: function() {
    $('#games-show div[data-food-id]').remove();
    $('#collected-foods div[data-food-id]').remove();
  }
};

ApplicationHelper.register(FoodsHelper);

