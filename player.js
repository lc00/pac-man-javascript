class Character {
    constructor(speed) {
        this.speed = speed
    }

    get position () {
        return {
            xPos: this.xPos,
            yPos: this.yPos
        }
    }

    move(direction) {
        switch (direction) {
            case 'left':
                this.xPos -= this.speed
                break
            case 'right':
                this.xPos += this.speed
                break
            case 'up':
                this.yPos += this.speed
                break
            case 'down':
                this.yPos -= this.speed
                break
        }
        
        return {
            xPos: this.xPos,
            yPos: this.yPos
        }
    }
}

class Player extends Character{
    constructor(speed, xPos, yPos) {
        super(speed)
        this.xPos = xPos
        this.yPos = yPos
    }

    eat() {

    }
}
// let player = new Player(1, 0, 0)

// let {xPos, yPos} = player.move('left')
// console.log(`player position: ${xPos}, ${yPos}`)

// let pos = player.move('right')
// console.log(`player position: ${pos.xPos}, ${pos.yPos}`)

// pos = player.move('up')
// console.log(`player position: ${pos.xPos}, ${pos.yPos}`)

// pos = player.move('down')
// console.log(`player position: ${pos.xPos}, ${pos.yPos}`)


module.exports = {Player}

// export {Player}