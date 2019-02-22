// import {Player} from './player'
// const {Player} = require('./player.js')

let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let c = canvas.getContext('2d')

const pauseTime = 0
let direction
let speed = 5

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
      this.player = new Player(speed, 200, 200, 'right')
      
    
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
     

      let pos 

      // update position for pac-man
      pos = this.player.move(this.player.direction)
      this.player.xPos = pos.xPos
      this.player.yPos = pos.yPos
      console.log(`xPos: ${this.player.xPos}, yPos: ${this.player.yPos}`)
    
      this.draw()      
      }

    listen(){
      document.addEventListener('keydown', async(e) => { 
        console.log('e.code.....', e.code)

        switch (e.code) {
          case 'ArrowRight':
            if(this.player.direction !== 'right'){
              this.player.direction = 'stop'
              await pause()              
              this.player.direction = 'right'
            }
            break  
          case 'ArrowLeft':
            if(this.player.direction !== 'left'){
              this.player.direction = 'stop'
              await pause()
              this.player.direction = 'left'
            }
            break
          case 'ArrowUp':
            if(this.player.direction !== 'up'){
              this.player.direction = 'stop'
              await pause()
              this.player.direction = 'up'
            }            
            break
          case 'ArrowDown':
            if(this.player.direction !== 'down'){
              this.player.direction = 'stop'
              await pause()
              this.player.direction = 'down'
            }            
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
    }
}

function animation() {
  c.clearRect(0, 0, innerWidth, innerHeight)

  requestAnimationFrame(animation)

  engine.update()

}

let engine = new Engine() 
engine.setUp()
engine.listen()
// engine.draw()
// engine.update()
animation()