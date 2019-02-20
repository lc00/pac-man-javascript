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

// function animate() {
//     circle.update()
//     requestAnimationFrame(animate)
// }

const pauseTime = 0
function pause() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, pauseTime)
    })
  }

class Circle {
    constructor(x,y,dx,dy,radius) {
        this.x = x
        this.y = y
        this.radius = radius
        this.dx = dx
        this.dy = dy
    }
    
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = 'blue'
        c.stroke()
        console.log('draw...')
    }
    update() {
        // c.clearRect(0, 0, innerWidth, innerHeight)
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

let arr = []
for(let i = 0; i < 120; i++ ) {
    let x = Math.random() * innerWidth
    let y = Math.random() * innerHeight
    let dx = (Math.random() -0.5) *8
    let dy = (Math.random() -0.5) *8
    let radius = Math.random() * 50
    arr.push(new Circle(x, y, dx, dy, radius))
}

animate()

/* The window.requestAnimationFrame() method tells
    the browser that you wish to perform an animation 
    and requests that the browser call a specified 
    function to update an animation before the next repaint. 
    The method takes a callback as an argument to be invoked 
    before the repaint.
    You should call this method whenever you're ready to update
    your animation onscreen. This will request that your animation 
    function be called before the browser performs the next repaint. 
    The number of callbacks is usually 60 times per second, 
    but will generally match the display refresh rate in most web 
    browsers as per W3C recommendation. requestAnimationFrame() 
    calls are paused in most browsers when running in background tabs 
    or hidden <iframe>s in order to improve performance and 
    battery life.
*/
function animate() { 
    c.clearRect(0, 0, innerWidth, innerHeight)
    requestAnimationFrame(animate)

    for(let i=0; i<arr.length; i++) {
        console.log('circle', i, arr[i])
        arr[i].update() 
    }
}

