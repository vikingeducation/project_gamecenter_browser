var TickEventEmitter = {
  selector: document,
  event: 'tick',
  speed: 200,
  method: 'interval',
  
  emit: function() {
    var delta = (window.performance) ? window.performance.now() : Date.now();
    $(TickEventEmitter.selector)
      .trigger(TickEventEmitter.event, {delta: delta});
  }
};

ApplicationEventEmitter.register(TickEventEmitter);

