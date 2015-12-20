var ApplicationHelper = {
  register: function(helper) {
    $.extend(window, helper);
  },

  partial: function(template, data) {
    return ApplicationView.renderPartial(template, data);
  }
};

window.partial = ApplicationHelper.partial;

