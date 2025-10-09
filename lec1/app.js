// get a 2D graphics context from the canvas element
const cv = document.getElementById("gameCanvas");
const ct = cv.getContext("2d");

// set canvas width and height
const width = cv.width
const height = cv.height

// draw  white Grid line
class GridDrawer {
    constructor(context, width, height) {
        this.ct = context;
        this.width = width;
        this.height = height;
    }

    draw(step, color) {
        this.ct.strokeStyle = color;
        this.ct.beginPath();
        for (let x = 0; x <= this.width; x += step) {
            this.ct.moveTo(x, 0);
            this.ct.lineTo(x, this.height);
        }
        for (let y = 0; y <= this.height; y += step) {
            this.ct.moveTo(0, y);
            this.ct.lineTo(this.width, y);
        }
        this.ct.stroke();
    }
}

// 使い方
const gridDrawer = new GridDrawer(ct, width, height);
gridDrawer.draw(32, "#FFFFFF");
gridDrawer.draw(64, "#000000");

class MinoDrawer {
    constructor(context) {
        this.ct = context;
        this.blockSize = 32;
        this.colors = {
            I: "#00FFFF",
            O: "#FFFF00",
            L: "#FFA500",
            J: "#0000FF",
            S: "#15ff00ff",
            Z: "#FF0000",
            T: "#800080"
        };
    }

    draw(type, x, y, s = this.blockSize) {
        const shapes = {
            I: [[0,0],[0,1],[0,2],[0,3]],
            O: [[0,0],[1,0],[0,1],[1,1]],
            L: [[0,0],[1,0],[2,0],[2,-1]],
            J: [[0,0],[0,1],[1,1],[2,1]],
            S: [[0,0],[0,1],[1,1],[1,2]],
            Z: [[0,0],[0,1],[1,0],[1,-1]],
            T: [[0,0],[1,0],[2,0],[1,-1]]
        };
        this.ct.fillStyle = this.colors[type] || "#888";
        this.ct.strokeStyle = 'black';
        this.ct.lineWidth = 1;
        const shape = shapes[type];
        if (!shape) return;
        for (const [dx, dy] of shape) {
            this.ct.fillRect(x + dx * s, y + dy * s, s, s);
            this.ct.strokeRect(x + dx * s, y + dy * s, s, s);
        }
    }
}

// drow minos
const minoDrawer = new MinoDrawer(ct);
minoDrawer.draw('I', width-32, height-128);
minoDrawer.draw('O', width-96, height-64);
minoDrawer.draw('L', width-192, height-32);
minoDrawer.draw('J', 96, 256);
minoDrawer.draw('S', 32, height-128);
minoDrawer.draw('Z', 160, height-96);
minoDrawer.draw('T', 0, height-32);


// draw a rectangle
//ct.fillStyle = "#0000FF";
//ct.fillRect(width-20, height-20, width, height);

// text
//ct.font = "bold 30px serif";
//ct.fillStyle = "green";
//ct.fillText("JavaScript", cv.width / 4, cv.height / 2);
