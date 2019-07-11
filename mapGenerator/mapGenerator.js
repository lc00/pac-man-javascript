const main = document.querySelector('main');
const generateButton = document.querySelector('button#generateGrid');
const startMapButton = document.querySelector('button#startMap');
const modifyMapButton = document.querySelector('button#modifyMap');
const doneButton = document.querySelector('button#done');
const canvas = document.querySelector('canvas');
const canvasWidth = 500;
const canvasHeight = 500;
const canvasHelper = CanvasHelper(canvas, canvasWidth, canvasHeight);
let gridObj = {}
let isMouseDown = false
let isStartMapBtnPressed = false
let isModifyMapBtnPressed = false

const canvasOffsetX = 0
const canvasOffsetY = 10

let width
let height

generateButton.addEventListener('click', generateGrid);
startMapButton.addEventListener('click', startMap)
modifyMapButton.addEventListener('click', modifyMap)
doneButton.addEventListener('click', doneMap)
canvas.addEventListener('mousedown', mouseDown)
canvas.addEventListener('mouseup', mouseUp)
canvas.addEventListener('mousemove', mouseMove)

function generateGrid() {
    // grab the width and height in cell count
    const horizontileCellCount = document.querySelector('#horizontalNum').value
    const verticalCellCount = document.querySelector('#verticalNum').value
    width = canvasWidth / horizontileCellCount
    height = canvasWidth / verticalCellCount
    let startPtX = canvasOffsetX
    let startPtY = canvasOffsetY
    
    console.log('width', width)
    console.log('height', height)

  for (let j=0; j< verticalCellCount; j++){
    for(let i=0; i<horizontileCellCount; i++) {

      canvasHelper.rectangle({
          x: startPtX,
          y: startPtY, 
          width: width, 
          height: height
        });

      gridObj[i + ',' + j] = ''

      startPtX += width
    }
    startPtX = canvasOffsetX
    startPtY += height
  }

console.log('gridobj', gridObj)

}

let isDown = false

function startMap(e) {
  isStartMapBtnPressed = true
  isModifyMapBtnPressed = false
}

function modifyMap(e) {
  isStartMapBtnPressed = false
  isModifyMapBtnPressed = true
}

function reDrawGrid() {
    for (let coorD in gridObj) {
      let str = coorD.split(',')
      let x = str[0] * width
      let y = str[1] * height
      let content = gridObj[coorD]

      if(content === 'wall')  content = true
      else content = false

      canvasHelper.rectangle({
        x: x + canvasOffsetX,
        y: y + canvasOffsetY, 
        width: width, 
        height: height,
        fill: content
      })
    }

  console.log('gridobj', gridObj)
  
}

function mouseDown() {
  isMouseDown = true
}

function mouseUp() {
  isMouseDown = false
}

function mouseMove(e) {
  if(isMouseDown === true) {
    // console.log('e', e)
    console.log('x', e.x, 'y', e.y)

    let x = e.x - 10
    // e is based on the window, not the canvas, therefore the e.y needs 155 offset
    let y = e.y - 145   

    let cellX = Math.floor(x / width)
    let cellY = Math.floor(y / height)

    // determine which cell it is in
    // let cellX = Math.floor(xNormalized % width)
    // let cellY = Math.floor(yNormalized % height)

    if(isStartMapBtnPressed === true) {
      gridObj[cellX + ',' + cellY] = 'wall'
      console.log( '--- isStartMapBtnPressed  ---', 'cellX', cellX, 'cellY', cellY)

  
      // draw
      canvasHelper.rectangle({
        x: cellX * width + canvasOffsetX,
        y: cellY * height + canvasOffsetY, 
        width: width, 
        height: height,
        fill: true
      });
    }

    else if (isModifyMapBtnPressed === true) {
      gridObj[cellX + ',' + cellY] = ''
      console.log( '--- isModifyMapBtnPressed  ---', 'cellX', cellX, 'cellY', cellY)
  
      // delete the grid
      canvasHelper.deleteAll(canvasWidth, canvasHeight)

      // draw the entire grid
      reDrawGrid()
      
    }


  }
}

function doneMap() {
  // for (let key in gridObj) {
  //   console.log(String(key) + ':' + gridObj[key])

  // }

  console.log('gridObj', gridObj)
}





// [x] have x,y for each created cell

// [x] add button for start, end, delete

// [x]  add detection when the start button is pressed, whenever mouse is 
//    pressed down and it's within the grid area, the cell that the mouse
//    is at is filled


// []  when delete button is pressed, when mouse is pressed down and it's 
//    within the grid area, whichever cell the mouse is at, the mark
//    is deleted
//    if mouse is right between two cells, the mark for both cells 
//    are deleted
//    (note: at the tip of the mouse, it has a rectangle/square that has the same width and 
//    height as the cell)

// []  when end button is pressed, print out an object of normalized coord and 
//    its content
