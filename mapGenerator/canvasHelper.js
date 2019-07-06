function CanvasHelper(domNode, width, height) {
    domNode.width = width;
    domNode.height = height;

    const canvas = domNode.getContext('2d');

    const rectangle = ({x, y, width, height, color = 'grey', fill = false, stroke = true}) => {
        canvas.beginPath();
        canvas.fillStyle = color;
        
        if(fill) canvas.fillRect(x, y, width, height);        
        if(stroke) canvas.strokeRect(x, y, width, height);
    };

    const deleteAll = (width, height) => {
        canvas.clearRect(0, 0, width, height)
    };

    return {
        rectangle,
        deleteAll
    };
}

