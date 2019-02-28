// import {Player} from './player'
// const {Player} = require('./player.js')

let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let c = canvas.getContext('2d')

const playerInfo = {
  speed: 1,
  xPos: 100,
  yPos: 200,
  radius: 25,
  direction: 'right'
}

const pauseTime = 100
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

class Player extends Character{
  constructor(speed, xPos, yPos, direction) {
      super(speed)
      this.xPos = xPos
      this.yPos = yPos
      this.direction = direction
  }

  eat() {

  }

  isAtCenter() {
    return this.xPos % 50 === 0 ? true : false
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

  setUp () {
    this.createCells()
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

          // if(content === 'pac-man') {
          //   this.player = new Player(playerInfo.speed, x, y, playerInfo.direction)    


          // // clear previous position in gridObj
          // // let prevX = this.player.xPos
          // // let prevY = this.player.yPos
          // // let str = '' + prevX + prevY
          // // cells[cell].content = 'empty'

          // // update state
          // // this.player.xPos = x  
          // // this.player.yPos = y
          // }
        } else {
          content = 'empty'
        }
        this.cells[str] = new Cell(content) 

        x += deltaX
      }
      y += deltaY
    }
  }

  getCell (x,y) {
    let str = '' + x + ',' + y

    if(this.cells.hasOwnProperty(str))
      return this.cells[str]
    else {
      return false
    }
  }


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
      // this.pellet = new Pellet(20, 500, 100)

      // create grid instances
      this.grid= new Grid(50,50,250,250,5,5, gridObj)
      this.grid.setUp()

      this.player = new Player(playerInfo.speed, playerInfo.xPos, playerInfo.yPos, playerInfo.direction)    

    
    }  

    // draw
    draw() { 
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
        else if (cells[cell].content === 'empty'){
          let [x, y] = cell.split(',')

          c.beginPath()
          c.strokeRect(x, y, 50, 50)  
         

        } 
        else {
          console.log(' in else...')
        }    
          
      }

      // draw pac-man
          c.beginPath()
          let xTemp = this.player.xPos 
          let yTemp = this.player.yPos
          xTemp += playerInfo.radius
          yTemp += playerInfo.radius
          c.arc(xTemp,yTemp,playerInfo.radius,0,Math.PI*2,false)
          c.strokeRect(this.player.xPos, this.player.yPos, 50, 50)  
          c.fillStyle = 'orange'
          c.fill()        
          c.stroke()      


    }
    
    // if player and pellet collides
    //  pellet is eaten: 
    //    getCell from grid
    //    updateCellContent
    //  
    //  score gets updated
    collisionDetection() {
      // this.pellet = this.grid.cells[]

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

    decide (direction) {
      let deltaX = 50
      let deltaY = 50
      let cell
      
      switch (direction) {
        case 'left':
          cell = this.grid.getCell(this.player.xPos - deltaX, this.player.yPos)
          if(cell && cell.content !== 'wall')
            return cell
          break
        case 'right':
          cell = this.grid.getCell(this.player.xPos + deltaX, this.player.yPos)
          if(cell && cell.content !== 'wall')
            return cell
          break
        case 'up':
          cell = this.grid.getCell(this.player.xPos, this.player.yPos - deltaY)
          if(cell && cell.content !== 'wall')
            return cell
          break
        case 'down':
          cell = this.grid.getCell(this.player.xPos, this.player.yPos + deltaY)
          if(cell && cell.content !== 'wall')
            return cell
          break
        case 'stop':
          return false
    }
    }

    update() {
      c.clearRect(0, 0, innerWidth, innerHeight)

      // udpate position for player
     

      let pos 
      // update position for pac-man   
        
        /* is at the center of a cell
            if yes               
              tempDirection !== null
                if yes, use tempDirection to check the next cell content
                    if movable, currentDirection = tempDirection
                else, use currentDirection to check the next cell content
                    if movable, moveable = true
            else

                tempDirection !== null
                    if yes, 
                        check if tempDirection and currentDirection are in the 
                        same array:[left, right], [up, down]
                            if yes, use tempDirection to check the next cell content
                    else, use currentDirection to check the next cell content

               
            
          if movable
            move
          else, stop

      */

    let isMoveAble = false
    /* is at the center
        yes,
    */
   let isAtCenter = this.player.isAtCenter()
   let deltaX = this.grid.width / this.grid.numXCell
   let tempX
    let tempY

   if (isAtCenter) {
       switch (this.player.direction) {
            case 'left':
                tempX = this.player.xPos - deltaX  
                tempY = this.player.yPos
                break
            case 'right':
                tempX = this.player.xPos + deltaX  
                tempY = this.player.yPos
                break
       }    
   }
   else {
        // no user input, left and right with default direction
        switch (this.player.direction ) {
            // check cell at the left can be moved into
            case 'left':
                tempX = Math.floor(this.player.xPos / deltaX) * deltaX
                tempY = this.player.yPos
                break
            case 'right':
                tempX = (Math.floor(this.player.xPos / deltaX) + 1) * deltaX
                tempY = this.player.yPos
                break
        }
    }

    let nextCell = this.grid.getCell(tempX, tempY)
    

    // no user input, up and down with default direction


    // user input, left and right 
    

    // user input, up and down 


    // corner


    // t-section


    // cross-section



    //   let cell = this.decide(this.player.direction)





      if(nextCell && nextCell.content !== 'wall'){
        // clear pac-man's previous position in cell
        // let prevX = this.player.xPos
        // let prevY = this.player.yPos
        // let str = prevX + ',' + prevY
        // this.grid.cells[str].content = 'empty'

        pos = this.player.move(this.player.direction)
        this.player.xPos = pos.xPos
        this.player.yPos = pos.yPos
      }
      
      

      console.log(`xPos: ${this.player.xPos}, yPos: ${this.player.yPos}`)

      // this.collisionDetection()
    
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

  // await pause()

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

  '0,200': 'wall',
  '50,200': 'sm-pellet',
  '100,200': 'empty',
  '150,200': 'sm-pellet',
  '200,200': 'wall'
}

let engine = new Engine() 
engine.setUp()
engine.listen()
engine.draw()
engine.update()
// engine.update()
// engine.update()
// engine.update()
// engine.update()
// engine.update()
// engine.update()
// engine.update()

animation()


