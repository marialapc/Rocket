const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementSize;

// step(9)
const playerPosition = {
  x: undefined,
  y: undefined,
  
}

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  //resize canvas

  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementSize = canvasSize / 10;

  startGame();
}

function startGame() {
  // import elements

  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  // split the elements in rows whitout spaces in 10 positions (step 6)
  const map = maps[1];
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));

  //  print the element (step 6)
  //    for (let row = 1; row <= 10; row++){
  //      for (let col = 1; col <= 10; col++){
  //       game.fillText(emojis[mapRowCols[row-1][col-1]],
  //       elementSize * col, elementSize * row);
  //     }
  //   }

  //delete the rocket old position (step 10)
  game.clearRect(0,0, canvasSize,canvasSize);
  //print the elements refactor (step 7)
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1);
      const posY = elementSize * (rowI + 1);

      if (col === 'O'){
      if (!playerPosition.x && !playerPosition.y)  {
      playerPosition.x= posX;
      playerPosition.y = posY
      }
    }

      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

//print the rocket (step 9)

function movePlayer(){
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

 // listen the keyboard(step 8)

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener ('click', moveUp);
btnLeft.addEventListener ('click', moveLeft);
btnRight.addEventListener ('click', moveRight);
btnDown.addEventListener ('click', moveDown);


function moveByKeys(event) {
 if ( event.key === 'ArrowUp') moveUp();
 else if (event.key == 'ArrowLeft') moveLeft();
 else if (event.key == 'ArrowRight') moveRight();
 else if (event.key == 'ArrowDown') moveDown();
 }

// move the rocket  and respect the canvas (step 11)

function moveUp() {
  if ((playerPosition.y - elementSize) < elementSize){
    console.log('out');
  }else {
  playerPosition.y -= elementSize;
  startGame();
  }
}

function moveLeft() {
 if( (playerPosition.x - elementSize) < elementSize){
  console.log('out');
 }else{
 playerPosition. x -= elementSize;
  startGame();
}
};

function moveRight() {
  if ((playerPosition.x + elementSize) > canvasSize){
    console.log('out');
    }else{
  playerPosition.x += elementSize;
    startGame();
    }
}

function moveDown() {
  if ((playerPosition.y+ elementSize) > canvasSize){
    console.log('out');
    }else{
  playerPosition.y += elementSize;
    startGame();
    }
}