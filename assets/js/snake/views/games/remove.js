var view = '<div id="games-remove" class="text-center">' +
  '<h1>' +
    'Game Over! ' +
    '<a href="#" data-event-listener="play">' +
      'Play Again?' +
    '</a>' +
  '</h1>' +
'</div>';

ApplicationView.registerView('games/remove', view);

