var TickEventEmitter = {
  selector: document,
  event: 'tick',
  speed: 200,
  method: 'interval',
  
  emit: function() {
    $(TickEventEmitter.selector)
      .trigger(TickEventEmitter.event);
  }
};

ApplicationEventEmitter.register(TickEventEmitter);

