// import {Player} from './player'
// const {Player} = require('./player.js')

// const Character = require('./class.js')
// import {Character} from './character.js'

let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let c = canvas.getContext('2d')

const playerInfo = {
  speed: 2,
  color: 'yellow',
  xPos: 0,
  yPos: 250,
  radius: 25,
  direction: 'right'
}

const ghostsInfo = {
  redGhost: {
    speed: 2,
    color: 'red',
    xPos: 0,
    yPos: 0,
    radius: 25,
    direction: 'right'
  },
  pinkGhost: {
    speed: 2,
    color: 'pink',
    xPos: 0,
    yPos: 50,
    radius: 25,
    direction: 'right'
  },
  aquaGhost: {
    speed: 2,
    color: 'aqua',
    xPos: 0,
    yPos: 100,
    radius: 25,
    direction: 'right'
  },
  orangeGhost: {
    speed: 2,
    color: 'orange',
    xPos: 0,
    yPos: 150,
    radius: 25,
    direction: 'right'
  }
}

const pauseTime = 100
let direction

const smPelletRadius = 5
const bigPelletRadius = 10

const edibleModeTime = 3000




// function pause() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve()
//     }, pauseTime)
//   })
// }

// class Pellet {
//   constructor(size, xPos, yPos) {
//     this.size = size
//     this.xPos = xPos
//     this.yPos = yPos
//   }
// }




// engine
class Engine {
    constructor() {
      this.player = null
      this.redGhost = null
      this.mode = 'normal'
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
      this.grid= new Grid(0,0,500,500,10,10, gridObj)
      this.grid.setUp()

      this.player = new Player(playerInfo.speed, playerInfo.color, playerInfo.xPos, playerInfo.yPos, playerInfo.direction)    

      this.redGhost = new Ghost(ghostsInfo.redGhost.speed, ghostsInfo.redGhost.color, ghostsInfo.redGhost.xPos, ghostsInfo.redGhost.yPos, ghostsInfo.redGhost.direction)
    
    }  

