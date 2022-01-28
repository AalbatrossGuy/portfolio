const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const mouseRad = 60;

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let prtclsArray = [];

const colors = [
    'white', 'rgba(255, 255, 255, 0.3)', 'rgba(173, 216, 230, 0.8)',
    'rgba(211, 211, 211, 0.8)'
]

const maxSize = 40;
const minSize = 0;

let mouse = {
    x: null,
    y: null
}


window.addEventListener('mousemove',

    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        //console.log(mouse);
    }

);

function Particles(x, y, directX, directY, size, colour) {
        this.x = x;
        this.y = y;
        this.directX = directX,
        this.directY = directY;
        this.size = size;
        this.color = colour;
}

Particles.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color; 
    ctx.fill();
}

Particles.prototype.update = function() {

    if (this.x + this.size * 2 > canvas.width || this.x - this.size * 2 < 0){
        this.directX = -this.directX;
    }

    if (this.y + this.size * 2 > canvas.height || this.y - this.size * 2 < 0){
        this.directY = -this.directY;
    }
    
    this.x += this.directX;
    this.y += this.directY;

    if (mouse.x - this.x < mouseRad && mouse.x - this.x > -mouseRad && mouse.y - this.y < mouseRad && mouse.y - this.y > -mouseRad){
        if (this.size < maxSize){
            this.size += 3;
        }
    } else if (this.size > minSize){
        this.size -= 0.1;
    }
    if (this.size < 0) {
        this.size = 0;
    }
    this.draw();
}

function init() {
    prtclsArray = [];
    for (let i = 0; i < 1000; i++){
        let size = 0;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directX = (Math.random() * .2) - .1;
        let directY = (Math.random() * .2) - .1;
        let color = colors[Math.floor(Math.random() * colors.length)];

        prtclsArray.push(new Particles(x, y, directX, directY, size, color));
    }
}

function animationLoop() {
    requestAnimationFrame(animationLoop);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < prtclsArray.length; i++){
        prtclsArray[i].update();
    }
}

init();
animationLoop();

window.addEventListener('resize',

    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        // mouse.radius = ((canvas.height/80) * (canvas.height/80));
        init();
    }
)

setInterval(function() {
    mouse.x = undefined;
    mouse.y = undefined;
}, 1000);

// var typed = new typed("type", {
//     strings: ["text", "text2", "text3", "text4"],
//     typeSpeed: 100,
//     backSpeed: 60,
//     loop: true
// });
