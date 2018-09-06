const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

var gravity=1;
var friction=0.59;

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

addEventListener('click',function (){
    init();
});


// Balls
function Ball(x,y,dx,dy, radius, color) {
    this.x = x
    this.y = y
    this.dy=dy;
    this.dx=dx;
    this.radius = radius
    this.color = color
}

//Utils
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

Ball.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
}

Ball.prototype.update = function() {
    if(this.y+this.radius>canvas.height ){
        this.dy= -this.dy*friction;
    }else{
        this.dy +=gravity;
    }

    if (this.x+this.radius+this.dx > canvas.width || this.x-this.radius <= 0) {
        this.dx=-this.dx;
    }

    this.x+=this.dx;
    this.y+=this.dy;
    this.draw()
}



// Implementation
var ball;
var ballArray;
function init() {
    ballArray=[];
    for (let i = 0; i< 100; i++) {
        var radius=randomIntFromRange(8,20);
        var x=randomIntFromRange(0,canvas.width-radius);
        var y=randomIntFromRange(0,canvas.height-radius);
        var dx=randomIntFromRange(-2,2);
        var dy=randomIntFromRange(-2,2);
        var color=randomColor(colors);
        ballArray.push(new Ball(x,y,dx,dy,radius,color));    
    }

    
    
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    for (let index = 0; index < ballArray.length; index++) {
        ballArray[index].update();

    }


}



init()
animate()