var model = {

  grid: [new Array(8),
         new Array(8),
         new Array(8),
         new Array(8),
         new Array(8),
         new Array(8),
         new Array(8),
         new Array(8) ],

  setUpBoard: function(){
    this.grid[4][4] = 2;
    this.grid[7][2] = 1;
  },

  moveSnake: function(){
    var coords = this.findHead();

    var row = coords[0];
    var col = coords[1];

    this.removeSegment(row, col);

    //for now just move up one without input
    this.addSegment(row - 1, col, 1);
    //will try to assign undefined property col idx of undedined row when off 
    //the board 
  },

  removeSegment: function(row, col){
    this.grid[row][col] = 0;
  },

  addSegment: function(row, col, segValue){
    this.grid[row][col] = segValue;
  },

  findHead: function(){
    var headRow = undefined;
    var headCol = undefined;

    for(var row = 0; row < 8; row++){
      if(this.grid[row].indexOf(1) !== -1){
        headRow = row;
        headCol = this.grid[row].indexOf(1);
      }
    }

    return [headRow, headCol];
  }

  

}