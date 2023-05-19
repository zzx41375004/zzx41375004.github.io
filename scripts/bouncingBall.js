// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
    let num = 0;
    while (Math.abs(num) < 1e-7) {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return num;
}

// function to generate random color

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}

class Ball extends Shape {
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY);
        this.color = color;
        this.size = size;
        this.alive = true;
    }

    dead() {
        this.alive = false;
    }

    isAlive() {
        return this.alive;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }
}

class BallMgr {
    balls = [];
    ball_min_vel = -6
    ball_max_vel = 6

    ballCreate(ballNum) {
        while (this.balls.length < ballNum) {
            const size = random(10, 20);
            const ball = new Ball(
                // ball position always drawn at least one ball width
                // away from the edge of the canvas, to avoid drawing errors
                random(0 + size, width - size),
                random(0 + size, height - size),
                random(this.ball_min_vel, this.ball_max_vel),
                random(this.ball_min_vel, this.ball_max_vel),
                randomRGB(),
                size
            );

            this.balls.push(ball);
        }
        this.loop(this.balls);
    }

    collisionDetect(target_ball) {
        evilCycle.collisionDetect(target_ball);
        if (target_ball.isAlive === false) {
            return;
        }
        for (const ball of this.balls) {
            if (target_ball !== ball && ball.isAlive()) {
                const dx = target_ball.x - ball.x;
                const dy = target_ball.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < target_ball.size + ball.size) {
                    ball.color = target_ball.color = randomRGB();
                }
            }
        }
    }


    loop(balls) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
        ctx.fillRect(0, 0, width, height);

        evilCycle.draw();

        for (const ball of balls) {
            if (ball.isAlive() === false) {
                continue;
            }
            ball.draw();
            ball.update();
            this.collisionDetect(ball);
        }


        requestAnimationFrame(() => {
            this.loop(balls);
        });
    }
}



class Heart {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.vertices = [];
        for (let i = 0; i < size; i++) {
            var step = i / size * (Math.PI * 2);//设置心上面两点之间的角度，具体分成多少份，好像需要去试。
            var vector = {
                x: (15 * Math.pow(Math.sin(step), 3)),
                y: -(13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step))
            }
            this.vertices.push(vector);
        }
        while (Math.abs(velX - 0) < 1e-6) {
            velX = random(-5, 5);
        }
        while (Math.abs(velY - 0) < 1e-6) {
            velY = random(-5, 5);
        }
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw() {
        // ctx.translate(-1000, this.y);//这一步跟ctx.shadowOffsetX必须一起使用，不明白为啥？
        ctx.beginPath();
        ctx.fillStyle = this.color;
        for (let i = 0; i < this.size; i++) {
            var vector = this.vertices[i];
            ctx.lineTo(vector.x, vector.y);
        }

        ctx.shadowColor = this.color;
        // ctx.shadowOffsetX = this.x + 1000;
        ctx.fill();
    }

    update() {
        if (this.x >= width) {
            this.velX = -(this.velX);
        }

        if (this.x <= 0) {
            this.velX = -(this.velX);
        }

        if (this.y >= height) {
            this.velY = -(this.velY);
        }

        if (this.y <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }
}

class HeartMgr {
    hearts = [];
    heart_min_vel = -5
    heart_max_vel = 5

    heartCreate(heartNum) {
        while (this.hearts.length < heartNum) {
            const size = random(10, 30);
            const heart = new Heart(
                random(0 + size, width - size),
                random(0 + size, height - size),
                random(this.heart_min_vel, this.heart_max_vel),
                random(this.heart_min_vel, this.heart_max_vel),
                randomRGB(),
                30
            );

            this.hearts.push(heart);
        }
        this.loop(this.hearts);
    }

    loop(hearts) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
        ctx.fillRect(0, 0, width, height);

        for (const heart of hearts) {
            heart.draw();
            heart.update();
        }

        requestAnimationFrame(() => {
            this.loop(hearts);
        });
    }
}


class EvilCycle extends Shape {
    constructor(x, y) {
        super(x, y, 20, 20);
        this.color = 'white';
        this.size = 10;
        window.addEventListener("keydown", (e) => {
            // console.log(e.key);
            switch (e.key) {
                case "ArrowLeft":
                    this.x -= this.velX;
                    break;
                case "ArrowRight":
                    this.x += this.velX;
                    break;
                case "ArrowUp":
                    this.y -= this.velY;
                    break;
                case "ArrowDown":
                    this.y += this.velY;
                    break;
            }
            this.checkBound();
        });
    }

    draw() {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    checkBound() {
        if ((this.x + this.size) >= width) {
            this.x -= (this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.x += (this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.y -= (this.velY);
        }

        if ((this.y - this.size) <= 0) {
            this.y += (this.velY);
        }
    }

    collisionDetect(ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
            ball.dead();
        }
    }
}

let ballMgr = new BallMgr();
size = 10;
let evilCycle = new EvilCycle(width / 2, height / 2);
ballMgr.ballCreate(30);

// heartMgr = new HeartMgr;
// heartMgr.heartCreate(30);