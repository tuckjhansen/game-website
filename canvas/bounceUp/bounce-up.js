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
  x: 240,
  vx: 7,
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

  // minus one to score && (ball.y <= 20 && ball.x === bouncer.x)
  // TODO: This should also collide
  if (ball.y >= bouncer.y && (ball.x > bouncer.x && ball.x < bouncer.x + bouncer.w)) {
    score += 1;
    ball.vy = -ball.vy;
  }
  else if (ball.y > canvas.height) {
    score -= 1;
  }

  // ceiling and floor collision
  if (ball.y > canvas.height || ball.y < 0) {
    ball.vy = -ball.vy;
  }

  // bounces the ball of the sides
  if (ball.x > canvas.width || ball.x < 0) {
    ball.vx = -ball.vx;
  }

  if (goLeft) {
    if (bouncer.x >= 0) {
      bouncer.x -= bouncer.vx;
    }
  }
  else if (goRight) {
    if (bouncer.x + bouncer.w <= canvas.width) {
      bouncer.x += bouncer.vx;
    }
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
let goRight = false;
let goLeft = false;
canvas.addEventListener('keydown', function (key) {
  console.log("keydown", key)
  if ((key.key === 'ArrowLeft' || key.key === 'a')) {
    goLeft = true;
  }
  else if (key.key === 'ArrowRight' || key.key === 'd') {
    goRight = true
  }
});

canvas.addEventListener('keyup', function (key) {
  if (key.key === 'ArrowLeft' || key.key === 'a') {
    goLeft = false;
  }
  else if (key.key === 'ArrowRight' || key.key === 'd') {
    goRight = false;
  }
});

bouncer.draw();
ball.draw();
