let canvas = document.getElementById("view");
let button = document.getElementById("control");
let ctx = canvas.getContext("2d");

let zoom = 10;

let height = 500;
let width = 500;

canvas.height = height;
canvas.width = width;

let rows = height / zoom;
let cols = width / zoom;

let grid = new Array(rows)
  .fill(0)
  .map(() => new Array(cols).fill(0).map(() => 0));

canvas.addEventListener("mousedown", function (event) {
  let x = Math.floor(event.clientX / zoom) - 1;
  let y = Math.floor(event.clientY / zoom) - 1;
  console.log(x, y);

  if (grid[x][y] === 0) {
    grid[x][y] = 1;
    draw();
  }
});

let play = false;
let time = 100
let interval;

function randomize() {
    grid = new Array(rows)
      .fill(0)
      .map(() => new Array(cols).fill(0).map(() => Math.floor(Math.random() * 2)));
    draw();
}
function start() {
    play = play ? false : true;

    if (play){
        button.innerHTML = "Stop";
        draw();
        interval = setInterval(() => {
          nextGen();
          draw();
        }, time);
    } else {
        button.innerHTML = "Start";
        clearInterval(interval);
    }
}

function nextGen() {
  let newGrid = new Array(rows)
  .fill(0)
  .map(() => new Array(cols).fill(0).map(() => 0));
  let coords = [
    [-1, -1],
    [-1, 1],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let neighbors = 0;
      let alive = grid[x][y] ? true : false;
      for (let i = 0; i < coords.length; i++) {
        let checkX = x + coords[i][0];
        let checkY = y + coords[i][1];
        if (checkX >= 0 && checkX < rows && checkY >= 0 && checkY < cols) {
          if (grid[checkX][checkY] == 1) {
            neighbors = neighbors + 1;
          }
        }
      }

      if (alive && neighbors < 2) {
        newGrid[x][y] = 0;
      } else if (alive && neighbors > 3) {
        newGrid[x][y] = 0;
      } else if (!alive && neighbors === 3) {
        newGrid[x][y] = 1;
      } else {
          newGrid[x][y] = grid[x][y];
      }
    }
  }

  grid = newGrid;
}

function draw() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      ctx.fillStyle = grid[x][y] ? "black" : "white";
      ctx.fillRect(x * zoom, y * zoom, 1 * zoom, 1 * zoom);
    }
  }
}


