// import {Player} from './player'
// const {Player} = require('./player.js')

let canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
let c = canvas.getContext('2d')
const pauseTime = 1000

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
    }, pauseTime)
  })
}

// engine
class Engine {
    constructor() {
      this.player = null

    }

    // setup
    setUp() {
      this.player = new Player(10, 0, 0)
      
    
    }  

    // draw
    draw() {

      let direction

      document.addEventListener('keydown', e => { 
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
          case 'Escape':
          case 'KeyS':
          case 'Enter':
            direction = 'stop'
            break
          default:
            break   
        }

        let pos 
        // update position for pac-man
        while (true) {
        // await pause()

          if(direction === 'stop')
            break

          pos = this.player.move(direction)
          this.player.xPos = pos.xPos
          this.player.yPos = pos.yPos
          console.log(`xPos: ${this.player.xPos}, yPos: ${this.player.yPos}`)
        
          
        
        }
      })

      c.beginPath()
      c.arc(this.player.xPos, this.player.yPos, 30, 0, Math.PI * 2, false)
      // c.strokeStyle = 'blue'
      c.fillStyle = 'orange'
      c.fill()
      c.stroke()
    }

    // let arr = []
    update() {
      // udpate position for player
      // c.clearRect(0, 0, innerWidth, innerHeight)
      // requestAnimationFrame(update)

      
  
      // for(let i=0; i<arr.length; i++) {
      //     console.log('circle', i, arr[i])
      //     arr[i].update() 
      // }
        
      // update position for ghost
    
    
      // update position for other objects
    
      
      this.draw()
      
      }

    

}




let engine = new Engine() 
engine.setUp()
// engine.update()

engine.animate()