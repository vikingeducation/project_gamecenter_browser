var Application = {
  init: function(options) {
    ApplicationView.$container = $(options['container']);
    GamesController.make();
  }
};

