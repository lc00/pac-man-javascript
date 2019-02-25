
let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let c = canvas.getContext('2d')

// engine
class Engine {
    constructor() {
      this.player = null

    }

    // setup
    setUp() {
      // this.player = new Player(playerInfo.speed, playerInfo.xPos, playerInfo.yPos, playerInfo.direction)
      // this.pellet = new Pellet(50, 500, 100)
      
    }  

    // draw
    draw() { 
      // c.clearRect(0, 0, innerWidth, innerHeight)

      // c.beginPath()
      // c.arc(this.player.xPos, this.player.yPos, playerInfo.radius, 0, Math.PI * 2, false)
      // // c.strokeStyle = 'blue'
      // c.fillStyle = 'orange'
      // c.fill()

      // c.beginPath()
      // c.arc(this.pellet.xPos, this.pellet.yPos, 10, 0, Math.PI * 2, false)
      // c.fillStyle = 'white'
      // c.fill()
      // c.stroke()

     
      for (let grid in gridObj) {
        if (gridObj[grid] === 'wall'){
          let [x, y] = grid.split(',')
          c.beginPath()
          c.fillStyle = 'grey'
          c.fillRect(x, y, 50, 50)
          c.strokeRect(x, y, 50, 50)
          c.stroke()

        }
        else if (gridObj[grid] === 'sm-pellet'){
          let [x, y] = grid.split(',')

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
        else if (gridObj[grid] === 'pac-man'){
          let [x, y] = grid.split(',')

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
        }
      }


    }
    
    collisionDetection() {
      if (this.player.xPos + playerInfo.radius >= this.pellet.xPos ) {
        console.log(`------ player eats pellet --------`)
      }
      // if (this.player.yPos === this.pellet.xPos) {
      //   console.log(`player eats pellet`)
      // }

      
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


// let gridNum = 5
// let iMax = gridNum * 50
// let jMax = gridNum * 50
// for (let i=0; i<iMax; i++) {
//   for( let j=0; j<jMax; j++) {
    
//     let key = i + ',' + j

//     if(i === 0 || j=== 0) {
//       gridObj[key] = 'sm-pellet'
//       console.log('ij', i,j, gridObj[key])
//     } else {
//       gridObj[key] = 'wall'
//       console.log('ij', i,j, gridObj[key])

//     }

//     j += 49

//   }
//   i += 49
// }

let engine = new Engine() 
engine.setUp()
engine.draw()
