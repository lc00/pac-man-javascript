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
  xPos: 100,
  yPos: 200,
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

const edibleModeTime = 5000

let requestId = null
let timeoutId = null

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
      this.isGameOn = true
    }

    // setup
    setUp() {
      // create grid instances
      //              Grid(startX,startY,width,height,numXCell,numYCell, gridObj)
      this.grid= new Grid(0,0,300,300,6,6, gridObj)
      this.grid.setUp()

      this.player = new Player(playerInfo.speed, playerInfo.color, true, playerInfo.xPos, playerInfo.yPos, playerInfo.direction)    

      this.redGhost = new Ghost(ghostsInfo.redGhost.speed, ghostsInfo.redGhost.color, true, ghostsInfo.redGhost.xPos, ghostsInfo.redGhost.yPos, ghostsInfo.redGhost.direction)
    
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
      // if(this.redGhost && this.redGhost.isLive) {
        c.beginPath()
        // let ghostXTemp = ghostsInfo.redGhost.xPos + ghostsInfo.redGhost.radius
        // let ghostYTemp = ghostsInfo.redGhost.xPos + ghostsInfo.redGhost.radius
  
        let ghostXTemp = this.redGhost.xPos + ghostsInfo.redGhost.radius
        let ghostYTemp = this.redGhost.yPos + ghostsInfo.redGhost.radius
  
        c.arc(ghostXTemp, ghostYTemp, ghostsInfo.redGhost.radius, 0, Math.PI*2, false)
        c.fillStyle = this.redGhost.color
        c.fill()
        c.stroke()
  
      // }


      if(pelletCount === 0 ) {
        this.isGameOn = false
        console.log('you win')
      }

    }

    ghostInEdibleMode() {
       // ghosts turn green for now
       this.redGhost.color = 'green'

       this.mode = 'flash'

       console.log('!!! big-pellet eaten -----------')
       
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

      // reset timeout
      if(timeoutId) 
        clearTimeout(timeoutId)
       
      timeoutId = setTimeout(this.ghostInNormalMode.bind(this), edibleModeTime)
      
       
      
    }

    updateCharactersStatus() {
      if(this.mode === 'flash') {
        this.redGhost.color = ghostsInfo.redGhost.color

        // redGhost goes back to its den
        this.redGhost.xPos = ghostsInfo.redGhost.xPos
        this.redGhost.yPos = ghostsInfo.redGhost.yPos


      } else {
        this.player.isLive = false
        this.isGameOn = false
      }
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
          pelletCount--

        }

        // right to left
         if (direction === 'left' && playerTopLeftX <= pelletTopRightX) {
          console.log('collision detected...')
          console.log('************************************')
          cell.updateContent('empty')
          pelletCount--

        }

        // going up
         if (direction === 'up' && playerTopLeftY <= pelletBottomLeftY) {
          console.log('************************************')

          console.log('playerTopLeftY', playerTopLeftY)
          console.log('pelletBottomLeftY', pelletBottomLeftY)
          console.log('************************************')

          console.log('collision detected...')
          cell.updateContent('empty')
          pelletCount--

        }

        // going down
         if (direction === 'down' && playerBottomLeftY >= pelletTopLeftY ) {
          console.log('--- down --- ', playerBottomLeftY, pelletTopLeftY)

          console.log('collision detected...')
          console.log('************************************')
          cell.updateContent('empty')
          pelletCount--

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
          pelletCount--

        }
        // right to left
        if (direction === 'left' && playerTopRightX >= pelletTopLeftX && playerTopLeftX < pelletTopLeftX) {
          console.log('collision detected...')
          console.log('************************************')
          cell.updateContent('empty')

          this.bigPelletEaten()
          pelletCount--

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
        pelletCount--



        }

        // going down
        if (direction === 'down' && playerBottomLeftY >= pelletTopLeftY && playerTopLeftY < pelletBottomLeftY) {
          console.log('collision detected...')
          console.log('************************************')
          cell.updateContent('empty')

          this.bigPelletEaten()
          pelletCount--

        }

        


      }

      // adding a 10 pixel buffer
      let ghostBuffer = 10
      let redGhostTopLeftX = this.redGhost.xPos + ghostBuffer
      let redGhostTopLeftY = this.redGhost.yPos + ghostBuffer
      
      let redGhostTopRightX = this.redGhost.xPos + deltaX - ghostBuffer
      let redGhostTopRightY = redGhostTopLeftY

      let redGhostBottomLeftX = redGhostTopLeftX
      let redGhostBottomLeftY = this.redGhost.yPos + deltaY - ghostBuffer

      // let redGhostBottomRightX = redGhostTopLeftX
      // let redGhostBottomRightY = this.redGhost.yPos + deltaY - ghostBuffer

      

      // going right
      if (playerTopRightX >= redGhostTopLeftX && playerTopLeftX < redGhostTopLeftX && this.redGhost.yPos === this.player.yPos) {
        console.log('--- right --- ', playerTopRightX, redGhostTopLeftX)
        console.log('collision detected --- pacman and ghost...')
        console.log('************************************')

        this.updateCharactersStatus()
        
      }

      // going left
      if (playerTopRightX > redGhostTopLeftX && playerTopLeftX <= redGhostTopRightX && this.redGhost.yPos === this.player.yPos) {
        console.log('collision detected...')
        console.log('************************************')
        this.updateCharactersStatus()
        
      }

      // going up
      if (playerTopLeftY <= redGhostBottomLeftY && playerBottomLeftY > redGhostTopLeftY &&  this.redGhost.xPos === this.player.xPos) {
        console.log('************************************')

        console.log('playerTopLeftY', playerTopLeftY)
        console.log('pelletBottomLeftY', redGhostBottomLeftY)
        console.log('************************************')

        console.log('collision detected...')
        this.updateCharactersStatus()
      }

      // going down
      if (playerTopLeftY < redGhostTopLeftY && playerBottomLeftY >= redGhostTopLeftY && this.redGhost.xPos === this.player.xPos ) {
        console.log('--- down --- ', playerBottomLeftY, redGhostTopLeftY)

        console.log('collision detected...')
        console.log('************************************')
        this.updateCharactersStatus()
      }


      
      
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

      let tempXPos,
      tempYPos,
      pacmanPos


      
      let redGhostPos = this.redGhost.xPos + ',' + this.redGhost.yPos

      
      let nextPos
     
      let currentPos = this.redGhost.xPos + ',' + this.redGhost.yPos

      // first time, no nextPos for ghost


      // if at center of a cell and normal mode
      if(this.redGhost.xPos % 50 === 0 && this.redGhost.yPos % 50 === 0 && this.mode === 'normal') {
       
        // if(this.player.xPos % deltaX !== 0 && this.player.yPos % deltaY !== 0) {
          tempXPos = Math.floor(this.player.xPos / deltaX) * deltaX
          tempYPos = Math.floor(this.player.yPos / deltaY) * deltaY
          pacmanPos = tempXPos + ',' + tempYPos

          // update ghost position
          nextPos = this.redGhost.maybeMove(gridObj, pacmanPos, redGhostPos)
      }
      else {  
          // update ghost position
          nextPos = this.redGhost.random(this.grid)
      }
      // else {

      // }

              // store nextPos
        // nextPos = nextPos.split(',')
        this.redGhost.nextXPos = nextPos.xPos
        this.redGhost.nextYPos = nextPos.yPos

        nextPos = nextPos.xPos + ',' + nextPos.yPos

       
 // update direction
        this.redGhost.direction = this.redGhost.determineDirection(currentPos, nextPos)
        if(!this.redGhost.direction) console.log('maybeMove function direction undefined')

      let ghostPos = this.redGhost.move(this.redGhost.direction, this.redGhost.xPos, this.redGhost.yPos)
      this.redGhost.xPos = ghostPos.xPos
      this.redGhost.yPos = ghostPos.yPos
    
 
      console.log(`ghost direction ${this.redGhost.direction}`)
      console.log(`ghost xPos: ${this.redGhost.xPos}, ghost yPos: ${this.redGhost.yPos}`)

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

  requestId = requestAnimationFrame(animation)

  if (!engine.isGameOn) {
    cancelAnimationFrame(requestId);
    requestId = undefined;
    console.log('game over ')
  }

  engine.update()

  
}



