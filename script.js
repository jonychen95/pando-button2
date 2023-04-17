let button = document.querySelector('.animated-button');
let canvas = document.getElementById('particles');
let icon = document.getElementById('animated-icon');
let ctx = canvas.getContext('2d');
let particles = 40;
let particlesArray = [];

// 获取按钮的位置和尺寸
let buttonRect = button.getBoundingClientRect();
canvas.height = buttonRect.height;
canvas.width = buttonRect.width;

function Particle() {
    // 计算按钮的中心坐标
    let buttonCenterX = buttonRect.left + buttonRect.width / 2;
    let buttonCenterY = buttonRect.top + buttonRect.height / 2;

    // 将粒子的初始位置设置为按钮的中心
    this.positionX = buttonCenterX;
    this.positionY = buttonCenterY;

    let angle = Math.random() * Math.PI * 2;
    let speed = Math.random() * 2 + 1;
    this.speedX = Math.cos(angle) * speed;
    this.speedY = Math.sin(angle) * speed / 2;

    this.size = Math.round(Math.random() * 1 + 1);
}


function createParticles() {
    for (let i = 0; i < particles; i++) {
        particlesArray.push(new Particle);
    }
}

function drawParticle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.strokeStyle = 'transparent';
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "rgb(28, 213, 254)";
    ctx.beginPath();

    particlesArray.forEach(particle => {
        ctx.arc(particle.positionX, particle.positionY, particle.size, 0, Math.PI * 2, true);

        particle.positionX += particle.speedX;
        particle.positionY += particle.speedY;

        if (particle.positionX > canvas.width || particle.positionX < 0) {
            particle.positionX = buttonRect.width * 0.5;
            particle.positionY = buttonRect.height * 0.5;
        }
          if (particle.positionY > canvas.height || particle.positionY < 0) {
            particle.positionX = buttonRect.width * 0.5;
            particle.positionY = buttonRect.height * 0.5;
        }
        ctx.closePath();
    });
    ctx.fill();
    animationRequest = requestAnimationFrame(drawParticle);
}

let animationRequest;

function startParticles() {
    createParticles();
    animationRequest = requestAnimationFrame(drawParticle);
}

function stopParticles() {
    cancelAnimationFrame(animationRequest);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray = [];
}

// 设置按钮的鼠标移入，鼠标移出，鼠标点击事件
button.addEventListener('mouseover', startParticles);
button.addEventListener('mouseout', stopParticles);
button.addEventListener('click', () => {
    button.classList.add('clicked-style');
    button.classList.add('disable-hover');
    canvas.style.display = 'none';
});


window.onresize = () => {
    buttonRect = button.getBoundingClientRect();
    canvas.height = buttonRect.height;
    canvas.width = buttonRect.width;
}
