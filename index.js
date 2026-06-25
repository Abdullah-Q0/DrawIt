const canvas = document.getElementById("drawCanvas");
const context = canvas.getContext('2d');

const ctx = canvas.getContext('2d');

const color = '#ffffff'

let isDrawing = false;
let lastX = 0;
let lastY = 0;

let points  = []

const rect = canvas.parentElement.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;


canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
 
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault(); 
  startDrawing(e.touches[0]);
});
canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  draw(e.touches[0]);
});
canvas.addEventListener('touchend', stopDrawing);
 
function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY]; // Get initial coordinates
}
 
function draw(e) {
  if (!isDrawing) return;
  const x = e.offsetX;
  const y = e.offsetY;
  points.push({ x, y, lineWidth: 5 }); // Fixed width for now
 
  if (points.length > 1) {
    // Only draw when we have at least 2 points
    const prev = points[points.length - 2]; // Previous point
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    // Quadratic Bézier: control point = prev, end point = current
    ctx.quadraticCurveTo(prev.x, prev.y, x, y); 
    ctx.strokeStyle = color;
    ctx.lineWidth = prev.lineWidth; // Use previous width (for now)
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  }
}
 
function stopDrawing() {
  isDrawing = false;
  points = [];
}