const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

//resize canvas
function setCanvasSize() {

    if (window.innerHeight > window.innerWidth){
       canvasSize = window.innerWidth * 0.8;
    } else{
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = canvasSize / 10;

    startGame();  
}

function startGame(){

// import elements
    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

  for (let i = 1; i <= 10; i++){
    game.fillText(emojis['X'], elementSize, elementSize * i);
    }
}