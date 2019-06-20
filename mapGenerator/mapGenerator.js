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

const canvasOffsetX = 0
const canvasOffsetY = 10

let width
let height

generateButton.addEventListener('click', generateGrid);
startMapButton.addEventListener('click', startMap)
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

  for (let j=0; j< verticalCellCount; j++){
    for(let i=0; i<horizontileCellCount; i++) {

      canvasHelper.rectangle({
          x: startPtX,
          y: startPtY, 
          width: width, 
          height: height
        });

      gridObj[i + ',' + j] = 'empty'

      startPtX += width
    }
    startPtX = canvasOffsetX
    startPtY += height
  }

console.log('gridobj', gridObj)

}

let isDown = false

function startMap(e) {
  // onmousedown
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

    let x = e.x - canvasOffsetX
    // e is based on the window, not the canvas, therefore the e.y needs 155 offset
    let y = e.y - 155   

    let xNormalized = x / width
    let yNormalized = y / height

    // determine which cell it is in
    let cellX = Math.floor(xNormalized % width)
    let cellY = Math.floor(yNormalized % height)

    gridObj[cellX + ',' + cellY] = 'filled'
    console.log('cellX', cellX, 'cellY', cellY)

    // draw
    canvasHelper.rectangle({
      x: cellX * width + canvasOffsetX,
      y: cellY * height + canvasOffsetY, 
      width: width, 
      height: height,
      fill: true
    });
  }
}



// [x] have x,y for each created cell

// [x] add button for start, end, delete

// [x]  add detection when the start button is pressed, whenever mouse is 
//    pressed down and it's within the grid area, the cell that the mouse
//    is at is filled


// when delete button is pressed, when mouse is pressed down and it's 
//    within the grid area, whichever cell the mouse is at, the mark
//    is deleted
//    if mouse is right between two cells, the mark for both cells 
//    are deleted
//    (note: at the tip of the mouse, it has a rectangle/square that has the same width and 
//    height as the cell)

// when end button is pressed, print out an object of normalized coord and 
//    its content
