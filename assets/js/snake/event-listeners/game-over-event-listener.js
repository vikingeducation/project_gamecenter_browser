var GameOverEventListener = {
  selector: document,
  event: 'gameover',

  callback: function(e, data) {
    TickEventEmitter.stop();
    TickEventListener.stop();
    KeyEventListener.stop();
    CollisionEventListener.stop();
  }
};

ApplicationEventListener.register(GameOverEventListener);

