// for playfield grid
const cellSize = 32;
const fieldWidth = 10;
const fieldHeight = 20;
const Width = cellSize * fieldWidth;
const Height = cellSize * fieldHeight; 

// for loop
let intervalID = null;
let isRunning = false;

// for debug
let debugX = 4;
let debugY = 0;
let debugKey = 'none';

// for mino
const COLORS = {
    I: "#00FFFF",
    O: "#FFFF00",
    L: "#FFA500",
    J: "#0000FF",
    S: "#15ff00ff",
    T: "#800080",
    Z: "#FF0000"
};




const SHAPES = {
    I: [[-1, 0], [0, 0], [1, 0], [2, 0]],
    O: [[0, 0], [1, 0], [0, 1], [1, 1]],
    L: [[0, 0], [1, 0], [2, 0], [2, -1]],
    J: [[0, 0], [0, 1], [1, 1], [2, 1]],
    S: [[0, 0], [0, 1], [1, 1], [1, 2]],
    Z: [[0, 0], [0, 1], [1, 0], [1, -1]],
    T: [[0, 0], [1, 0], [2, 0], [1, -1]]
};

// for graphics
const canvas = document.getElementById('playfield');
const context = canvas.getContext('2d');

///////////////////////////////////////////////////////////////////////////////
// main
///////////////////////////////////////////////////////////////////////////////
window.addEventListener("load", draw);
let randomType = getRandomMinoType();
let bounds = getShapeBounds(SHAPES[randomType]);
debugY = getShapeStartY(bounds);

// actions for keydown event
document.addEventListener("keydown", (event) => {
    let bounds = getShapeBounds(SHAPES[randomType]);
    debugKey = event.key;

    if (event.key === 'Enter') {
        if(!isRunning) {
            start();
        } else {
            pause();
        }
    }

    if (event.key === 'r' || event.key === 'R') {
        pause();
        restart();
    }

    if(isRunning) {
        switch (event.key) {
            case 'ArrowRight':
                if (debugX + bounds.maxX < fieldWidth - 1) {
                    debugX++;
                }
                break;
            case 'ArrowLeft':
                if (debugX + bounds.minX > 0) {
                    debugX--;
                }
                break;
            default:
                break;
        }

    }

});

///////////////////////////////////////////////////////////////////////////////
// other functions
///////////////////////////////////////////////////////////////////////////////

/**
 * loadの後に呼ばれる。その後、描画を妨げないタイミングで繰り返し呼び出される。
 */

function draw() {
    // clear the playfield
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawDebugInfo();
    drawGrid();
    drawFigure(randomType, debugX * cellSize, debugY * cellSize);

    // request the browser to call this function before the next repaint.
    requestAnimationFrame(draw);
}

function drawDebugInfo() {
    context.font = '16px arial';
    context.fillStyle = 'blue';

    const text = `(${debugX}, ${debugY}), ${isRunning}, ${debugKey}`;
    context.fillText(text, cellSize / 4, cellSize / 2);
}

function start() {
    intervalID = setInterval(update, 500); // call update() every 500 ms
    isRunning = true;
}

function pause() {
    clearInterval(intervalID);  // suspend
    intervalID = null;
    isRunning = false;
}

function update() {
    let bounds = getShapeBounds(SHAPES[randomType]);
    if (debugY + bounds.maxY < fieldHeight - 1) {
        debugY++;
    }
}

function restart() {
    randomType = getRandomMinoType();
    let bounds = getShapeBounds(SHAPES[randomType]);
    debugX = 4;
    debugY = getShapeStartY(bounds);
    debugKey = 'none';
    
}

function drawFigure(type,x, y) {
   
    context.fillStyle= COLORS[type] || "#888";
    const shape = SHAPES[type];
    context.strokeStyle ='black';
    context.lineWidth = 1;

    for (const [dx, dy] of shape) {
        const drawX = x + dx * cellSize;
        const drawY = y + dy * cellSize;

        context.fillRect(drawX, drawY, cellSize, cellSize);
        context.strokeRect(drawX, drawY, cellSize, cellSize);
    }
}

function getRandomMinoType() {
    const types = Object.keys(SHAPES);
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
}

function getShapeBounds(shape) {
    let minX = 0, maxX = 0, minY = 0, maxY = 0;
    
    for (const [dx, dy] of shape) {
        minX = Math.min(minX, dx);
        maxX = Math.max(maxX, dx);
        minY = Math.min(minY, dy);
        maxY = Math.max(maxY, dy);
    }
    
    return { minX, maxX, minY, maxY };
}

function getShapeStartY(bounds) {
    if(bounds.minY >= 0) {
        return 0;
    } else {
        return -bounds.minY;
    }
}

function drawGrid() {
    context.strokeStyle = "#ffffffff";
    context.beginPath();
    for (let x = 0; x <= Width; x += cellSize) {
        context.moveTo(x, 0);
        context.lineTo(x, Height);
    }
    for (let y = 0; y <= Height; y += cellSize) {
        context.moveTo(0, y);
        context.lineTo(Width, y);
    }
    context.stroke();
}
