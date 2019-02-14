
// references:
// https://valhead.com/2017/07/21/animating-with-css-variables/
// https://github.com/jackrugile/start-making-games/blob/gh-pages/src/js/G/ball.js


var [xPosCurrent,yPosCurrent,xPosNew, yPosNew, xpos, ypos] = [0,0,0,0, 0, 0];

// returns the root element of the html
const rootEl = document.documentElement;

// returns the style or css of the root element
const docStyle = rootEl.style


let parentEl = document.querySelector('#container')

console.dir('parentEl', parentEl)
// let parentElWidth = parentEl.clientWidth
// let parentElHeight = parentEl.clientHeight
// let parentElOffsetWidth = parentEl.offsetWidth
// let parentElOffsetHeight = parentEl.offsetHeight

// console.log('parentElWidth', parentElWidth)
// console.log('parentElHeight', parentElHeight)
// console.log('parentElOffsetWidth', parentElOffsetWidth)
// console.log('parentElOffsetHeight', parentElOffsetHeight)

function moveIt(xpos) {
  console.log('xpos', xpos)
  console.log('ypos', ypos)
  docStyle.setProperty('--mouse-x', xpos);
  docStyle.setProperty('--mouse-y', ypos);

  // requestAnimationFrame(moveIt);

}

function moveRecursive(xpos, status) {
  if(xpos > 500 || status != true){
    return
  } else {
    xpos += 1
    moveIt(xpos)

    // add pause for 10ms
    return moveRecursive(xpos, status)
  }


}

let status = true

document.addEventListener('keydown', function(e){ 
  console.log('e.code.....', e.code)
  
  let moveInterval
  let moveLeftInterval
  clearInterval(moveInterval)
  moveInterval = 0
  console.log('moveInterval ---------', moveInterval)

  clearInterval(moveLeftInterval)
  moveLeftInterval = 0
  console.log('moveLeftInterval -------------', moveLeftInterval)

  if(e.code == 'ArrowLeft') {
    status = false
  }

  switch (e.code) {
    case 'ArrowRight':

      // moveInterval = setInterval(() => {
      //   if(xpos < 500 && moveInterval != 0) { 
      //     console.log('moveInterval setInterval', moveInterval)         
      //     xpos += 3    
      //     moveIt()
      //   }
      //   else {
      //     clearInterval(moveInterval)
      //     // moveInterval = 0
      //     console.log('moveInterval', moveInterval)
      //   }
      // }, 10)

      moveRecursive(xpos, status)
      break  
      
    case 'ArrowLeft':
      moveLeftInterval = setInterval(() => {
        if(xpos < 0 && moveLeftInterval != 0) {          
          xpos -= 3    
          moveIt()
        }
        else {
          clearInterval(moveLeftInterval)
          moveLeftInterval = 0
          console.log('moveLeftInterval', moveLeftInterval)
        }
      }, 10)
      break
    case 'ArrowUp':
      ypos -= 100
      // if(ypos <= 0) ypos = 0
      // console.log('blahh ypos', ypos)
      moveIt()
      break
    case 'ArrowDown':
      ypos += 100
      // if(ypos <= 0) ypos = 0
      // console.log('blahh ypos', ypos)

      moveIt()
      break
    default:
      break
   
  }


  
})