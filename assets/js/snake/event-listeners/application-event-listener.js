var ApplicationEventListener = {
  register: function(eventListener) {
    $.extend(eventListener, this);
  },

  start: function() {
    $(this.selector).on(this.event, this.callback);
  },
  
  stop: function() {
    $(this.selector).off(this.event);
  },

  addEventListener: function(listener) {
    $(this.selector).bind(this.event, listener);
  },

  removeEventListener: function(listener) {
    $(this.selector).unbind(this.event, listener);
  },

  removeAll: function() {
    $(this.selector).unbind(this.event);
  }
};

