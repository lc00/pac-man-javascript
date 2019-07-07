

function maybeMove(grid) {
  let isAtCenter = this.isAtCenter()
  let deltaX = grid.width / grid.numXCell
  let deltaY = grid.height / grid.numYCell

  let tempX
    let tempY
    let newPos
    // let userDirectionInput = this.player.userDirectionInput
    let horizontalDirArr = ['left', 'right']
    let verticalDirArr = ['up', 'down']
    let dirArr = ['right', 'down', 'left', 'up']
// console.log('isAtCenter', isAtCenter )
// console.log('this.player.userDirectionInput', this.player.userDirectionInput)
// console.log('userDirectionInput', userDirectionInput)

  // if at center, determine if current direction is viable
  // if yes, continue 
  // else do a random direction
  if (isAtCenter) {   
    
    
    let newPos = this.determinePos(this.direction, this.xPos, this.yPos, deltaX, deltaY)
    tempX = newPos.x
    tempY = newPos.y

    let nextCell = grid.getCell(tempX, tempY)
    let pos

    


    if(nextCell && nextCell.content === 'wall' || nextCell === false){
      //   // clear pac-man's previous position in cell
      //   // let prevX = this.player.xPos
      //   // let prevY = this.player.yPos
      //   // let str = prevX + ',' + prevY
      //   // grid.cells[str].content = 'empty'

      //   pos = this.move(this.direction)
      //   this.xPos = pos.xPos
      //   this.yPos = pos.yPos
      
      let randNum = Math.floor(Math.random() * 4)
      this.direction = dirArr[randNum]
      //  this.direction = 'left'

      let newPos = this.determinePos(this.direction, this.xPos, this.yPos, deltaX, deltaY)
        tempX = newPos.x
        tempY = newPos.y
    }
      
  }
  // not at center, continue at the current direction
  // else {
  //   if(this.player.userDirectionInput !== null) {
  //     if(horizontalDirArr.indexOf(this.player.direction) >= 0 
  //         && horizontalDirArr.indexOf(this.player.userDirectionInput) >= 0) {
  //       this.player.direction = this.player.userDirectionInput
  //     } 
  //     else if ( verticalDirArr.indexOf(this.player.direction) >=0
  //         && verticalDirArr.indexOf(this.player.userDirectionInput) >= 0){
  //       this.player.direction = this.player.userDirectionInput
  //     }
  //   }

  
  // not center
  else {
    switch (this.direction ) {
        case 'left':
            tempX = (Math.floor(this.xPos / deltaX) ) * deltaX
            tempY = this.yPos
            break
        case 'right':
            tempX = (Math.floor(this.xPos / deltaX) + 1) * deltaX
            tempY = this.yPos
            break
        case 'up':
            tempY = (Math.floor(this.yPos / deltaY) ) * deltaY
            tempX = this.xPos
            break
        case 'down':
            tempY = (Math.floor(this.yPos / deltaY) + 1) * deltaY
            tempX = this.xPos
            break
      }
      // }
    }

let nextCell = grid.getCell(tempX, tempY)
let pos

  if(nextCell && nextCell.content !== 'wall'){
    // clear pac-man's previous position in cell
    // let prevX = this.player.xPos
    // let prevY = this.player.yPos
    // let str = prevX + ',' + prevY
    // grid.cells[str].content = 'empty'

    pos = this.move(this.direction)
    this.xPos = pos.xPos
    this.yPos = pos.yPos
  }
  else {
    pos = {
      xPos: this.xPos,
      yPos: this.yPos
    }
  }
  
  
  console.log(`ghost direction ${this.direction}`)
  console.log(`ghost xPos: ${this.xPos}, ghost yPos: ${this.yPos}`)

  return pos

}
