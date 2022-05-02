const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let raf;
let score = 0;
let started = false;

const ball = {
  x: 100,
  y: 100,
  vx: 4,
  vy: 7,
  radius: 25,
  color: 'crimson',
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

const bouncer = {
  x: 255,
  vx: 15,
  y: 285,
  w: 120,
  h: 20,
  color: 'lime',
  draw: function () {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

function draw() {
  ctx.fillStyle = 'rgba(255, 255, 255, .3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  bouncer.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y + ball.vy > canvas.height) {
    score -= 1;
  }
  
  if (ball.y + ball.vy > canvas.height ||
    ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }

  if (ball.x + ball.vx > canvas.width ||
    ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }

  

  raf = window.requestAnimationFrame(draw);
  ctx.fillStyle = 'black'
  ctx.font = '30px serif';
  ctx.fillText(score, 40, 40, 200);
}

canvas.addEventListener('mouseover', function (e) {
  if (!started) {
    raf = window.requestAnimationFrame(draw);
    started = true;
  }
});
canvas.addEventListener('keydown', function (key) {
  if (key.key === 'ArrowLeft') {
    bouncer.x -= bouncer.vx;
  }
  else if (key.key === 'ArrowRight') {
    bouncer.x += bouncer.vx;
  }
  
});
bouncer.draw();
ball.draw();
