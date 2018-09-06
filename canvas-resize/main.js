var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');

//1- Rectangles

//fillRect(positionX,positionY,height,width);
/* context.fillStyle='rgb(255,0,0,0.5)';
context.fillRect(100,100,100,100);
context.fillStyle='rgb(0,255,0,0.5)';
context.fillRect(400,100,100,100);
context.fillStyle='rgb(0,0,255,0.5)';
context.fillRect(300,300,100,100);

//2-Lines

context.beginPath();
context.moveTo(50,300);
context.lineTo(300,100);
context.lineTo(400,300);
context.strokeStyle="#fa34a3";
context.stroke();

//Arc / Circle
//context.arc(x,y,radius,startAngle,endAngle,anticlockWise?);
context.beginPath();
context.arc(300,300,30,0,Math.PI*2,false);
context.strokeStyle="blue";
context.stroke();
console.log(context);

for (let index = 0; index < 100; index++) {
    let x=Math.random()*window.innerWidth;
    let y=Math.random()*window.innerHeight;

    context.beginPath();
    context.arc(x,y,30,0,Math.PI*2,false);
    context.strokeStyle="blue";
    context.stroke();
} */

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
//var minRadius=2;

var colorArray = [
    '#E8EFF2',
    '#006E81',
    '#EBD114',
    '#F08F06',
    '#EF4825',
];

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

});

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        context.beginPath();
        context.stroke();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.y += this.dy;

        this.x += this.dx;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

var circleArray = [];

function init() {
    circleArray = [];
    for (let index = 0; index < 800; index++) {
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = 4;
        var dy = 4;
        var radius = Math.random() * 3 + 1;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }

}

function animate() {
    requestAnimationFrame(animate);

    context.clearRect(0, 0, innerWidth, innerHeight);

    for (let index = 0; index < circleArray.length; index++) {
        circleArray[index].update();
    }

    /* context.beginPath();
    context.stroke();
    context.arc(x,y,radius,0,Math.PI*2,false);
    context.strokeStyle="blue";
    context.stroke(); */

}
init();
animate();
