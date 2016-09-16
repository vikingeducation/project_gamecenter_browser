var ApplicationView = {
  views: {},
  partials: {},
  $container: null,

  renderView: function(view, data, suppress) {
    var raw = this._view(view);
    var rendered = this.bind(raw, data);
    if (suppress) {
      return rendered;
    }
    // this.$container.empty();
    this.$container.html(rendered);
  },

  renderPartial: function(partial, data) {
    var raw = this._partial(partial);
    var rendered = this.bind(raw, data);
    return rendered;
  },

  bind: function(template, data) {
    for (var key in data) {
      var value = data[key];
      template = template.replace(
        new RegExp('{{\\s?' + key + '\\s?}}', 'ig'),
        value
      );
    }
    return template;
  },

  registerView: function(view, value) {
    this._view(view, value);
  },

  registerPartial: function(partial, value) {
    this._partial(partial, value);
  },

  _view: function(view, value) {
    var split = view.split('/');
    var controller = split[0];
    var view = split[1];
    if (!this.views[controller]) {
      this.views[controller] = {};
    }
    if (value) {
      this.views[controller][view] = value;
    }
    return this.views[controller][view];
  },

  _partial: function(partial, value) {
    var split = partial.split('/');
    var controller = split[0];
    var partial = split[1];
    if (!this.partials[controller]) {
      this.partials[controller] = {};
    }
    if (value) {
      this.partials[controller][partial] = value;
    }
    return this.partials[controller][partial];
  }
};

