var CollisionEventListener = {
  selector: document,
  event: 'collision',

  callback: function(e, data) {
    var a = data.a;
    var b = data.b;
    if (a._model === Snake && b._model === Snake) {
      GameOverEventEmitter.start();
    }
  }
};

ApplicationEventListener.register(CollisionEventListener);

