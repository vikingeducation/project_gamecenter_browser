var PlayEventListener = {
  selector: 'a[data-event-listener="play"]',
  event: 'click',

  callback: function(e) {
    e.preventDefault();
    GamesController.create();
    return false;
  }
};

ApplicationEventListener.register(PlayEventListener);

