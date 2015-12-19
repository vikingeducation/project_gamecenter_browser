var ApplicationHelper = {
  registerHelper: function(helper) {
    $.extend(window, helper);
  },

  partial: function(template, data) {
    return ApplicationView.renderPartial(template, data);
  }
};

ApplicationHelper.registerHelper(ApplicationHelper);

