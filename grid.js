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
    // console.log('deltaX', deltaX)
    // console.log('deltaY', deltaY)
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
