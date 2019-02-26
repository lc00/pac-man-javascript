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

class Grid {
  constructor(startX,startY,width,height,numXCell,numYCell, gridObj ){
    this.x = startX
    this.y = startY
    this.width = width
    this.height = height
    this.numXCell = numXCell
    this.numYCell = numYCell
    this.cells = {
      // '0,0': new Cell
      // '0,50': new Cell
    }
    this.startGrid = gridObj
  }

  createCells() {
    let str, 
      content

    let deltaX = this.width / this.numXCell - 1
    let deltaY = this.height / this.numYCell - 1
    console.log('deltaX', deltaX)
    console.log('deltaY', deltaY)
    for(let y=0; y<this.height; y++){
      for(let x=0; x<this.width; x++) {
        str = '' + x + ',' + y

        if(this.startGrid.hasOwnProperty(str)) {
          content = this.startGrid[str]
        } else {
          content = 'empty'
        }
        this.cells[str] = new Cell(content) 

        x += deltaX
      }
      y += deltaY
    }
  }

  // get cell (x,y) {
    
  // }


}

class Cell {
  constructor(content){
    this.content = content
  }

  // get content () {
  //   return this.content
  // }

  updateContent(content) {
    this.content = content
    // return true
  }
}

// engine
class Engine {
    constructor() {
      this.player = null

      /*
      this.grid = {
        '0,0': '',
        '50,0': ''
      } 
      */



    }

    // setup
    setUp() {
      this.player = new Player(playerInfo.speed, playerInfo.xPos, playerInfo.yPos, playerInfo.direction)
      // this.pellet = new Pellet(20, 500, 100)

      // create grid instances
      this.grid= new Grid(50,50,250,250,5,5, gridObj)
      this.grid.createCells()
      


    
    }  

    // draw
    draw() { 
      // c.clearRect(0, 0, innerWidth, innerHeight)

      // c.beginPath()
      // c.arc(this.player.xPos, this.player.yPos, 20, 0, Math.PI * 2, false)
      // // c.strokeStyle = 'blue'
      // c.fillStyle = 'orange'
      // c.fill()

      // c.beginPath()
      // c.arc(this.pellet.xPos, this.pellet.yPos, this.pellet.size, 0, Math.PI * 2, false)
      // c.fillStyle = 'white'
      // c.fill()
      // c.stroke()

      let cells = this.grid.cells
      for (let cell in cells) {
        if (cells[cell].content === 'wall'){
          let [x, y] = cell.split(',')



          c.beginPath()
          c.fillStyle = 'grey'
          c.fillRect(x, y, 50, 50)
          c.strokeRect(x, y, 50, 50)
          c.stroke()

        }
        else if (cells[cell].content === 'sm-pellet'){
          let [x, y] = cell.split(',')

          c.beginPath()
          // c.fillStyle = 'white'
          let xTemp = Number(x) 
          let yTemp = Number(y)
          xTemp += 25
          yTemp +=25
          c.arc(xTemp,yTemp,10,0,Math.PI*2,false)
          c.strokeRect(x, y, 50, 50)          
          c.stroke()

        }
        else if (cells[cell].content === 'pac-man'){
          let [x, y] = cell.split(',')

          c.beginPath()
          // c.fillStyle = 'white'
          let xTemp = Number(x) 
          let yTemp = Number(y)
          xTemp += 25
          yTemp +=25
          c.arc(xTemp,yTemp,20,0,Math.PI*2,false)
          c.strokeRect(x, y, 50, 50)  
          c.fillStyle = 'orange'
          c.fill()        
          c.stroke()

          // clear previous position in gridObj
          let prevX = this.player.xPos
          let prevY = this.player.yPos
          let str = '' + prevX + prevY
          cells[cell].content = 'empty'

          // update state
          this.player.xPos = x  
          this.player.yPos = y
        } 
        else {
          console.log(' in else...')
        }    
          
      }


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


let gridObj = {
  '0,0': 'sm-pellet',
  '50,0': 'sm-pellet',
  '100,0': 'sm-pellet',
  '150,0': 'sm-pellet',
  '200,0': 'sm-pellet',

  '0,50': 'sm-pellet',
  '50,50': 'wall',
  '100,50': 'wall',
  '150,50': 'wall',
  '200,50': 'sm-pellet',

  '0,100': 'sm-pellet',
  '50,100': 'wall',
  '100,100': 'wall',
  '150,100': 'wall',
  '200,100': 'sm-pellet',

  '0,150': 'sm-pellet',
  '50,150': 'wall',
  '100,150': 'wall',
  '150,150': 'wall',
  '200,150': 'sm-pellet',

  '0,200': 'sm-pellet',
  '50,200': 'sm-pellet',
  '100,200': 'pac-man',
  '150,200': 'sm-pellet',
  '200,200': 'sm-pellet'
}

let engine = new Engine() 
engine.setUp()
// engine.listen()
engine.draw()
// // engine.update()
// animation()


