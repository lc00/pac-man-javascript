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
//     let x = Math.random() * canvas.width
//     let y = Math.random() * canvas.height
//     let radius = Math.random() * 50

//     // c.beginPath()
//     // c.arc(x, y, radius, 0, Math.PI * 2, false)
//     // c.strokeStyle = 'blue'
//     // c.stroke()

//     // animate(x,y, radius)
    
// }

let x = 200
let y = 200
let dx = 5
let dy = 5
let radius = 30

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)

    c.beginPath()
    c.arc(x, y, radius, 0, Math.PI * 2, false)
    c.strokeStyle = 'blue'
    c.stroke()
    console.log('ahh')
    console.log('innerwidth', innerWidth)
    x = x + dx
    y = y + dy

    if (x + radius > innerWidth || x - radius < 0){
        dx = -dx
    }
    if (y + radius > innerHeight || y - radius < 0){
        dy = -dy
    }
    console.log('x', x)
}

// animate()