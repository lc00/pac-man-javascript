class Player extends Character{
    constructor(speed, xPos, yPos, direction) {
        super(speed)
        this.xPos = xPos
        this.yPos = yPos
        this.direction = direction
        this.userDirectionInput = null
    }
  
    eat() {
  
    }
  
    isAtCenter() {
      let result
  
      switch (this.direction) {
          case 'left':
          case 'right':
              result = this.xPos % 50 === 0 ? true : false
              // console.log('isAtCenter, L or R', result)
              return result
            break
          case 'up':
          case 'down':
              result = this.yPos % 50 === 0 ? true : false
              // console.log('isAtCenter, U or D', result)
              return result
            break
          default:
            return null
            break
      }
    }
  }