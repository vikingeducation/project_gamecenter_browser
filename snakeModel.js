snakeGame.snakeModel = {
  init: function() {
    this.moveHead(); // Add head to body
  },
  moveHead: function() {
    return this.snakeBody.unshift( new snakeGame.Coord(this.headVector.x, this.headVector.y, "snake"));
  },
  moveTail: function() {
    return this.snakeBody.pop();
  },
  headVector: {
    x: 0,
    y: 0,
    d: {x: 1, y: 0}
  },
  move: function(grow) {
    this.headVector[x] += this.headVector.d.x
    this.headVector[y] += this.headVector.d.y

    this.moveHead();

    // if not "growing"
    var tail;
    if (!grow) {
      tail = this.moveTail();
    }

    return [this.headVector, tail]
  },
  changeDirection: function(newDirection) {
    this.headVector.d.x = newDirection.x || this.headVector.d.x
    this.headVector.d.y = newDirection.y || this.headVector.d.y
  },
  snakeBody: []
}
