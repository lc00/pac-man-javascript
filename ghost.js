class Ghost extends Character {
  constructor(speed, color, isLive, xPos, yPos, direction) {
        super(speed, color, isLive)
        this.xPos = xPos
        this.yPos = yPos
        this.direction = direction
        this.userDirectionInput = null
    }
  
    eat() {
  
    }

    move(direction, x, y, deltaX, deltaY) {
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
  
    isAtCenter() {
      let result
  
      switch (this.direction) {
          case 'left':
          case 'right':
              result = this.xPos % 50 === 0 ? true : false
              // console.log('isAtCenter, L or R', result)
              return result
            break
          case 'up':
          case 'down':
              result = this.yPos % 50 === 0 ? true : false
              // console.log('isAtCenter, U or D', result)
              return result
            break
          default:
            return null
            break
      }
    }

    // todo 
    determineDirection(currentPos, nextPos) {

    }

    maybeMove(grid, pacmanPos, ghostPos) {
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

        if (isAtCenter) {
          let arr = this.bfs(grid, pacmanPos, ghostPos)
          let newPos = arr[0].split(',')
          let x = newPos[0]
          let y = newPos[1]
  
          let deltaX = 50
          let deltaY = 50
  
          //todo 
          // determine direction
          let direction = this.determineDirection(currentPos, nextPos)
  
        } 

        // todo 
        // not at center, keep moving in the current direction
        else {

        }



        pos = this.move(direction, x, y, deltaX, deltaY)
        this.xPos = pos.xPos
        this.yPos = pos.yPos
  
      
      
      console.log(`ghost direction ${this.direction}`)
      console.log(`ghost xPos: ${this.xPos}, ghost yPos: ${this.yPos}`)

      return pos

    }

    isNeighbor(arrayItem, key) {
      console.log('arrayItem', arrayItem)
      let [x,y] = arrayItem.split(',')
    
      // let [keyX, keyY] = key.split(',')
    
      let leftItem = Number(x) - 1 + ',' + Number(y)
      let rightItem = Number(x) + 1 + ',' + Number(y)
      let topItem = Number(x) + ',' + (Number(y) - 1)
      let bottomItem = Number(x) + ',' + (Number(y) + 1)
    
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
              if(isNeighbor(item, key))  {
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
    
                if(isNeighbor(item, key)) {
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
                if(isNeighbor(item, key))  {
                  arr.push(key)
                  break
                }
      
              // else, check the previous item if it's a neighbor
                else {
                  //  if yes, create a copy of this array and add key into this array
                  let item
                  arr.length <= 2 ? item = arr[0] : item = arr[arr.length-2]
    
                  if(isNeighbor(item, key)) {
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
    
            let coordArr = key.split(',')
            let [ x , y ] = coordArr
            let left = Number(x) - 1 + ',' + Number(y)
            let right = Number(x) + 1 + ',' + Number(y)
            let top = Number(x) + ',' + (Number(y) - 1)
            let bottom = Number(x) + ',' + (Number(y) + 1)
    
            let neighborArr = []
            neighborArr.push(left)
            neighborArr.push(top)
            neighborArr.push(right)
            neighborArr.push(bottom)  
    
            neighborArr.forEach(key => {
              if (key in grid && grid[key] !== 'wall') {
                queue.push(key)
      
              }
            })
            
          
            console.log('queue...', queue)    
            console.log('!!! pathArr !!!', pathArr)
    
          }
            
        }
      }
    }
    
}