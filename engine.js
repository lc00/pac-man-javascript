let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let c = canvas.getContext('2d')

const playerInfo = {
  speed: 2,
  color: 'yellow',
  xPos: 400,
  yPos: 400,
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

const cellSpacing = 50
let pelletCount = 150

let grid = {"0,0":"big-pellet","1,0":"sm-pellet","2,0":"sm-pellet","3,0":"sm-pellet","4,0":"sm-pellet","5,0":"sm-pellet","6,0":"sm-pellet","7,0":"sm-pellet","8,0":"sm-pellet","9,0":"sm-pellet","10,0":"big-pellet","11,0":"sm-pellet","12,0":"sm-pellet","13,0":"sm-pellet","14,0":"sm-pellet","15,0":"sm-pellet","16,0":"sm-pellet","17,0":"sm-pellet","18,0":"sm-pellet","19,0":"sm-pellet","0,1":"sm-pellet","1,1":"sm-pellet","2,1":"sm-pellet","3,1":"sm-pellet","4,1":"sm-pellet","5,1":"sm-pellet","6,1":"wall","7,1":"wall","8,1":"wall","9,1":"wall","10,1":"wall","11,1":"sm-pellet","12,1":"sm-pellet","13,1":"sm-pellet","14,1":"sm-pellet","15,1":"sm-pellet","16,1":"sm-pellet","17,1":"sm-pellet","18,1":"sm-pellet","19,1":"sm-pellet","0,2":"sm-pellet","1,2":"sm-pellet","2,2":"sm-pellet","3,2":"sm-pellet","4,2":"wall","5,2":"wall","6,2":"sm-pellet","7,2":"sm-pellet","8,2":"sm-pellet","9,2":"sm-pellet","10,2":"wall","11,2":"wall","12,2":"wall","13,2":"wall","14,2":"sm-pellet","15,2":"sm-pellet","16,2":"sm-pellet","17,2":"sm-pellet","18,2":"sm-pellet","19,2":"sm-pellet","0,3":"sm-pellet","1,3":"sm-pellet","2,3":"sm-pellet","3,3":"wall","4,3":"wall","5,3":"sm-pellet","6,3":"sm-pellet","7,3":"sm-pellet","8,3":"sm-pellet","9,3":"sm-pellet","10,3":"sm-pellet","11,3":"sm-pellet","12,3":"sm-pellet","13,3":"wall","14,3":"wall","15,3":"sm-pellet","16,3":"sm-pellet","17,3":"sm-pellet","18,3":"sm-pellet","19,3":"sm-pellet","0,4":"sm-pellet","1,4":"sm-pellet","2,4":"sm-pellet","3,4":"wall","4,4":"sm-pellet","5,4":"sm-pellet","6,4":"sm-pellet","7,4":"wall","8,4":"wall","9,4":"wall","10,4":"wall","11,4":"sm-pellet","12,4":"sm-pellet","13,4":"sm-pellet","14,4":"wall","15,4":"sm-pellet","16,4":"sm-pellet","17,4":"sm-pellet","18,4":"sm-pellet","19,4":"sm-pellet","0,5":"sm-pellet","1,5":"sm-pellet","2,5":"sm-pellet","3,5":"wall","4,5":"sm-pellet","5,5":"sm-pellet","6,5":"sm-pellet","7,5":"sm-pellet","8,5":"sm-pellet","9,5":"sm-pellet","10,5":"wall","11,5":"wall","12,5":"wall","13,5":"sm-pellet","14,5":"sm-pellet","15,5":"wall","16,5":"sm-pellet","17,5":"sm-pellet","18,5":"sm-pellet","19,5":"sm-pellet","0,6":"sm-pellet","1,6":"sm-pellet","2,6":"sm-pellet","3,6":"wall","4,6":"sm-pellet","5,6":"sm-pellet","6,6":"sm-pellet","7,6":"sm-pellet","8,6":"sm-pellet","9,6":"sm-pellet","10,6":"sm-pellet","11,6":"sm-pellet","12,6":"wall","13,6":"wall","14,6":"sm-pellet","15,6":"wall","16,6":"sm-pellet","17,6":"sm-pellet","18,6":"sm-pellet","19,6":"sm-pellet","0,7":"sm-pellet","1,7":"sm-pellet","2,7":"sm-pellet","3,7":"wall","4,7":"sm-pellet","5,7":"sm-pellet","6,7":"sm-pellet","7,7":"sm-pellet","8,7":"sm-pellet","9,7":"sm-pellet","10,7":"sm-pellet","11,7":"sm-pellet","12,7":"sm-pellet","13,7":"wall","14,7":"sm-pellet","15,7":"wall","16,7":"sm-pellet","17,7":"sm-pellet","18,7":"sm-pellet","19,7":"sm-pellet","0,8":"sm-pellet","1,8":"sm-pellet","2,8":"sm-pellet","3,8":"wall","4,8":"wall","5,8":"sm-pellet","6,8":"sm-pellet","7,8":"sm-pellet","8,8":"sm-pellet","9,8":"sm-pellet","10,8":"sm-pellet","11,8":"sm-pellet","12,8":"sm-pellet","13,8":"wall","14,8":"sm-pellet","15,8":"wall","16,8":"sm-pellet","17,8":"sm-pellet","18,8":"sm-pellet","19,8":"sm-pellet","0,9":"sm-pellet","1,9":"sm-pellet","2,9":"sm-pellet","3,9":"sm-pellet","4,9":"wall","5,9":"sm-pellet","6,9":"sm-pellet","7,9":"sm-pellet","8,9":"sm-pellet","9,9":"sm-pellet","10,9":"sm-pellet","11,9":"sm-pellet","12,9":"sm-pellet","13,9":"wall","14,9":"sm-pellet","15,9":"wall","16,9":"sm-pellet","17,9":"sm-pellet","18,9":"sm-pellet","19,9":"sm-pellet","0,10":"big-pellet","1,10":"sm-pellet","2,10":"sm-pellet","3,10":"sm-pellet","4,10":"wall","5,10":"wall","6,10":"sm-pellet","7,10":"sm-pellet","8,10":"sm-pellet","9,10":"sm-pellet","10,10":"big-pellet","11,10":"sm-pellet","12,10":"sm-pellet","13,10":"wall","14,10":"sm-pellet","15,10":"wall","16,10":"sm-pellet","17,10":"sm-pellet","18,10":"sm-pellet","19,10":"sm-pellet","0,11":"sm-pellet","1,11":"sm-pellet","2,11":"sm-pellet","3,11":"sm-pellet","4,11":"sm-pellet","5,11":"wall","6,11":"wall","7,11":"wall","8,11":"wall","9,11":"sm-pellet","10,11":"wall","11,11":"wall","12,11":"wall","13,11":"wall","14,11":"sm-pellet","15,11":"wall","16,11":"sm-pellet","17,11":"sm-pellet","18,11":"sm-pellet","19,11":"sm-pellet","0,12":"sm-pellet","1,12":"sm-pellet","2,12":"wall","3,12":"sm-pellet","4,12":"sm-pellet","5,12":"sm-pellet","6,12":"sm-pellet","7,12":"sm-pellet","8,12":"wall","9,12":"wall","10,12":"wall","11,12":"sm-pellet","12,12":"sm-pellet","13,12":"sm-pellet","14,12":"sm-pellet","15,12":"wall","16,12":"sm-pellet","17,12":"sm-pellet","18,12":"sm-pellet","19,12":"sm-pellet","0,13":"sm-pellet","1,13":"sm-pellet","2,13":"wall","3,13":"sm-pellet","4,13":"sm-pellet","5,13":"sm-pellet","6,13":"sm-pellet","7,13":"sm-pellet","8,13":"sm-pellet","9,13":"sm-pellet","10,13":"sm-pellet","11,13":"sm-pellet","12,13":"sm-pellet","13,13":"sm-pellet","14,13":"sm-pellet","15,13":"wall","16,13":"sm-pellet","17,13":"sm-pellet","18,13":"sm-pellet","19,13":"sm-pellet","0,14":"sm-pellet","1,14":"sm-pellet","2,14":"wall","3,14":"wall","4,14":"sm-pellet","5,14":"sm-pellet","6,14":"sm-pellet","7,14":"sm-pellet","8,14":"sm-pellet","9,14":"sm-pellet","10,14":"sm-pellet","11,14":"sm-pellet","12,14":"sm-pellet","13,14":"sm-pellet","14,14":"sm-pellet","15,14":"wall","16,14":"sm-pellet","17,14":"sm-pellet","18,14":"sm-pellet","19,14":"sm-pellet","0,15":"sm-pellet","1,15":"sm-pellet","2,15":"sm-pellet","3,15":"wall","4,15":"wall","5,15":"sm-pellet","6,15":"sm-pellet","7,15":"sm-pellet","8,15":"sm-pellet","9,15":"sm-pellet","10,15":"sm-pellet","11,15":"sm-pellet","12,15":"sm-pellet","13,15":"sm-pellet","14,15":"wall","15,15":"wall","16,15":"sm-pellet","17,15":"sm-pellet","18,15":"sm-pellet","19,15":"sm-pellet","0,16":"sm-pellet","1,16":"sm-pellet","2,16":"sm-pellet","3,16":"sm-pellet","4,16":"wall","5,16":"wall","6,16":"wall","7,16":"sm-pellet","8,16":"sm-pellet","9,16":"sm-pellet","10,16":"sm-pellet","11,16":"sm-pellet","12,16":"sm-pellet","13,16":"wall","14,16":"wall","15,16":"sm-pellet","16,16":"sm-pellet","17,16":"sm-pellet","18,16":"sm-pellet","19,16":"sm-pellet","0,17":"sm-pellet","1,17":"sm-pellet","2,17":"sm-pellet","3,17":"sm-pellet","4,17":"sm-pellet","5,17":"sm-pellet","6,17":"wall","7,17":"wall","8,17":"wall","9,17":"wall","10,17":"wall","11,17":"wall","12,17":"wall","13,17":"wall","14,17":"sm-pellet","15,17":"sm-pellet","16,17":"sm-pellet","17,17":"sm-pellet","18,17":"sm-pellet","19,17":"sm-pellet","0,18":"sm-pellet","1,18":"sm-pellet","2,18":"sm-pellet","3,18":"sm-pellet","4,18":"sm-pellet","5,18":"sm-pellet","6,18":"sm-pellet","7,18":"sm-pellet","8,18":"sm-pellet","9,18":"sm-pellet","10,18":"sm-pellet","11,18":"sm-pellet","12,18":"sm-pellet","13,18":"sm-pellet","14,18":"sm-pellet","15,18":"sm-pellet","16,18":"sm-pellet","17,18":"sm-pellet","18,18":"sm-pellet","19,18":"sm-pellet","0,19":"sm-pellet","1,19":"sm-pellet","2,19":"sm-pellet","3,19":"sm-pellet","4,19":"sm-pellet","5,19":"sm-pellet","6,19":"sm-pellet","7,19":"sm-pellet","8,19":"sm-pellet","9,19":"sm-pellet","10,19":"sm-pellet","11,19":"sm-pellet","12,19":"sm-pellet","13,19":"sm-pellet","14,19":"sm-pellet","15,19":"sm-pellet","16,19":"sm-pellet","17,19":"sm-pellet","18,19":"sm-pellet","19,19":"sm-pellet"}
console.log('grid', grid)

// engine
class Engine {
    constructor() {
      this.player = null
      this.redGhost = null
      this.mode = 'normal'
      this.isGameOn = true
      this.isFirstIterationInFlashMode = false
    }

    // setup
    setUp() {
      // count number of x-axis and y-axis cells
      let numXCell
      let numYCell

      for (let key in gridObj) {
        let tempArr = key.split(',')
        numXCell = tempArr[0]
        numYCell = tempArr[1]
      }

      numXCell /= cellSpacing
      numYCell /= cellSpacing

      //              Grid(startX,startY,width,height,numXCell,numYCell, gridObj)
      this.grid= new Grid(0,0,numXCell*cellSpacing,numYCell*cellSpacing,numXCell,numYCell, gridObj)
      debugger
      this.grid.setUp()
      
      this.player = new Player(playerInfo.speed, playerInfo.color, true, playerInfo.xPos, playerInfo.yPos, playerInfo.direction)    

      this.redGhost = new Ghost(ghostsInfo.redGhost.speed, ghostsInfo.redGhost.color, true, ghostsInfo.redGhost.xPos, ghostsInfo.redGhost.yPos, ghostsInfo.redGhost.direction)
    }  

    // draw
    draw() { 
      // draw the cells and their content
      let cells = this.grid.cells
      debugger
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

        let ghostXTemp = this.redGhost.xPos + ghostsInfo.redGhost.radius
        let ghostYTemp = this.redGhost.yPos + ghostsInfo.redGhost.radius
  
        c.arc(ghostXTemp, ghostYTemp, ghostsInfo.redGhost.radius, 0, Math.PI*2, false)
        c.fillStyle = this.redGhost.color
        c.fill()
        c.stroke()

        if(pelletCount === 0 ) {
          this.isGameOn = false
          console.log('you win')
        }
    }

    ghostInEdibleMode() {
       // ghosts turn green for now
       this.redGhost.color = 'green'

       this.mode = 'flash'

       this.isFirstIterationInFlashMode = true 

       console.log('!!! big-pellet eaten! Green ghost. In flash mode!-----------')
    }

    ghostInNormalMode() {
      this.redGhost.color = 'red'
      this.mode = 'normal'
      this.isFirstIterationInFlashMode = false
    }

    bigPelletEaten() {
      this.ghostInEdibleMode()

      // reset timeout
      if(timeoutId)   clearTimeout(timeoutId)
       
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
      let tempXPos,
      tempYPos,
      pacmanPos
    
      let redGhostPos = this.redGhost.xPos + ',' + this.redGhost.yPos
    
      let nextPos  
      let currentPos = this.redGhost.xPos + ',' + this.redGhost.yPos

      // if at center of a cell and normal mode
      if(this.redGhost.xPos % 50 === 0 && this.redGhost.yPos % 50 === 0 && this.mode === 'normal') {
       
        // if(this.player.xPos % deltaX !== 0 && this.player.yPos % deltaY !== 0) {
        tempXPos = Math.floor(this.player.xPos / deltaX) * deltaX
        tempYPos = Math.floor(this.player.yPos / deltaY) * deltaY
        pacmanPos = tempXPos + ',' + tempYPos

        // update ghost position
        nextPos = this.redGhost.maybeMove(gridObj, pacmanPos, redGhostPos)

        // store nextPos
        // nextPos = nextPos.split(',')
        this.redGhost.nextXPos = nextPos.xPos
        this.redGhost.nextYPos = nextPos.yPos

        nextPos = nextPos.xPos + ',' + nextPos.yPos

        // update direction
        this.redGhost.direction = this.redGhost.determineDirection(currentPos, this.redGhost.nextXPos + ',' + this.redGhost.nextYPos)
        if(!this.redGhost.direction) console.log('maybeMove function direction undefined')
      }
      // when it's not at center and in flash mode
      // whwen it's at center and in flash mode
      else if (this.mode === 'flash'){  
        if(this.isFirstIterationInFlashMode === true ) {
          // for the fist iteration of flah
          // switch to opposite direction
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

          // move
          this.redGhost.move(this.redGhost.direction, this.redGhost.xPos, this.redGhost.yPos)

          // reset 
          this.isFirstIterationInFlashMode = false
        }

        // check isAtCenter
        let isCenter = this.redGhost.isAtCenter()

        //  if yes
        //    // get all accessible neighbors
        //          if more than one neighbor
        //            get directions
        //            delete opposite of current direction one, then random direction
        if(isCenter) {  
          let currentPos = this.redGhost.xPos + ',' + this.redGhost.yPos

          let availableNeighbors = this.redGhost.getAccessibleNeighbors_bfs(gridObj, currentPos)

          let availableDirections = []

          console.log('isC3nter - availableNeighbors', availableNeighbors)
          if(availableNeighbors.length > 1) {
            console.log('isCenter - more than 1 neighbor')

            availableNeighbors.forEach(neighbor => {
              direction = this.redGhost.determineDirection(currentPos, neighbor)
              availableDirections.push(direction)
            })

            console.log('availableDirections', availableDirections)
            console.log('this.redGhost.direction', this.redGhost.direction)
            let oppositeDirection = this.redGhost.getOppositeDirection(this.redGhost.direction)

            console.log('oppositeDirection', oppositeDirection)

            let index = availableDirections.indexOf(oppositeDirection)
            if( index >= 0) {
              availableDirections.splice(index, 1)
            } 

            console.log('availableDirections', availableDirections)

            let len = availableDirections.length
 
            let randNum = Math.floor(Math.random() * len)
          
            this.redGhost.direction = availableDirections[randNum]

            console.log('ghost direction', this.redGhost.direction)
          }
           
          else {
            console.log('isCenter - 1 neighbor')
            this.redGhost.direction = this.redGhost.getOppositeDirection(this.redGhost.direction)
            console.log('ghost direction', this.redGhost.direction)
          }
        }
      }
       
      // move
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
        switch (e.code) {
          case 'ArrowRight':
            this.player.userDirectionInput = 'right'
            break  
          case 'ArrowLeft':
            this.player.userDirectionInput = 'left'
            break
          case 'ArrowUp':
              this.player.userDirectionInput = 'up'   
            break
          case 'ArrowDown':
              this.player.userDirectionInput = 'down' 
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

  requestId = requestAnimationFrame(animation)

  if (!engine.isGameOn) {
    cancelAnimationFrame(requestId);
    requestId = undefined;
    console.log('game over ')
  }

  engine.update()  
}

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



//populate gridObj
let gridObj = {}
scaleGrid(grid)

let engine = new Engine() 
engine.setUp()
engine.listen()
engine.draw()

animation()

