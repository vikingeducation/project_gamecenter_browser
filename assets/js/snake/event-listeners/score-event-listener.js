var ScoreEventListener = {
  selector: document,
  event: 'score',

  callback: function(e, data) {
    var playerId = $('div[data-player-id]').attr('data-player-id');
    var player = Player.find(playerId);
    var score = player.score + data.points;

    PlayersController.update(playerId, {
      score: score
    });

    TickEventEmitter.decrementSpeed();

    $('#score').text('Score: ' + score);
  }
};

ApplicationEventListener.register(ScoreEventListener);

