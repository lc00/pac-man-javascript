let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext('2d')

// // rectangle
// c.fillStyle = 'rgba(255, 0, 0, 0.1)'
// c.fillRect(100, 100, 100, 100)
// c.fillRect(400, 100, 100, 100)
// c.fillRect(300, 300, 100, 100)
// // console.log(canvas)

// // line
// c.beginPath()
// c.moveTo(50, 300)
// c.lineTo(100,100)
// c.lineTo(400, 400)
// c.strokeStyle= '#fa34a3'
// c.stroke()

// circle
// c.beginPath()
// c.arc(300, 300, 30, 0, Math.PI * 2, false)
// c.strokeStyle = 'blue'
// c.stroke()

// let x = 200
// let y = 200


// let dx = 5
// let dy = 5
// let radius = 30

// for(let i = 0; i < 1; i++) {
    // let x = Math.random() * canvas.width
    // let y = Math.random() * canvas.height
    // let dx = 5
    // let dy = 5
    // let radius = 30
    // let x = 200
    // let y = 200
    // let radius = Math.random() * 50

    // c.beginPath()
    // c.arc(x, y, radius, 0, Math.PI * 2, false)
    // c.strokeStyle = 'blue'
    // c.stroke()

    // animate(x,y,radius)
    
// }

const pauseTime = 50


function pause() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, pauseTime)
    })
  }

class Circle {
    constructor(x,y,radius) {
        this.x = x
        this.y = y
        this.radius = radius
        this.dx = 5
        this.dy = 5
    

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = 'blue'
        c.stroke()
        console.log('draw...')
        console.log('x', this.x)
        console.log('y', this.y)
        console.log('dx', this.dx)
        console.log('dy', this.dy)

        // await pause()
        // this.update()
    
    }

    this.update = function() {
        c.clearRect(0, 0, innerWidth, innerHeight)
        console.log('update...')

        this.x = this.x + this.dx
        this.y = this.y + this.dy

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = - this.dx
            console.log('hi, dx')
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = - this.dy
            console.log('hi, dy')

        }


        this.draw()
    }
}

    
}




let circle = new Circle(200, 200, 30)
circle.draw()
// circle.update()


let x = Math.random() * canvas.width
let y = Math.random() * canvas.height
let dx = 5
let dy = 5
let radius = 30
// let radius = Math.random() * 50

function animate() {
    requestAnimationFrame(animate)

    circle.update()


}

animate()