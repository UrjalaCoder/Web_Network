const canvas = document.getElementById('drawing-canvas');
const mouseModeBtn = document.getElementById('mouse-mode-btn');
const dataFormBtn = document.getElementById('form-data-btn');
const clearBtn = document.getElementById('clear-btn');
const resultP = document.getElementById('result-str');

// Some flags for grid cells.
const EMPTY_CELL = 'E';
const FULL_CELL = 'F';

class Grid {
    constructor({width, height, squareLength}) {
        this.width = width;
        this.height = height;
        this.squareSide = squareLength;
        this.cells = this.fillEmptyCells();
        this.isDrawing = false;
        this.isDeleting = false;
    }

    fillEmptyCells() {
        const cells = [];
        for(let i = 0; i < this.height; i++) {
            const line = [];
            for(let j = 0; j < this.width; j++) {
                line.push(EMPTY_CELL);
            }
            cells.push(line);
        }
        return cells;
    }

    drawGrid(context) {
        this.context = context;
        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                const squareState = this.cells[y][x];
                context.fillStyle = squareState == FULL_CELL ? '#000000' : '#ffffff';
                context.fillRect(
                    x * this.squareSide,
                    y * this.squareSide,
                    this.squareSide,
                    this.squareSide
                );
            }
        }
    }

    redraw() {
        this.drawGrid(this.context);
    }

    changeState({ x, y }, newState) {
        this.cells[y][x] = newState;
    }

    clearAll() {
        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                this.cells[y][x] = EMPTY_CELL;
            }
        }
    }
}

function createImageData(cells) {
    const height = cells.length;
    const width = cells[0].length;

    const hiddenCanvas = document.createElement('canvas');
    const hiddenContext = hiddenCanvas.getContext('2d');
    hiddenCanvas.width = width;
    hiddenCanvas.height = height;

    for(let y = 0; y < height; y++) {
        for(let x = 0; x < width; x++) {
            const squareState = cells[y][x];
            // NOTE: COLOR CHANGE!!
            hiddenContext.fillStyle = squareState == FULL_CELL ? '#FFFFFF' : '#000000';
            hiddenContext.fillRect(x, y, 1, 1);
        }
    }

    return hiddenContext.getImageData(0, 0, width, height);
}

function parseRealData(realImage) {
    const { data } = realImage;
    const resultData = [];
    for(let i = 0; i < data.length; i++) {
        if(i % 4 === 0) resultData.push(data[i]);
    }
    return resultData;
}

function formData(grid) {
    const realData = createImageData(grid.cells);
    const parsedData = parseRealData(realData);
    return parsedData;
}

var sending = false;
function sendImageData(data) {
    const request = new XMLHttpRequest();
    request.open('POST', '/data');
    request.addEventListener('load', () => {
        sending = false;
        const data = request.response;
        const parsed = JSON.parse(data);

        const stringRes = parseResponse(parsed);
        resultP.innerHTML = stringRes;
    });
    request.setRequestHeader("Content-Type", "application/json");
    sending = true;
    request.send(JSON.stringify(data));
}

function parseResponse(resultVector) {
    let bestIndex = 0;
    for(let i = 1; i < resultVector.length; i++) {
        if(resultVector[i] > resultVector[bestIndex]) {
            bestIndex = i;
        }
    }

    const res = `I see: ${bestIndex}`;
    return res;
}

function mouseMoveHandler(e, grid) {
    if(grid.isDrawing) {
        const { clientX: mouseX, clientY: mouseY } = e;
        const { x: canvasX, y: canvasY } = canvas.getBoundingClientRect();
        const realX = mouseX - canvasX;
        const realY = mouseY - canvasY;
        // Determine the grid positions.
        const gridX = Math.floor(realX / grid.squareSide);
        const gridY = Math.floor(realY / grid.squareSide);
        grid.changeState({ x: gridX, y: gridY }, grid.isDeleting ? EMPTY_CELL : FULL_CELL);
        grid.redraw();

        if(!sending){
            const data = formData(grid);
            sendImageData(data);
        }
    }
}

function init() {
    const gridSizeX = 20;
    const gridSizeY = 20;
    const squareSize = 20;
    const grid = new Grid({ width: gridSizeX, height: gridSizeY, squareLength: squareSize });
    canvas.width = gridSizeX * squareSize;
    canvas.height = gridSizeY * squareSize;
    grid.drawGrid(canvas.getContext('2d'));

    canvas.addEventListener('mousedown', () => {
        grid.isDrawing = true;
    });

    canvas.addEventListener('mouseup', () => {
        grid.isDrawing = false;
    });

    canvas.addEventListener('mousemove', (e) => mouseMoveHandler(e, grid));

    mouseModeBtn.addEventListener('click', () => {
        grid.isDrawing = false;
        grid.isDeleting = !grid.isDeleting;
    });

    clearBtn.addEventListener('click', () => {
        grid.clearAll();
        grid.redraw();
        resultP.innerHTML = 'I don\'t see anything.';
    });

    dataFormBtn.addEventListener('click', () => {
        const data = formData(grid);
        sendImageData(data);
    });
}

init();
