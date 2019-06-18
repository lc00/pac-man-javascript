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

    canvasHelper.rectangle({
        x: 10,
        y: 10, 
        width: canvasWidth / horizontileCellCount, 
        height: canvasHeight / horizontileCellCount});
}