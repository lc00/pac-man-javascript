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
    update() {
      // todo set up a while loop
    
      // update position for pac-man
      let direction = 'left'
      this.player = this.player.move(direction)
      console.log('this.player', this.player)
      
      // update position for ghost
    
    
      // update position for other objects
    
    
    
      
    
    
    }

}






let engine = new Engine() 
engine.setUp()
engine.update()