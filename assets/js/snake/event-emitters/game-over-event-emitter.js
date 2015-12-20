var GameOverEventEmitter = {
  selector: document,
  event: 'gameover',

  emit: function() {
    $(GameOverEventEmitter.selector)
      .trigger(GameOverEventEmitter.event);
  }
};

ApplicationEventEmitter.register(GameOverEventEmitter);

