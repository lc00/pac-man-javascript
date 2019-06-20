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

generateButton.addEventListener('click', generateGrid);
startMapButton.addEventListener('click', startMap);

function generateGrid() {
    // grab the width and height in cell count
    const horizontileCellCount = document.querySelector('#horizontalNum').value
    const verticalCellCount = document.querySelector('#verticalNum').value
    const width = canvasWidth / horizontileCellCount
    const height = canvasWidth / verticalCellCount
    let startPtX = 10
    let startPtY = 10

  for (let j=0; j< verticalCellCount; j++){
    for(let i=0; i<horizontileCellCount; i++) {

      canvasHelper.rectangle({
          x: startPtX,
          y: startPtY, 
          width: width, 
          height: height});

      gridObj[i + ',' + j] = 'empty'

      startPtX += width
    }
    startPtX = 10
    startPtY += height
  }

console.log('gridobj', gridObj)

}

function startMap() {
  
}

// [x] have x,y for each created cell

// [x] add button for start, end, delete

// []  add detection when the start button is pressed, whenever mouse is 
//    pressed down and it's within the grid area, a line starts showing
//    up 

// when delete button is pressed, when mouse is pressed down and it's 
//    within the grid area, whichever cell the mouse is at, the mark
//    is deleted
//    if mouse is right between two cells, the mark for both cells 
//    are deleted
//    (note: at the tip of the mouse, it has a rectangle/square that has the same width and 
//    height as the cell)

// when end button is pressed, print out an object of normalized coord and 
//    its content
