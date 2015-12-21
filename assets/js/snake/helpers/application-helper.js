var ApplicationHelper = {
  register: function(helper) {
    $.extend(window, helper);
  },

  partial: function(template, data) {
    return ApplicationView.renderPartial(template, data);
  },

  pause: function() {
    TickEventEmitter.stop();
  },

  start: function() {
    TickEventEmitter.start();
  },

  gameover: function() {
    GameOverEventEmitter.start();
  }
};

ApplicationHelper.register(ApplicationHelper);

