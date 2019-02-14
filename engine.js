// import {Player} from './player'
// const {Player} = require('./player.js')


// returns the root element of the html
const rootEl = document.documentElement;

// returns the style or css of the root element
const docStyle = rootEl.style



class Character {
  constructor(speed) {
      this.speed = speed
  }

  get position () {
      return {
          xPos: this.xPos,
          yPos: this.yPos
      }
  }

  move(direction) {
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
      }
      
      return {
          xPos: this.xPos,
          yPos: this.yPos
      }
  }
}

class Player extends Character{
  constructor(speed, xPos, yPos) {
      super(speed)
      this.xPos = xPos
      this.yPos = yPos
  }

  eat() {

  }
}

function pause() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1)
  })
}


// engine
class Engine {
    constructor() {
      this.player = null

    }

    // setup
    setUp() {
      this.player = new Player(1, 500, 200)
      
    
    }  

    // draw
    draw() {}

    // update every frame;
    // infinite loop
    async update() {
      // todo set up a while loop

      let direction


      document.addEventListener('keydown', function(e){ 
        console.log('e.code.....', e.code)

        switch (e.code) {
          case 'ArrowRight':
            direction = 'right'
            break  
          case 'ArrowLeft':
            direction = 'left'
            break
          case 'ArrowUp':
            direction = 'up'
            break
          case 'ArrowDown':
            direction = 'down'
            break
          default:
            break   
        }
      })



      // let direction = 'left'

        let pos 
        // update position for pac-man
        while (true) {

          await pause()

          
          pos = this.player.move(direction)
          this.player.xPos = pos.xPos
          this.player.yPos = pos.yPos
          console.log(`xPos: ${this.player.xPos}, yPos: ${this.player.yPos}`)
        
          docStyle.setProperty('--mouse-x', pos.xPos);
          docStyle.setProperty('--mouse-y', pos.yPos);
        
     
        }
        
        
      // update position for ghost
    
    
      // update position for other objects
    
    
      }
    

}

let engine = new Engine() 
engine.setUp()
engine.update()