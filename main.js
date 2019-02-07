// // https://valhead.com/2017/07/21/animating-with-css-variables/

// //https://github.com/jackrugile/start-making-games/blob/gh-pages/src/js/G/ball.js


var [xPosCurrent,yPosCurrent,xPosNew, yPosNew, xpos, ypos] = [0,0,0,0, 0, 0];

// returns the root element of the html
const rootEl = document.documentElement;

// returns the style or css of the root element
const docStyle = rootEl.style

function moveIt() {
   //apply the newly calculated positions via CSS custom properties each frame. SO FANCY
  // if(xPosCurrent != xPosNew) {
  //   xPosCurrent += xPosNew
  //   console.log('moveIt xpos', xPosCurrent)
  //   docStyle.setProperty('--mouse-x', xPosCurrent);
  // }
  // if(yPosCurrent != yPosNew) {
  //   yPosCurrent += yPosNew
  //   console.log('moveIt ypos', yPosCurrent)
  //   docStyle.setProperty('--mouse-y', yPosCurrent);
  // }
  console.log('xpos', xpos)
  console.log('ypos', ypos)
  docStyle.setProperty('--mouse-x', xpos);
  docStyle.setProperty('--mouse-y', ypos);

  // requestAnimationFrame(moveIt);
}

moveIt()

document.addEventListener('keydown', function(e){ 
  console.log('e.code.....', e.code)
  
  
  switch (e.code) {
    case 'ArrowRight':
      xpos += 100
      if(xpos <= 0) xpos = 0
      // console.log('xpos', xpos)
      moveIt()
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