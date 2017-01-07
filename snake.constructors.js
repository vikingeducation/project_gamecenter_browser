snakeGame.Coord = function(x,y, value) {
  this.x = x;
  this.y = y;
  this.value = value || null;
  this.toPropKey = function(){
    return this.x + "_" + this.y;
  }
}

snakeGame.TouchListener = function(el, cb, remove) {
  if(!(this instanceof snakeGame.TouchListener)){
    return new snakeGame.TouchListener(el, cb, remove)
  }
  var startX, startY,
      distX, distY,
      dist, threshold = 150,
      elapsedTime, startTime,
      allowedTime = 500,
      self = this;

  this.touchStart = function(e){
    var touchobj = e.changedTouches[0];
    dist = 0;
    startX = touchobj.pageX;
    startY = touchobj.pageY;
    startTime = new Date().getTime(); // record time when finger first makes contact with surface
    e.preventDefault();
  }

  this.touchMove = function(e){
    e.preventDefault(); // prevent scrolling when inside el
  }

  this.touchEnd = function(e){
    var touchobj = e.changedTouches[0];
    distX = touchobj.pageX - startX; // get total dist in X direction
    distY = touchobj.pageY - startY;// get total dist in Y direction
    dist = Math.max(Math.abs(distX), Math.abs(distY)) //get farther distance between x and y
    elapsedTime = new Date().getTime() - startTime // get time elapsed

    // check that elapsed time is within specified, and distance is farther than threshold
    if ((elapsedTime <= allowedTime) && (dist > threshold)){
      if(remove){
        el.removeEventListener('touchstart', self.touchStart);
        el.removeEventListener('touchmove', self.touchMove);
        el.removeEventListener('touchend', self.touchEnd);
      }
      if(Math.abs(distX) > Math.abs(distY)){
        cb((distX < 0 ? "left": "right"))
      } else {
        cb((distY < 0 ? "up" : "down"))
      }
    }
  }

  el.addEventListener('touchstart', this.touchStart, false)

  el.addEventListener('touchmove', this.touchMove, false)

  el.addEventListener('touchend', this.touchEnd, false)
}

snakeGame.KeyboardListener = function(cb, remove){
  if(!(this instanceof snakeGame.KeyboardListener)){
    return new snakeGame.KeyboardListener(cb, remove)
  }
  var self = this;
  this.listener = function(e){
    var dir = {
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      65: "left", // a
      87: "up",// w
      83: "down",// s
      68: "right",// d
    }[e.which || e.keyCode]
    if(dir){
      if(remove){
        document.removeEventListener('keyup', self.listener);
      }
      cb(dir);
    }
  }
  document.addEventListener('keyup', this.listener);
}

snakeGame.ButtonListener = function(el, cb, remove){
  if(!(this instanceof snakeGame.ButtonListener)){
    return new snakeGame.ButtonListener(el, cb, remove)
  }
  var self = this;
  this.listener = function(e){
    var dir = e.target.getAttribute('direction')
    if(dir){
      if(remove){
        document.removeEventListener('click', self.listener);
        document.removeEventListener('touchstart', self.listener);
      }
      cb(dir);
    }
  }
  document.addEventListener('click', this.listener);
  document.addEventListener('touchstart', this.listener);
}
