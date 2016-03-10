var model = {

  max: 40,
  board: [],

  init: function() {

  },

  generateNewBoard: function() {
    board = new Array(max);
    for (var i = 0; i < max; i++) {
      board[i] = new Array(max);
    }
  }

};
