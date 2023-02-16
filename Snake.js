console.log('Snake.js loaded');
const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext('2d');


class SnakePart{
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

let score = 0;

let speed = 7;

let tileCount = 25;
let tileSize = canvas.width / tileCount - 2;

let headX = 12;
let headY = 12;

const snakeParts = []; 
let tailLength = 2;


let xVelocity = 0;
let yVelocity = 0;

let appleX = 5;
let appleY = 5;

let changedScore = false;

const sound = new Audio("gulp.mp3");

function GameLoop(){
    changedScore = false;
    changeSnakePosition();

    
    let result = isGameOver();
    if(result){
        console.log("GAME OVER");
        return;
    } 

    clearScreen();
    checkAppleCollision()
    drawApple();
    drawSnake();
    drawScore();

    setSpeed();

    setTimeout(GameLoop, 1000/speed);
}


//setTimeOut --> cause game will be quicker with time

function setSpeed(){
    
    if( score % 5 == 0 && score != 0 && changedScore == true){
        speed = speed+2;
        return;
    }
}

function isGameOver(){
    let gameOver = false;
   
    if(xVelocity === 0 && yVelocity === 0){
        return false;
    }

    if(headX < 0){
        gameOver = true;
    } else if(headX === tileCount){
        gameOver = true;
    } else if(headY < 0){
        gameOver = true;
    } else if(headY === tileCount){
        gameOver = true;
    } 

    for( let i = 0; i<snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }
    
    if(gameOver){
        drawGameOverTxt();
    }

    return gameOver;
}

function drawGameOverTxt(){
    ctx.fillStyle = "white"
    ctx.font = "80px Verdana";

    var gradient = ctx.createLinearGradient(0, 0 , canvas.width, 0)
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");

    ctx.fillStyle = gradient;

    ctx.fillText("GAME OVER", canvas.width / 10.5, canvas.height / 1.80)
}

function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "25px Verdana"
    ctx.fillText("Score " + score, canvas.width-120, 25);
}


function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.clientWidth, canvas.height);

}

function drawSnake(){

    ctx.fillStyle = 'green';
    for (let i = 0; i< snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new SnakePart(headX,headY)); //it will be drawing green tiles constantly, so we need if to stop drawing them

    if(snakeParts.length > tailLength){  //resetting when crash use while
        snakeParts.shift();
    }
    
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

}

function changeSnakePosition(){

    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){

    ctx.fillStyle = 'red';
    ctx.fillRect (appleX * tileCount, appleY*tileCount , tileSize, tileSize);
}

function checkAppleCollision(){
    
    if(appleX ===  headX && appleY == headY){
        
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        sound.play();
        changedScore = true;
    }
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