const cellSpacing = 50
let grid = {
  '0,0': 'sm-pellet',
  '1,0': 'big-pellet',
  '2,0': 'sm-pellet',
  '3,0': 'sm-pellet',
  '4,0': 'sm-pellet',
  '5,0': 'sm-pellet',

  '0,1': 'sm-pellet',
  '1,1': 'wall',
  '2,1': 'sm-pellet',
  '3,1': 'sm-pellet',
  '4,1': 'sm-pellet',
  '5,1': 'sm-pellet',

  '0,2': 'sm-pellet',
  '1,2': 'wall',
  '2,2': 'wall',
  '3,2': 'sm-pellet',
  '4,2': 'sm-pellet',
  '5,2': 'sm-pellet',

  '0,3': 'sm-pellet',
  '1,3': 'sm-pellet',
  '2,3': 'sm-pellet',
  '3,3': 'sm-pellet',
  '4,3': 'sm-pellet',
  '5,3': 'sm-pellet',

  '0,4': 'big-pellet',
  '1,4': 'wall',
  '2,4': 'sm-pellet',
  '3,4': 'sm-pellet',
  '4,4': 'wall',
  '5,4': 'sm-pellet',

  '0,5': 'big-pellet',
  '1,5': 'sm-pellet',
  '2,5': 'sm-pellet',
  '3,5': 'sm-pellet',
  '4,5': 'wall',
  '5,5': 'sm-pellet'

}

let gridObj = {}

function scaleGrid(grid) {
  for (let key in grid) {
    let [ x, y ]  = key.split(',')
    let value = grid[key]
    x = x * cellSpacing
    y = y * cellSpacing

    gridObj[x + ',' + y] = value

  }
  return gridObj
}

scaleGrid(grid)






// let pelletCount = 6*6-6
 let pelletCount = 30


let engine = new Engine() 
engine.setUp()
engine.listen()
engine.draw()

animation()

