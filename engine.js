const {Player} = require('./player.js')

// engine
class Engine {
    constructor() {
      this.player = null

    }

    // setup
    setUp() {
      this.player = new Player(1, 0, 0)
      
    
    }  

    // draw
    draw() {}

    // update every frame;
    // infinite loop
    update(direction) {
      // todo set up a while loop
    
      let pos 
      // update position for pac-man
      while (true) {
        
          pos = this.player.move(direction)
          this.player.xPos = pos.xPos
          this.player.yPos = pos.yPos
          console.log(`xPos: ${this.player.xPos}, yPos: ${this.player.yPos}`)

      }
      
      // update position for ghost
    
    
      // update position for other objects
    
    
    
      
    
    
    }

}

let engine = new Engine() 
engine.setUp()
engine.update('left')