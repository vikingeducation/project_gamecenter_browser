var ApplicationEventEmitter = {
  _id: null,

  register: function(eventEmitter) {
    eventEmitter.speed = (eventEmitter.speed) ? eventEmitter.speed : 0;
    $.extend(eventEmitter, this);
  },

  start: function() {
    this._id = this._startMethod();
  },
  
  stop: function() {
    this._stopMethod();
  },

  addEventListener: function(listener) {
    $(this.selector).bind(this.event, listener);
  },

  removeEventListener: function(listener) {
    $(this.selector).unbind(this.event, listener);
  },

  removeAll: function() {
    $(this.selector).unbind(this.event);
  },

  _startMethod: function() {
    var method = (this.method === 'interval') ? setInterval : setTimeout;
    return method(this.emit, this.speed);
  },

  _stopMethod: function(id) {
    var method =  (this.method === 'interval') ? clearInterval : clearTimeout;
    method(this._id);
  }
};

