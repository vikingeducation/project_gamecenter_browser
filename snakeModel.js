snakeGame.snakeModel = {
  init: function(size) {
    size = size || 0
    this.snakeHead = {
      x: Math.floor(size/2),
      y: Math.floor(size/2),
      d: {x: 0, y: 0}
    };
    this.snakeBody = [];
    this.changes = [];
    this._moveHead(); // Add head to body
  },
  _moveHead: function() {
    return this.snakeBody.unshift( new snakeGame.Coord(this.snakeHead.x, this.snakeHead.y, "snake"));
  },
  _moveTail: function() {
    return this.snakeBody.pop();
  },

  nextPostion: function(){
    return {
      x: this.snakeHead.x + this.snakeHead.d.x,
      y: this.snakeHead.y + this.snakeHead.d.y
    }
  },
  _setNextPosition: function(){
    var pos = this.nextPostion()
    this.snakeHead.x = pos.x
    this.snakeHead.y = pos.y
  },
  move: function(grow) {


    this._setNextPosition()

    this._moveHead();

    // if not "growing"
    var tail;
    if (!grow) {
      tail = this._moveTail();
    }

    return tail;
  },
  changeDirection: function() {
    if(this.changes.length > 0){
      var newDirection = this.changes.shift()
      this.snakeHead.d.x = newDirection.x || 0
      this.snakeHead.d.y = newDirection.y || 0
    }
  },
  addDirChange: function(change){
    if((
        (change.x !== this.snakeHead.d.x) ||
        (change.y !== this.snakeHead.d.y)
      ) &&
      (
        (this.changes.length === 0) ||
        (change.x !== this.changes[this.changes.length-1].x) ||
        (change.y !== this.changes[this.changes.length-1].y))
     ){
       console.log("changed")
     }
      this.changes.push(change)
  },

}
