var ScoreEventListener = {
  selector: document,
  event: 'score',

  callback: function(e, data) {
    var playerId = $('div[data-player-id]').attr('data-player-id');
    var player = Player.find(playerId);
    var score = player.score + data.points;
    console.log(player, data);
    PlayersController.update(playerId, {
      score: score
    });

    $('#score').text('Score: ' + score);
  }
};

ApplicationEventListener.register(ScoreEventListener);

