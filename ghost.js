class Ghost extends Character {
  constructor(speed, color, isLive, xPos, yPos, direction) {
        super(speed, color, isLive)
        this.xPos = xPos
        this.yPos = yPos
        this.direction = direction
        this.userDirectionInput = null
        this.nextXPos = null
        this.nextYPos = null
    }
  
    eat() {
  
    }

    move(direction, xPos, yPos) {
      xPos = Number(this.xPos)
      yPos = Number(this.yPos)

      switch (direction) {
        case 'left':
            xPos = xPos - this.speed  
            break
        case 'right':
            xPos = xPos + this.speed
            break
        case 'up':
            yPos = yPos - this.speed
            break
        case 'down':
            yPos = yPos + this.speed
            break
      }
      return {xPos, yPos}
    }
  
    isAtCenter() {

      return this.xPos % 50 === 0 && this.yPos % 50 === 0 ? true : false 

  
      // switch (this.direction) {
      //     case 'left':
      //     case 'right':
      //         result = this.xPos % 50 === 0 ? true : false
      //         // console.log('isAtCenter, L or R', result)
      //         return result
      //       break
      //     case 'up':
      //     case 'down':
      //         result = this.yPos % 50 === 0 ? true : false
      //         // console.log('isAtCenter, U or D', result)
      //         return result
      //       break
      //     default:
      //       return null
      //       break
      // }
    }

    // todo 
    determineDirection(currentPos, nextPos) {
      console.log('currentPos', currentPos)
      console.log('nextPos', nextPos)
      let result
      let [xCurrent, yCurrent] = currentPos.split(',')
      let [xNext, yNext] = nextPos.split(',')
      
      if(xNext - xCurrent > 0)        return 'right'
      else if (xNext - xCurrent < 0)  return 'left'
      else if (yNext - yCurrent > 0)  return 'down'
      else if (yNext - yCurrent < 0)  return 'up'
      else                            return undefined
    }

    maybeMove(grid, pacmanPos, ghostPos) {
      // let isAtCenter = this.isAtCenter()
      let deltaX = grid.width / grid.numXCell
      let deltaY = grid.height / grid.numYCell

      let tempX
        let tempY

        // let userDirectionInput = this.player.userDirectionInput
        let horizontalDirArr = ['left', 'right']
        let verticalDirArr = ['up', 'down']
        let dirArr = ['right', 'down', 'left', 'up']

        let arr = this.bfs(grid, pacmanPos, ghostPos)
        if(arr == 'undefined') {
          throw new Error('arr from the bfs result is undefined')
        }

        let nextPos = arr[0].split(',')

        let xPos = nextPos[0]
        let yPos = nextPos[1]

        return {xPos, yPos}

    }

    isNeighbor(arrayItem, key) {
      console.log('arrayItem', arrayItem)
      let [x,y] = arrayItem.split(',')
    
      // let [keyX, keyY] = key.split(',')
    
      let leftItem = Number(x) - 50 + ',' + Number(y)
      let rightItem = Number(x) + 50 + ',' + Number(y)
      let topItem = Number(x) + ',' + (Number(y) - 50)
      let bottomItem = Number(x) + ',' + (Number(y) + 50)
    
      console.log('leftItem', leftItem)
      console.log('rightItem', rightItem)
      console.log('topItem', topItem)
      console.log('bottomItem', bottomItem)
    
      switch (key) {
        case leftItem:
        case rightItem:
        case topItem:
        case bottomItem:
          return true
        default:
          return false
      }
    
    
    }

    getAccessibleNeighbors_bfs(grid, key) {
      let coordArr = key.split(',')
      let [ x , y ] = coordArr
      let left = Number(x) - 50 + ',' + Number(y)
      let right = Number(x) + 50 + ',' + Number(y)
      let top = Number(x) + ',' + (Number(y) - 50)
      let bottom = Number(x) + ',' + (Number(y) + 50)

      let resultArr = []

      let neighborArr = []
      neighborArr.push(left)
      neighborArr.push(top)
      neighborArr.push(right)
      neighborArr.push(bottom)  

      neighborArr.forEach(key => {
        if (key in grid && grid[key] !== 'wall') {
          resultArr.push(key)
        }
      })

      return resultArr
    }

    getAccessibleNeighbors(grid, key) {
      let coordArr = key.split(',')
      let [ x , y ] = coordArr
      let left = Number(x) - 50 + ',' + Number(y)
      let right = Number(x) + 50 + ',' + Number(y)
      let top = Number(x) + ',' + (Number(y) - 50)
      let bottom = Number(x) + ',' + (Number(y) + 50)

      let resultArr = []

      let neighborArr = []
      neighborArr.push(left)
      neighborArr.push(top)
      neighborArr.push(right)
      neighborArr.push(bottom)  

      neighborArr.forEach(key => {
        if (key in grid && grid[key].content !== 'wall') {
          resultArr.push(key)
        }
      })

      return resultArr
    }
  
    bfs(grid, pacmanPos, ghostPos) {
      let visited = []
      let queue = []
      let pathArr = []
    
      // add nodes to queue
      queue.push(ghostPos)
    
      // shift one
      while(queue.length > 0) {
        let key = queue.shift()
        console.log('')
        console.log('key...', key)

        if(key == '0,200') {
          console.log('blah')
        }
    
          // is it visited
        if(visited.indexOf(key) >= 0)  continue
        else {
        // if no, explore
        // check if cell exist
    
        // does it have pac-man
        // if yes, return
          if (key === pacmanPos) {
                    // go through each array in pathArr to find if the array's last item is a neighbor for
            // this key
            for (let i=0; i<pathArr.length; i++) {
              let arr = pathArr[i]
              let item
              arr.length <= 1 ? item = arr[0] : item = arr[arr.length-1]
    
    console.log(' pac-man pathArr', pathArr)
    console.log('pac-man arr', arr)
    console.log('pac-man arr[arr.length-1]', arr[arr.length-1])
    console.log('pac-man item!!', item)
    
            // if yes, add into this array
              if(this.isNeighbor(item, key))  {
                arr.push(key)
                pathArr.push(arr)
                console.log('!!! pathArr !!!', pathArr)
    
                // take out the starting pos of ghost
                arr.shift()
                return arr
              }
    
              // else, check the previous item if it's a neighbor
              else {
                //  if yes, create a copy of this array and add key into this array
                let item
                arr.length <= 2 ? item = arr[0] : item = arr[arr.length-2]
    
                if(this.isNeighbor(item, key)) {
                  let newArr = JSON.parse(JSON.stringify(arr))
                  newArr.pop()
                  newArr.push(key)
                  pathArr.push(newArr)
                  
    
                // take out the starting pos of ghost
                  newArr.shift()
                  return newArr
                } 
                else continue
              }
            }
          }
          
        // else, add its neighbors that don't have a wall
          else {
    
            // go through each array in pathArr to find if the array's last item is a neighbor for
            // this key
    
            if(pathArr.length === 0)  {
              let arr = []
              arr.push(key)
              pathArr.push(arr)
            }
            else {
              for (let i=0; i<pathArr.length; i++) {
                let arr = pathArr[i]
                let item
                arr.length <= 1 ? item = arr[0] : item = arr[arr.length-1]
    
      console.log('pathArr', pathArr)
      console.log('arr', arr)
      console.log('arr[arr.length-1]', arr[arr.length-1])
      console.log('item!!', item)
              // if yes, add into this array
                if(key == '0,200') {
                  console.log('blah')
                }

                if(this.isNeighbor(item, key))  {
                  arr.push(key)
                  break
                }
      
              // else, check the previous item if it's a neighbor
                else {
                  //  if yes, create a copy of this array and add key into this array
                  let item
                  arr.length <= 2 ? item = arr[0] : item = arr[arr.length-2]
    
                  if(this.isNeighbor(item, key)) {
                    let newArr = JSON.parse(JSON.stringify(arr))
                    newArr.pop()
                    newArr.push(key)
                    pathArr.push(newArr)
                    break
                  } 
                  else continue
                }
              }
      
            }
    
            visited.push(key)

            let accessibleNeighborArr = this.getAccessibleNeighbors_bfs(grid, key)

            accessibleNeighborArr.forEach(item => {
              queue.push(item)
            })
    
            // let coordArr = key.split(',')
            // let [ x , y ] = coordArr
            // let left = Number(x) - 50 + ',' + Number(y)
            // let right = Number(x) + 50 + ',' + Number(y)
            // let top = Number(x) + ',' + (Number(y) - 50)
            // let bottom = Number(x) + ',' + (Number(y) + 50)
    
            // let neighborArr = []
            // neighborArr.push(left)
            // neighborArr.push(top)
            // neighborArr.push(right)
            // neighborArr.push(bottom)  
    
            // neighborArr.forEach(key => {
            //   if (key in grid && grid[key] !== 'wall') {
            //     queue.push(key)
      
            //   }
            // })
            
          
            console.log('queue...', queue)    
            console.log('!!! pathArr !!!', pathArr)

            if(key == '150,200' || key == '250,150')  {
              console.log('hiii')
            }
    
          }
            
        }
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

checkJunction(grid) {
  let key = this.xPos + ',' + this.yPos
  let arr = this.getAccessibleNeighbors(grid, key)
  let len = arr.length

  let nextPos

  if(len > 2) return true
  else        return false
}

getOppositeDirection(direction) {
  switch (direction) {
    case 'left':
      return 'right'  
    case 'right':
      return 'left'
    case 'up':
      return 'down'
    case 'down':
      return 'up'
  }
}

semiRandom(grid) {
  let currentPos = this.xPos + ',' + this.yPos
  let arr = this.getAccessibleNeighbors(grid, currentPos)
  let availableDirectionArr = []

  let direction

  // get available directions
  arr.forEach(cell => {
    direction = this.determineDirection(currentPos, cell)
    availableDirectionArr.push(direction)
  })

  // get the opposite direction of the current direction
  // delete it

  console.log('-------------- this direction: ', this.direction, '--------------')
  console.log('-----------------------------------------------------------------')
  let oppositeDir = this.getOppositeDirection(this.direction)

  let index = availableDirectionArr.indexOf(oppositeDir)

  if(index >= 0)  availableDirectionArr.splice(index, 1)
  else           { throw new Error('semiRandom function - something went wrong with availableDirectionArr')
  }

  let len = availableDirectionArr.length
  // get randNum
  // return arr[randNum]  
  let randNum = Math.floor(Math.random() * len)

  return arr[randNum]


}

  
random(grid) {
  let isAtCenter = this.isAtCenter()
  let deltaX = 50
  let deltaY = 50

  let tempX
    let tempY
    let nextPos

    // let userDirectionInput = this.player.userDirectionInput
    let horizontalDirArr = ['left', 'right']
    let verticalDirArr = ['up', 'down']
    let dirArr = ['right', 'down', 'left', 'up']

  // if at center, get neighbors' content
  // for ones that can be moved to, do random diction
  // for only one that can move to
  //return that neighbor's coord
  if(isAtCenter) {
    let key = this.xPos + ',' + this.yPos
    let arr = this.getAccessibleNeighbors(grid, key)
    let len = arr.length

    if(len <= 2) {
      nextPos = arr[0]
    }
    else {
      let randNum = Math.floor(Math.random() * len)

      nextPos = arr[randNum]
    }
  }

  this.direction = this.determineDirection(this.xPos + ',' + this.yPos, nextPos)

  //return next cell coord
  let nextCell = this.determinePos(this.direction, this.xPos, this.yPos, deltaX, deltaY)
  let xPos = nextCell.x
  let yPos = nextCell.y
  

  // if at center, determine if current direction is viable
  // if yes, continue 
  // else do a random direction
  // if (isAtCenter) {   
  //   let newPos = this.determinePos(this.direction, this.xPos, this.yPos, deltaX, deltaY)
  //   tempX = newPos.x
  //   tempY = newPos.y

  //   let nextCell = grid.getCell(tempX, tempY)
  //   let pos

  //   if(nextCell && nextCell.content === 'wall' || nextCell === false){
      
  //     let randNum = Math.floor(Math.random() * 4)
  //     this.direction = dirArr[randNum]

  //     let newPos = this.determinePos(this.direction, this.xPos, this.yPos, deltaX, deltaY)
  //       tempX = newPos.x
  //       tempY = newPos.y
  //   }
      
  // }
  
  // // not center
  // else {
  //   switch (this.direction ) {
  //       case 'left':
  //           tempX = (Math.floor(this.xPos / deltaX) ) * deltaX
  //           tempY = this.yPos
  //           break
  //       case 'right':
  //           tempX = (Math.floor(this.xPos / deltaX) + 1) * deltaX
  //           tempY = this.yPos
  //           break
  //       case 'up':
  //           tempY = (Math.floor(this.yPos / deltaY) ) * deltaY
  //           tempX = this.xPos
  //           break
  //       case 'down':
  //           tempY = (Math.floor(this.yPos / deltaY) + 1) * deltaY
  //           tempX = this.xPos
  //           break
  //     }
  //   }

  // let nextCell = grid.getCell(tempX, tempY)
  // let pos

  // if(nextCell && nextCell.content !== 'wall'){

  //   pos = this.move(this.direction)
  //   this.xPos = pos.xPos
  //   this.yPos = pos.yPos
  // }
  // else {
  //   pos = {
  //     xPos: this.xPos,
  //     yPos: this.yPos
  //   }
  // }
  
  console.log(`ghost direction ${this.direction}`)
  console.log(`ghost xPos: ${this.xPos}, ghost yPos: ${this.yPos}`)

  return {xPos, yPos}

}
    
}