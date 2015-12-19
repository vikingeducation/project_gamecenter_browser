var TickEventEmitter = {
  selector: document,
  event: 'tick',
  speed: 1000,
  method: 'interval',
  
  emit: function() {
    var delta = (window.performance) ? window.performance.now() : Date.now();
    $(document).trigger(TickEventEmitter.event, {delta: delta});
  }
};

ApplicationEventEmitter.register(TickEventEmitter);

