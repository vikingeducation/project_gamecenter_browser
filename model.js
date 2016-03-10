var model = {

  max: 30,
  board: [],

  generateNewBoard: function() {
    this.board = new Array(this.max);
    for (var i = 0; i < this.max; i++) {
      this.board[i] = new Array(this.max);
    }
  },

  getBoard: function() {
    return this.board;
  }

};
