// import {Player} from './player'
// const {Player} = require('./player.js')

let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let c = canvas.getContext('2d')

const playerInfo = {
  speed: 1,
  xPos: 100,
  yPos: 100,
  radius: 20,
  direction: 'right'
}

const pauseTime = 0
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

class Pellet {
  constructor(size, xPos, yPos) {
    this.size = size
    this.xPos = xPos
    this.yPos = yPos
  }
}

// engine
class Engine {
    constructor() {
      this.player = null

    }

    // setup
    setUp() {
      this.player = new Player(playerInfo.speed, playerInfo.xPos, playerInfo.yPos, playerInfo.direction)
      this.pellet = new Pellet(20, 500, 100)
    
    }  

    // draw
    draw() { 
      // c.clearRect(0, 0, innerWidth, innerHeight)

      c.beginPath()
      c.arc(this.player.xPos, this.player.yPos, 20, 0, Math.PI * 2, false)
      // c.strokeStyle = 'blue'
      c.fillStyle = 'orange'
      c.fill()

      c.beginPath()
      c.arc(this.pellet.xPos, this.pellet.yPos, this.pellet.size, 0, Math.PI * 2, false)
      c.fillStyle = 'white'
      c.fill()
      c.stroke()
    }
    
    collisionDetection() {
      if ( this.player.xPos < this.pellet.xPos && this.player.xPos + 40 >= this.pellet.xPos 
        && this.player.yPos + 40 > this.pellet.yPos && this.player.yPos <= this.pellet.yPos ){
          console.log(`player eats pellet`)
        }
      if ( this.player.xPos < this.pellet.xPos && this.player.xPos + 40 >= this.pellet.xPos
        && this.player.yPos + 40 >= this.pellet.yPos && this.player.yPos < this.pellet.yPos ){
          console.log(`player eats pellet`)
      }
       if(this.player.xPos <= this.pellet.xPos + 20 && this.player.xPos + 40 > this.pellet.xPos
        && this.player.yPos + 40 > this.pellet.yPos && this.player.yPos <= this.pellet.yPos ){
          console.log(`player eats pellet`)
       }
       if(this.player.xPos <= this.pellet.xPos + 20 && this.player.xPos + 40 > this.pellet.xPos
        && this.player.yPos + 40 >= this.pellet.yPos && this.player.yPos < this.pellet.yPos ){
          console.log(`player eats pellet`)
       }
    }

    update() {
      // c.clearRect(0, 0, innerWidth, innerHeight)

      // udpate position for player
     

      let pos 

      // update position for pac-man
      pos = this.player.move(this.player.direction)
      this.player.xPos = pos.xPos
      this.player.yPos = pos.yPos
      console.log(`xPos: ${this.player.xPos}, yPos: ${this.player.yPos}`)

      this.collisionDetection()
    
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
engine.draw()
// engine.update()
animation()