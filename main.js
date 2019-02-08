
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

function moveIt() {
  console.log('xpos', xpos)
  console.log('ypos', ypos)
  docStyle.setProperty('--mouse-x', xpos);
  docStyle.setProperty('--mouse-y', ypos);

  // requestAnimationFrame(moveIt);

}

function wait() {

}

document.addEventListener('keydown', function(e){ 
  console.log('e.code.....', e.code)
  

  console.log('')
  switch (e.code) {
    case 'ArrowRight':
    
      // if(parentEl)
   

      let moveInterval = setInterval(() => {
        if(xpos < 500) {
          
          xpos += 3
          // wait()
          moveIt()
        }
        else {
          clearInterval(moveInterval)
          moveInterval = 0
          console.log('moveInterval', moveInterval)
        }
      }, 10)
      break  
      
    case 'ArrowLeft':
      xpos -= 100
      if(xpos <= 0) xpos = 0
      moveIt()
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