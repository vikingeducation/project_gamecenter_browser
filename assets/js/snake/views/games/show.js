var view = '<div data-player-id="{{ playerId }}">' +
  '{{ score }}' +
'</div>' +
'<div id="games-show" data-game-id="{{ gameId }}" data-snake-id="{{ snakeId }}">' +
  '{{ snake }}' +
  '{{ food }}' +
'</div>' +
'<div id="collected-foods" class="clearfix"></div>';

ApplicationView.registerView('games/show', view);

