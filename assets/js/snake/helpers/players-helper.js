var PlayersHelper = {
  renderScore: function(player) {
    return partial('players/score', {score: player.score});
  }
};

ApplicationHelper.register(PlayersHelper);

