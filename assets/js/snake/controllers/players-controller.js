var PlayersController = {
  update: function(id, data) {
    var player = Player.find(id);
    player.update(data);
  }
};

ApplicationController.register(PlayersController);

