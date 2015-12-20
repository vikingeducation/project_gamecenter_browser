var CollisionEventListener = {
  selector: document,
  event: 'collision',

  callback: function(e, data) {
    var a = data.a;
    var b = data.b;
    if (a._model === Snake && b._model === Snake) {
      GameOverEventEmitter.start();
    }
    if (a._model === Snake && b._model === Food) {
      ScoreEventEmitter.start();
    }
  }
};

ApplicationEventListener.register(CollisionEventListener);

