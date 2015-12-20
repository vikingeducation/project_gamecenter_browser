var ApplicationModel = {
  register: function(model) {
    model._table = [];
    model._callbacks = {};
    $.extend(model, this);
  },

  all: function() {
    return this._table;
  },

  first: function() {
    return this._table[0];
  },

  last: function() {
    return this._table[this._table.length - 1];
  },

  sample: function() {
    var id = ~~(Math.random() * 100) % this._table.length;
    return this._table[id];
  },

  make: function(attributes) {
    this._fireCallbacks('before', 'make', attributes);
    var defaultsClone = $.extend({}, this.defaults);
    var object = $.extend(defaultsClone, attributes);
    object = $.extend(object, this._publicInstanceVariables);
    object = $.extend(object, this._privateInstanceVariables);
    object = $.extend(object, this._publicInstanceMethods);
    object._model = this;
    this._fireCallbacks('after', 'make', object);
    return object;
  },

  create: function(attributes) {
    this._fireCallbacks('before', 'create', attributes);
    var object = this.make(attributes);
    object.save();
    this._fireCallbacks('after', 'create', object);
    return object;
  },

  find: function(id) {
    return this._table[~~id];
  },

  updateAll: function(attributes) {
    this._table.forEach(function(object) {
      object.update(attributes);
    });
  },

  destroyAll: function() {
    this._table = [];
  },

  where: function(func) {
    var results = [];
    this._table.forEach(function(element, index) {
      if (func(element, index)) {
        results.push(element);
      }
    });
    return results;
  },

  addCallback: function(action, filter, key, func) {
    if (!this._callbacks[action]) {
      this._callbacks[action] = {};
    }
    if (!this._callbacks[action][filter]) {
      this._callbacks[action][filter] = {};
    }
    this._callbacks[action][filter][key] = func;
  },

  removeCallback: function(action, filter, key) {
    delete this._callbacks[action][filter][key];
  },

  _fireCallbacks: function(action, filter, object) {
    if (this._callbacks[action] && this._callbacks[action][filter]) {
      var callbackName = action + '.' + filter + '.';

      for (var key in this._callbacks[action][filter]) {
        console.log('Firing callback: ' + callbackName + key, object);

        this._callbacks[action][filter][key](object);
        
        console.log('Finished: ' + callbackName + key, object);
      }
    }
    return object;
  },

  _publicInstanceVariables: {
    id: null,
  },

  _privateInstanceVariables: {
    _model: null
  },

  _publicInstanceMethods: {
    save: function() {
      this._model._fireCallbacks('before', 'save', this);
      this.id = (this.id === null) ? this._model._table.length : this.id;
      if (!this._model._table[this.id]) {
        this._model._table.push(this);
      }
      this._model._fireCallbacks('after', 'save', this);
      return this;
    },

    update: function(attributes) {
      this._model._fireCallbacks('before', 'update', this);
      for (var key in attributes) {
        this._model._table[~~this.id][key] = attributes[key];
      }
      this._model._fireCallbacks('after', 'update', this);
      return this;
    },

    destroy: function() {
      this._model._fireCallbacks('before', 'destroy', this);
      this._model._table.splice(~~this.id, 1);
      this._model._fireCallbacks('after', 'destroy', this);
      return this;
    }
  }
};


