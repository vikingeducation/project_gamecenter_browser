var CollisionEventEmitter = {
  selector: document,
  event: 'collision',
  
  emit: function() {
    var snakeId = $('div[data-snake-id]').attr('data-snake-id');
    var snake = Snake.find(snakeId);
    var data;
    if (snake.isSelfColliding()) {
      data = {
        a: snake,
        b: snake
      };
    }
    if (data) {
      $(CollisionEventEmitter.selector)
        .trigger(CollisionEventEmitter.event, data);
    }
  }
};

ApplicationEventEmitter.register(CollisionEventEmitter);

