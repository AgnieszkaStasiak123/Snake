console.log('Snake.js loaded');
const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext('2d');

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;

let xVelocity = 0;
let yVelocity = 0;

let appleX = 5;
let appleY = 5;

function GameLoop(){

   
    clearScreen();
    changeSnakePosition();
    drawSnake();
    drawApple();
    setTimeout(GameLoop, 1000/speed);
}

//setTimeOut --> cause game will be quicker with time

function clearScreen(){
    ctx.fillStyle = 'yellow';
    ctx.fillRect(0,0, canvas.clientWidth, canvas.height);

}

function drawSnake(){

    ctx.fillStyle = 'green';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

}

function changeSnakePosition(){

    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect (appleX, appleY, tileSize, tileSize);
}

document.addEventListener("keydown", keyDown);

function keyDown(event){
    if(event.keyCode == 38){
        if(yVelocity == 1){
            return;
        }
        yVelocity = -1;
        xVelocity = 0;

    }

    if(event.keyCode == 40){
        if(yVelocity == -1){
            return;
        }
        yVelocity = 1;
        xVelocity = 0;

    }

    if(event.keyCode == 37){
        if(xVelocity == 1){
            return;
        }
        yVelocity = 0;
        xVelocity = -1;

    }

    if(event.keyCode == 39){
        if(xVelocity == -1){
            return;
        }
        yVelocity = 0;
        xVelocity = 1;

    }
}


GameLoop();