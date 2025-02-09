const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "-6";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
const numStars = 100;
let stars = [];

if (localStorage.getItem('stars')) {
  stars = JSON.parse(localStorage.getItem('stars'));
} else {
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      brightness: Math.random(),
      speed: Math.random() * 0.001 + 0.001,
    });
  }
  localStorage.setItem('stars', JSON.stringify(stars));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    star.brightness += star.speed;
    if (star.brightness > 1 || star.brightness < 0) {
      star.speed *= -1;
    }
    ctx.beginPath();
    ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}

function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("orientationchange", resizeCanvas);
resizeCanvas();
drawStars();