    // draw
    draw() { 
      // draw the cells and their content
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
          c.arc(xTemp,yTemp,smPelletRadius,0,Math.PI*2,false)
          c.strokeRect(x, y, 50, 50)          
          c.stroke()

        }
        else if (cells[cell].content === 'big-pellet'){
          let [x, y] = cell.split(',')

          c.beginPath()
          let xTemp = Number(x) 
          let yTemp = Number(y)
          xTemp += 25
          yTemp +=25
          c.arc(xTemp,yTemp,bigPelletRadius,0,Math.PI*2,false)
          c.fillStyle = 'white'
          c.fill()

          c.strokeRect(x, y, 50, 50)          
          c.stroke()

        }
        else if (cells[cell].content === 'empty'){
          let [x, y] = cell.split(',')

          c.beginPath()
          c.strokeRect(x, y, 50, 50)  
         

        } 
        else {
          // console.log(' in else...')
        } 
        
      
          
      }

      // draw pac-man
      c.beginPath()
      let xTemp = this.player.xPos 
      let yTemp = this.player.yPos
      xTemp += playerInfo.radius
      yTemp += playerInfo.radius
      c.arc(xTemp,yTemp,playerInfo.radius,0,Math.PI*2,false)
      // c.strokeRect(this.player.xPos, this.player.yPos, 50, 50)  
      c.fillStyle = this.player.color
      c.fill()        
      c.stroke()      


      // draw ghost
      c.beginPath()
      // let ghostXTemp = ghostsInfo.redGhost.xPos + ghostsInfo.redGhost.radius
      // let ghostYTemp = ghostsInfo.redGhost.xPos + ghostsInfo.redGhost.radius

      let ghostXTemp = this.redGhost.xPos + ghostsInfo.redGhost.radius
      let ghostYTemp = this.redGhost.yPos + ghostsInfo.redGhost.radius

      c.arc(ghostXTemp, ghostYTemp, ghostsInfo.redGhost.radius, 0, Math.PI*2, false)
      c.fillStyle = this.redGhost.color
      c.fill()
      c.stroke()
      

    }

    ghostInEdibleMode() {
       // ghosts turn green for now
       this.redGhost.color = 'green'

       this.mode = 'flash'

       console.log('big-pellet eaten -----------')
       
       switch (this.redGhost.direction) {
         case 'left':
           this.redGhost.direction = 'right'
           break
         case 'right':
           this.redGhost.direction = 'left'
           break
         case 'up':
             this.redGhost.direction = 'down'
             break 
         case 'down':
             this.redGhost.direction = 'up'
             break 

       }
       console.log('change direction -----------')

    }

    ghostInNormalMode() {
      this.redGhost.color = 'red'

      this.mode = 'normal'
    }

    bigPelletEaten() {

      this.ghostInEdibleMode()

      
      setTimeout(this.ghostInNormalMode.bind(this), edibleModeTime)
       
        
    }
    
    // if player and pellet collides
    //  pellet is eaten: 
    //    getCell from grid
    //    updateCellContent
    //  
    //  score gets updated
    collisionDetection() {
      // this.pellet = this.grid.cells[]

      let tempX
      let tempY
      let deltaX = this.grid.width / this.grid.numXCell
      let deltaY = this.grid.height / this.grid.numYCell
      
       
      switch (this.player.direction ) {
        case 'left':
            tempX = Math.floor(this.player.xPos / deltaX) * deltaX
            tempY = this.player.yPos
            break
        case 'right':
            tempX = (Math.floor(this.player.xPos / deltaX) + 1) * deltaX
            tempY = this.player.yPos
            break
        case 'up':
            tempY = Math.floor(this.player.yPos / deltaY) * deltaY
            tempX = this.player.xPos
            break
        case 'down':
            tempY = (Math.floor(this.player.yPos / deltaY) + 1) * deltaY
            tempX = this.player.xPos
            break
    }

      let playerTopLeftX = this.player.xPos
      let playerTopLeftY = this.player.yPos

      let playerTopRightX = this.player.xPos + playerInfo.radius * 2
      let playerTopRightY = this.player.yPos

      let playerBottomLeftX = this.player.xPos
      let playerBottomLeftY = this.player.yPos + playerInfo.radius * 2

      let direction = this.player.direction

      let cell = this.grid.getCell(tempX, tempY)

      if(cell.content === 'sm-pellet' ) {
        let pelletRadius = smPelletRadius

        let cellCoord = {x: tempX, y: tempY}
        let pelletTopLeftX = cellCoord.x + deltaX/2 - smPelletRadius 
        let pelletTopLeftY = cellCoord.y + deltaY/2 - smPelletRadius 
   
        let pelletTopRightX = cellCoord.x + smPelletRadius * 2
        let pelletTopRightY = cellCoord.y + smPelletRadius 
  
        let pelletBottomLeftX = cellCoord.x + deltaX/2 - smPelletRadius  
        let pelletBottomLeftY = cellCoord.y + deltaX/2 + smPelletRadius
  
        // left to right
        if (direction === 'right' && playerTopRightX >= pelletTopLeftX) {
          console.log('--- right --- ', playerTopRightX, pelletTopLeftX)
          console.log('collision detected...')
          console.log('************************************')
          cell.updateContent('empty')
        }

        // right to left
        if (direction === 'left' && playerTopLeftX <= pelletTopRightX) {
          console.log('collision detected...')
          console.log('************************************')
          cell.updateContent('empty')
        }

        // bottom to up
        if (direction === 'up' && playerTopLeftY <= pelletBottomLeftY) {
          console.log('************************************')

          console.log('playerTopLeftY', playerTopLeftY)
          console.log('pelletBottomLeftY', pelletBottomLeftY)
          console.log('************************************')

          console.log('collision detected...')
          cell.updateContent('empty')

        }

        // going down
        if (direction === 'down' && playerBottomLeftY >= pelletTopLeftY ) {
          console.log('--- down --- ', playerBottomLeftY, pelletTopLeftY)

          console.log('collision detected...')
          console.log('************************************')
          cell.updateContent('empty')
        }

        


      }

      
      else if(cell.content === 'big-pellet' ) {
        let pelletRadius = smPelletRadius

        let cellCoord = {x: tempX, y: tempY}
        let pelletTopLeftX = cellCoord.x + bigPelletRadius 
        let pelletTopLeftY = cellCoord.y + bigPelletRadius
   
        let pelletTopRightX = cellCoord.x + bigPelletRadius 
        let pelletTopRightY = cellCoord.y +  bigPelletRadius
  
        let pelletBottomLeftX = cellCoord.x + bigPelletRadius 
        let pelletBottomLeftY = cellCoord.y + bigPelletRadius 
  
        // left to right
        if (direction === 'right' && playerTopLeftX <= pelletTopRightX && playerTopRightX > pelletTopRightX) {
          console.log('collision detected...')
          console.log('************************************')
          cell.updateContent('empty')

          this.bigPelletEaten()

        }
        // right to left
        if (direction === 'left' && playerTopRightX >= pelletTopLeftX && playerTopLeftX < pelletTopLeftX) {
          console.log('collision detected...')
          console.log('************************************')
          cell.updateContent('empty')

          this.bigPelletEaten()
        }

        // bottom to up
        if (direction === 'up' && playerTopLeftY <= pelletBottomLeftY && playerBottomLeftY > pelletBottomLeftY) {
          console.log('************************************')

          console.log('playerTopLeftY', playerTopLeftY)
          console.log('pelletBottomLeftY', pelletBottomLeftY)
          console.log('playerBottomLeftY', playerBottomLeftY)
          console.log('pelletBottomLeftY', pelletBottomLeftY)
          console.log('************************************')

          console.log('collision detected...')
          cell.updateContent('empty')

          this.bigPelletEaten()


        }

        // going down
        if (direction === 'down' && playerBottomLeftY >= pelletTopLeftY && playerTopLeftY < pelletBottomLeftY) {
          console.log('collision detected...')
          console.log('************************************')
          cell.updateContent('empty')

          this.bigPelletEaten()
        }

        


      }

      // in normal-mode, pacman meets ghost, pacman eats ghost
      if(this.mode === 'normal') {

      }

      // in normal-mode, pacman meets ghost, ghost eats pacman, game ends

      
    }

    determinePos(direction, x, y, deltaX, deltaY) {
      switch (direction) {
        case 'left':
            x = x - deltaX  
            break
        case 'right':
            x = x + deltaX  
            break
        case 'up':
            y = y - deltaY
            break
        case 'down':
            y = y + deltaY
            break
      }
      return {x, y}
    }

    update() {
      c.clearRect(0, 0, innerWidth, innerHeight)

      let pos 
      // update position for pac-man   
   
    // user input(up, down), pac-man moving left and right 
    //  no path
    // if center, check userDirectionInput, check nextCell,
    //      if nextCell good, update direction = userDirectionInput 
    // if not center, check userDirectionInput, if userDirectionInput is 
    //    in the array, then update direction = userDirectionInput

   let isAtCenter = this.player.isAtCenter()
   let deltaX = this.grid.width / this.grid.numXCell
   let deltaY = this.grid.height / this.grid.numYCell

   let tempX
    let tempY
    let newPos
    let userDirectionInput = this.player.userDirectionInput
    let horizontalDirArr = ['left', 'right']
    let verticalDirArr = ['up', 'down']
// console.log('isAtCenter', isAtCenter )
// console.log('this.player.userDirectionInput', this.player.userDirectionInput)
// console.log('userDirectionInput', userDirectionInput)
   if (isAtCenter && userDirectionInput !== null) {    
    newPos = this.determinePos(userDirectionInput, this.player.xPos, this.player.yPos, deltaX, deltaY)
    tempX = newPos.x
    tempY = newPos.y
    let nextCell = this.grid.getCell(tempX, tempY)
    if(nextCell && nextCell.content !== 'wall'){
      this.player.direction = userDirectionInput
    } else {
      newPos = this.determinePos(this.player.direction, this.player.xPos, this.player.yPos, deltaX, deltaY)
      tempX = newPos.x
      tempY = newPos.y
    }
  }
  else if (isAtCenter && userDirectionInput === null) { 
    newPos = this.determinePos(this.player.direction, this.player.xPos, this.player.yPos, deltaX, deltaY)
    tempX = newPos.x
    tempY = newPos.y  
  }
   // not at center
   else {
     if(this.player.userDirectionInput !== null) {
       if(horizontalDirArr.indexOf(this.player.direction) >= 0 
          && horizontalDirArr.indexOf(this.player.userDirectionInput) >= 0) {
        this.player.direction = this.player.userDirectionInput
       } 
       else if ( verticalDirArr.indexOf(this.player.direction) >=0
          && verticalDirArr.indexOf(this.player.userDirectionInput) >= 0){
        this.player.direction = this.player.userDirectionInput
       }
     }

    // no user input, left and right with default direction
    switch (this.player.direction ) {
        case 'left':
            tempX = Math.floor(this.player.xPos / deltaX) * deltaX
            tempY = this.player.yPos
            break
        case 'right':
            tempX = (Math.floor(this.player.xPos / deltaX) + 1) * deltaX
            tempY = this.player.yPos
            break
        case 'up':
            tempY = Math.floor(this.player.yPos / deltaY) * deltaY
            tempX = this.player.xPos
            break
        case 'down':
            tempY = (Math.floor(this.player.yPos / deltaY) + 1) * deltaY
            tempX = this.player.xPos
            break
    }
  }

    let nextCell = this.grid.getCell(tempX, tempY)
    

    // user input(up, down), pac-man moving left and right 
    //  no path
    // if center, check userDirectionInput, check nextCell,
    //      if nextCell good, update direction = userDirectionInput 
    // if not center, check userDirectionInput, if userDirectionInput is 
    //    in the array, then update direction = userDirectionInput



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


      // update ghost position
      let ghostPos = this.redGhost.maybeMove(this.grid)

      this.redGhost.xPos = ghostPos.xPos
      this.redGhost.yPos = ghostPos.yPos


      this.collisionDetection()
    
      this.draw()      
      }

    listen(){
      document.addEventListener('keydown', (e) => { 
        // console.log('e.code.....', e.code)

        switch (e.code) {
          case 'ArrowRight':
            // if(this.player.userDirectionInput !== 'right'){
              // this.player.direction = 'stop'
            //   await pause()              
              this.player.userDirectionInput = 'right'
            // }
    
            break  
          case 'ArrowLeft':
            // if(this.player.userDirectionInput !== 'left'){
              // this.player.direction = 'stop'
            //   await pause()
              this.player.userDirectionInput = 'left'

            // }
            break
          case 'ArrowUp':
            // if(this.player.userDirectionInput !== 'up'){
              // this.player.direction = 'stop'
            //   await pause()
              this.player.userDirectionInput = 'up'
            // }            
            break
          case 'ArrowDown':
            // if(this.player.userDirectionInput !== 'down'){
              // this.player.direction = 'stop'
            //   await pause()
              this.player.userDirectionInput = 'down'
            // }            
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
  '50,0': 'big-pellet',
  '100,0': 'sm-pellet',
  '150,0': 'sm-pellet',
  '200,0': 'sm-pellet',
  '250,0': 'sm-pellet',

  '0,50': 'sm-pellet',
  '50,50': 'wall',
  '100,50': 'empty',
  '150,50': 'wall',
  '200,50': 'sm-pellet',
  '250,50': 'sm-pellet',


  '0,100': 'sm-pellet',
  '50,100': 'empty',
  '100,100': 'empty',
  '150,100': 'sm-pellet',
  '200,100': 'sm-pellet',
  '250,100': 'sm-pellet',


  '0,150': 'sm-pellet',
  '50,150': 'wall',
  '100,150': 'empty',
  '150,150': 'wall',
  '200,150': 'sm-pellet',
  '250,150': 'sm-pellet',


  '0,200': 'empty',
  '50,200': 'empty',
  '100,200': 'empty',
  '150,200': 'sm-pellet',
  '200,200': 'wall',
  '250,200': 'sm-pellet',

  '0,250': 'empty',
  '50,250': 'empty',
  '100,250': 'empty',
  '150,250': 'sm-pellet',
  '200,250': 'wall',
  '250,250': 'sm-pellet'

}

let engine = new Engine() 
engine.setUp()
engine.listen()
engine.draw()

animation()


