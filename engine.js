// import {Player} from './player'
// const {Player} = require('./player.js')

let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let c = canvas.getContext('2d')

const pauseTime = 5000
let direction

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
          case 'stop':
              break
      }

      if(this.xPos >= innerWidth) {
        this.xPos -= this.speed
      } else if (this.xPos <= 0) {
        this.xPos += this.speed 
      } 
      if(this.yPos >= innerHeight) {
        this.yPos -= this.speed
      } else if (this.yPos <= 0) {
        this.yPos += this.speed 
      } 

      return {
          xPos: this.xPos,
          yPos: this.yPos
      }
  }
}

class Player extends Character{
  constructor(speed, xPos, yPos, direction) {
      super(speed)
      this.xPos = xPos
      this.yPos = yPos
      this.direction = direction
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
      this.player = new Player(10, 200, 200, 'right')
      
    
    }  

    // draw
    draw() { 
      // c.clearRect(0, 0, innerWidth, innerHeight)

      c.beginPath()
      c.arc(this.player.xPos, this.player.yPos, 30, 0, Math.PI * 2, false)
      // c.strokeStyle = 'blue'
      c.fillStyle = 'orange'
      c.fill()
      c.stroke()
    }

    // let arr = []

    update() {
      // c.clearRect(0, 0, innerWidth, innerHeight)

      // udpate position for player
      document.addEventListener('keydown', async(e) => { 
        console.log('e.code.....', e.code)

        switch (e.code) {
          case 'ArrowRight':
            this.player.direction = 'right'
            break  
          case 'ArrowLeft':
            this.player.direction = 'left'
            break
          case 'ArrowUp':
            this.player.direction = 'up'
            break
          case 'ArrowDown':
            this.player.direction = 'down'
            break
          case 'Escape':
          case 'KeyS':
          case 'Enter':
            this.player.direction = 'stop'
            break
          default:
            break   
        }
      })

      let pos 
      // update position for pac-man
      pos = this.player.move(this.player.direction)
      this.player.xPos = pos.xPos
      this.player.yPos = pos.yPos
      console.log(`xPos: ${this.player.xPos}, yPos: ${this.player.yPos}`)
    
      

      this.draw()






      // c.clearRect(0, 0, innerWidth, innerHeight)
      // requestAnimationFrame(update)

      
  
      // for(let i=0; i<arr.length; i++) {
      //     console.log('circle', i, arr[i])
      //     arr[i].update() 
      // }
        
      // update position for ghost
    
    
      // update position for other objects
    
      
      // this.draw()
      
      }

    

}

function animation() {
  c.clearRect(0, 0, innerWidth, innerHeight)

  requestAnimationFrame(animation)

  engine.update()

}




let engine = new Engine() 
engine.setUp()
// engine.draw()
engine.update()
animation()