var ApplicationController = {
  register: function(controller) {
    $.extend(controller, this);
  },

  render: function(template, data, suppress) {
    var view = template;
    if (template.indexOf('/') === -1) {
      view = this.templateDirectory + '/' + template;
    }
    return ApplicationView.renderView(view, data);
  }
};

