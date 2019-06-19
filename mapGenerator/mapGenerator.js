const main = document.querySelector('main');
const generateButton = document.querySelector('button#generateGrid');
const canvas = document.querySelector('canvas');
const canvasWidth = 500;
const canvasHeight = 500;
const canvasHelper = CanvasHelper(canvas, canvasWidth, canvasHeight);

generateButton.addEventListener('click', generateGrid);

function generateGrid() {
    // grab the width and height in cell count
    const horizontileCellCount = document.querySelector('#horizontalNum').value
    const verticalCellCount = document.querySelector('#verticalNum').value
    const width = canvasWidth / horizontileCellCount
    const height = canvasWidth / verticalCellCount
    let startPtX = 10
    let startPtY = 10

  for (let i=0; i< verticalCellCount; i++){
    for(let j=0; j<horizontileCellCount; j++) {

      canvasHelper.rectangle({
          x: startPtX,
          y: startPtY, 
          width: width, 
          height: height});

      startPtX += width
    }
    startPtX = 10
    startPtY += height
  }
}