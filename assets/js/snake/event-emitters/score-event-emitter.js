var ScoreEventEmitter = {
  selector: document,
  event: 'score',

  emit: function() {
    var foodId = $('#games-show div[data-food-id]').attr('data-food-id');
    var food = Food.find(foodId);
    var data = {
      foodId: food.id,
      points: food.points
    };
    $(ScoreEventEmitter.selector)
      .trigger(ScoreEventEmitter.event, data);
  }
};

ApplicationEventEmitter.register(ScoreEventEmitter);

