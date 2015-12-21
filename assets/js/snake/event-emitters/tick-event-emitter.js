var TickEventEmitter = {
  SPEED: 250,

  selector: document,
  event: 'tick',
  speed: 250,
  
  emit: function() {
    $(TickEventEmitter.selector)
      .trigger(TickEventEmitter.event);
    TickEventEmitter.start();
  },

  resetSpeed: function() {
    this.speed = this.SPEED;
  },

  decrementSpeed: function() {
    this.speed -= 5;
  }
};

ApplicationEventEmitter.register(TickEventEmitter);

