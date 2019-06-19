const main = document.querySelector('main');
const generateButton = document.querySelector('button#generateGrid');
const canvas = document.querySelector('canvas');
const canvasWidth = 10;
const canvasHeight = 10;
const canvasStartPoint = {x: 10, y: 10};
const canvasHelper = CanvasHelper(canvas, canvasWidth, canvasHeight);

generateButton.addEventListener('click', generateGrid);

function generateGrid() {
    // grab the width and height in cell count
    const horizontalCellCount = document.querySelector('#horizontalNum').value
    const verticalCellCount = document.querySelector('#verticalNum').value

    //check that the canvasWidth and canvasHeight don't get to the limit
    let startPtX = canvasStartPoint.x
    let startPtY = canvasStartPoint.y
    let rectangleWidth = canvasWidth / horizontalCellCount

    // for(let j=1; j <= horizontalCellCount; j++) {
      for (let i = 1; i <= horizontalCellCount; i++) {
        console.log('startPtX', startPtX, 'startPtY', startPtY)
  
        canvasHelper.rectangle({
          x: startPtX,
          y: startPtY, 
          width: rectangleWidth, 
          height: rectangleWidth
        });
  
        startPtX += rectangleWidth
        // startPtY += rectangleWidth
  
      }

      // startPtY += rectangleWidth
  
    // }
    


}