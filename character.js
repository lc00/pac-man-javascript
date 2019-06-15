class Character {
  constructor(speed, color, isLive) {
      this.speed = speed
      this.color = color
      this.isLive = true
  }

  get position () {
      return {
          xPos: this.xPos,
          yPos: this.yPos
      }
  }

  // pac-man can only move to a cell that
  // has either pellet or empty cell
  // so it checks the next cell that's in 
  // the direction and see if it has pellet or is empty 
  // if yes, it's move-able, 
  // else stop in the current cell
  move(direction) {
      // let str = this.xPos + ',' + this.yPos
      
      // temp
      let deltaX = 50
      let deltaY = 50
      let cell
      switch (direction) {
          case 'left':
            this.xPos -= this.speed
            break
          case 'right':
            this.xPos += this.speed
            break
          case 'up':
            this.yPos -= this.speed
            break
          case 'down':
            this.yPos += this.speed
            break
          case 'stop':
            break
      }

      
      return {
          xPos: this.xPos,
          yPos: this.yPos
      }
  }
}

