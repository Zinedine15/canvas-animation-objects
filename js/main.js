const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");

const coorX = document.getElementById("coorX");
const coorY = document.getElementById("coorY");

const window_height = 300;
const window_width = 500;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.backgroundColor = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.4)`;

canvas2.height = window_height;
canvas2.width = window_width;
canvas2.style.backgroundColor = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.4)`;

class Circle {
  constructor(x, y, radius, color, text, backcolor, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.backcolor = backcolor;
    this.speed = speed;

    this.dx = 0.9 * this.speed;
    this.dy = 0.9 * this.speed;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.backcolor;
    context.fill();

    context.lineWidth = 5;
    context.strokeStyle = this.color;
    context.stroke();

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 20px cursive";
    context.fillStyle = "white";
    context.fillText(this.text, this.posX, this.posY);

    context.closePath();
  }

  update(context) {
    this.draw(context);

    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Círculo en canvas2
let randomRadius2 = Math.floor(Math.random() * 60 + 20);
let randomX2 = Math.random() * window_width;
let randomY2 = Math.random() * window_height;
let randomBackcolor2 = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.4)`;
let randomStrokecolor2 = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
let randomSpeed2 = Math.random() * 5 + 1;

randomX2 = randomX2 < randomRadius2 ? randomRadius2 : randomX2 > window_width - randomRadius2 ? window_width - randomRadius2 : randomX2;
randomY2 = randomY2 < randomRadius2 ? randomRadius2 : randomY2 > window_height - randomRadius2 ? window_height - randomRadius2 : randomY2;

let miCirculo2 = new Circle(randomX2, randomY2, randomRadius2, randomStrokecolor2, "1", randomBackcolor2, randomSpeed2);

function updateCircle2() {
  requestAnimationFrame(updateCircle2);
  ctx2.clearRect(0, 0, window_width, window_height);
  miCirculo2.update(ctx2);
  coorX.innerText = 'Coordenada en X: ' + miCirculo2.posX.toFixed(1);
  coorY.innerText = 'Coordenada en Y: ' + miCirculo2.posY.toFixed(1);
}

updateCircle2();

// Círculos en canvas
const nCircles = 10;
let circles = [];

for (let i = 0; i < nCircles; i++) {
  let randomRadius = Math.floor(Math.random() * 30 + 20);
  let randomX = Math.random() * window_width;
  let randomY = Math.random() * window_height;
  let randomBackcolor = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.4)`;
  let randomStrokecolor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
  let randomSpeed = Math.random() * 3 + 1;

  randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
  randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

  let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i + 1, randomBackcolor, randomSpeed);
  circles.push(miCirculo);
}

function createCoordinatesTable() {
  const tableContainer = document.getElementById('coordinatesTableContainer');
  tableContainer.innerHTML = ""; // Clear previous table

  const table = document.createElement('table');
  table.classList.add('table', 'table-striped', 'table-bordered');

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['ID', 'Coordenada X', 'Coordenada Y'];

  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  circles.forEach((circle, index) => {
    const row = document.createElement('tr');

    const cellID = document.createElement('td');
    cellID.textContent = circle.text;
    row.appendChild(cellID);

    const cellX = document.createElement('td');
    cellX.textContent = circle.posX.toFixed(1);
    row.appendChild(cellX);

    const cellY = document.createElement('td');
    cellY.textContent = circle.posY.toFixed(1);
    row.appendChild(cellY);

    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  tableContainer.appendChild(table);
}

function updateCircle() {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  circles.forEach(circle => {
    circle.update(ctx);
  });
  createCoordinatesTable();
}

updateCircle();
