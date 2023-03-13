const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const pResult = document.querySelector("#result");
const restartButton = document.querySelector("#restart-button");
const pauseButton = document.querySelector("#pause-button");

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

let paused = false;

const playerPosition = { x: null, y: null };

const astronautPosition = { x: null, y: null };
let rockPosition = [];

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function fixNumber(n) {
  return Number(n.toFixed(2));
}

function setCanvasSize() {
  //resize canvas
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }
  canvasSize = Number(canvasSize.toFixed(0));
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);
  elementSize = canvasSize / 10;
  playerPosition.x = null;
  playerPosition.y = null;
  update();
}

function update () {
  // Set UI elements:
  pResult.innerHTML = '';
  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  // Check if there is a map for the current level:
  const map = maps[level];
  if (!map) {
    gameWin();
    return;
  }

  // Start the timer
  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }

  // Show the lives
  showLives();
  

  // Prepare the map to be drawn:
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  rockPosition = [];
  // Delete the rocket old position (step 10)
  game.clearRect(0, 0, canvasSize, canvasSize); 

  // Draw the map:
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      // Handle the pause logic:
      if (paused) {
        clearInterval(timeInterval);
        document.removeEventListener('keydown', checkCollisionWithAstronautAndRocks);
      return;
      }
      // Update the position of the all elements:
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1);
      const posY = elementSize * (rowI + 1);
      // Is a cell ocupped by the earth?
      if (col === "O") {
        // 
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
        // Is a cell ocupped by the astronaut?
      } else if (col === "I") {
        astronautPosition.x = posX;
        astronautPosition.y = posY;
        // Is a cell occuped by some rock?
      } else if (col === "X") {
        rockPosition.push({ x: posX, y: posY });
      }
      // Draw elements in the canvas:
      game.fillText(emoji, posX, posY);
    });
  });
  // Check if the player is in the same position as the astronaut or rocks:
  checkCollisionWithAstronautAndRocks();
}

function checkCollisionWithAstronautAndRocks() {
  if (paused) return
  //print the rocket (step 9) and catch de astronaut (step 12)
  const catchTheAstronautX = playerPosition.x.toFixed(3) === astronautPosition.x.toFixed(3);
  const catchTheAstronautY = playerPosition.y.toFixed(3) === astronautPosition.y.toFixed(3);
  const catchTheAstronaut = catchTheAstronautX && catchTheAstronautY;
  if (catchTheAstronaut) {
    levelWin();
  }

  const rockCollision = rockPosition.find((rock) => {
    const rockCollisionX = rock.x.toFixed(3) === playerPosition.x.toFixed(3);
    const rockCollisionY = rock.y.toFixed(3) === playerPosition.y.toFixed(3);
    return rockCollisionX && rockCollisionY;
  });

  if (rockCollision) {
    levelFail();
  }
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function levelWin() {
  level++;
  update();
}

function levelFail() {
  lives--;

  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  update();
}

function gameWin() {
  // to refactor ( separar en dos funciones)
  console.log("you win");
  clearInterval(timeInterval);
  const recordTime = localStorage.getItem("record_time"); //(step 19)
  const playerTime = Date.now() - timeStart;
  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem("record_time", playerTime);
      pResult.innerHTML = "Superaste el record";
    } else {
      pResult.innerHTML = "No superaste el record";
    }
  } else {
    localStorage.setItem("record_time", playerTime);
    pResult.innerHTML = "Primera vez? Intenta superar tu tiempo";
  }
  console.log(recordTime, playerTime);
}

function showLives() {
  //(step 16)
  const heartsArray = Array(lives).fill(emojis["HEART"]);
  spanLives.innerHTML = "";
  heartsArray.forEach((heart) => spanLives.append(heart));
}

function showTime() {
  spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
  spanRecord.innerHTML = localStorage.getItem("record_time");
}

// listen the keyboard

window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

const moveByButtons = {
  ArrowUp: moveUp,
  ArrowLeft: moveLeft,
  ArrowRight: moveRight,
  ArrowDown: moveDown,
};

function moveByKeys(event) {
  if (!moveByButtons[event.key]) return;
  moveByButtons[event.key]();
}

function moveUp() {
  if (paused) return;
  // move the rocket  and respect the canvas (step 11)
  if ((playerPosition.y.toFixed(3) - elementSize) < elementSize) {
    console.log("out");
  } else {
    playerPosition.y -= elementSize;
    update();
  }
}

function moveLeft() {
  if (paused) return;
  if (playerPosition.x.toFixed(3) - elementSize < elementSize) {
    console.log("out");
  } else {
    playerPosition.x -= elementSize;
    update();
  }
}

function moveRight() {
  if (paused) return;
  if (playerPosition.x.toFixed(3) + elementSize > canvasSize) {
    console.log("out");
  } else {
    playerPosition.x += elementSize;
    update();
  }
}

function moveDown() {
  if (paused) return;
  if (playerPosition.y.toFixed(3) + elementSize > canvasSize) {
    console.log("out");
  } else {
    playerPosition.y += elementSize;
    update();
  }
}

restartButton.addEventListener("click", restartGame);
pauseButton.addEventListener("click", togglePause);

function restartGame() {
  level = 0;
  lives = 3;
  timeStart = null;
  playerPosition.x = null;
  playerPosition.y = null;
  update();
}

function togglePause() {
  if (!paused) {
    paused = true;
    clearInterval(timeInterval);
    document.removeEventListener("keydown", checkCollisionWithAstronautAndRocks);
  } else {
    paused = false;
    timeInterval = setInterval(showTime, 100);
    document.addEventListener("keydown", checkCollisionWithAstronautAndRocks);
    checkCollisionWithAstronautAndRocks();
  }
}
