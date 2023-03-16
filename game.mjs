import {maps, emojis} from './maps.mjs';
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

const milliseconds = 10;

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

let timeStart = 0;
let timeInterval;
let paused = false;

const playerPosition = { x: null, y: null };
const astronautPosition = { x: null, y: null };
let rocksPosition = [];

// THE FIRST FUNCTION TO BE EXECUTED
// WHEN THE PAGE IS LOADED:
function initialLoad(){
  setCanvasSize();
  setUIElements();
  update();
  startTimer();
}

function setCanvasSize() {
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
}

// ROCKET FUNCTIONS:
function resetRocketPosition() {
  playerPosition.x = null;
  playerPosition.y = null;
}

function deleteRocket() { // AAAAAAAAAAAAAA
  game.clearRect(0, 0, canvasSize, canvasSize);
}

function drawRocket() {
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

// MAP FUNCTIONS:
function prepareMap() {
  // Prepare the map to be drawn:
  const map = maps[level];
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  return mapRowCols;
}

function drawMap() {
  const mapRowCols = prepareMap();
  rocksPosition = [];
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      // Update the position of the element in the canvas
      // according to the size of the element
      // and the position of the element in the map (rowI and colI):
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1);
      const posY = elementSize * (rowI + 1);
      // Is a cell ocupped by the earth?
      if (col === "O") {
        // Set the position of the earth:
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
        // Is a cell ocupped by the astronaut?
      } else if (col === "I") {
          // Set the position of the astronaut:
          astronautPosition.x = posX;
          astronautPosition.y = posY;
          // Is a cell occuped by some rock?
        } else if (col === "X") {
          // Add a rock with his position to the array:
          rocksPosition.push({ x: posX, y: posY });
        }
        // Finally, we draw the element in the canvas:
        game.fillText(emoji, posX, posY);
      });
    });
  }

  // LOOP OF THE GAME:
function update() {
  showLives();
  deleteRocket();
  drawMap();
  checkCollisionWithAstronautAndRocks();
  drawRocket();
}

// COLLISION DETECTION FUNCTIONS:
function existsCollisionWithAstronaut() {
  const catchTheAstronautX = round(playerPosition.x) === round(astronautPosition.x);
  const catchTheAstronautY = round(playerPosition.y) === round(astronautPosition.y);
  return catchTheAstronautX && catchTheAstronautY;
}

function existsCollisionWithRock() {
  const existsCollisionWithRock = rocksPosition.some((rock) => {
    const rockCollisionX = round(rock.x) === round(playerPosition.x);
    const rockCollisionY = round(rock.y) === round(playerPosition.y);
    return rockCollisionX && rockCollisionY;
  });
  return existsCollisionWithRock;
}

function checkCollisionWithAstronautAndRocks() {
  if (paused) return;
  if (existsCollisionWithAstronaut()) {
    levelWin();
  }
  if (existsCollisionWithRock()) {
    levelFail();
  }
}

// LEVEL (AND GAME) WIN OR FAIL FUNCTONS:
function checkIfIsTheEndOfGame() {
  const map = maps[level];
  return typeof map === 'undefined';
}

function levelWin() {
  level++;
  const isTheEndOfGame = checkIfIsTheEndOfGame();
  if (isTheEndOfGame) {
    gameWin();
    return;
  }
  update();
}

function levelFail() {
  lives--;

  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = 0;
  }
  resetRocketPosition();
  update();
}

function gameWin() {
  clearInterval(timeInterval);
  const recordTime = localStorage.getItem("record_time");
  const playerTime = timeStart;
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

// MOVE THE ROCKET BY BUTTONS: 
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

// UI ELEMENTS (LIVES, TIME, RECORD):
function setUIElements() {
  pResult.innerHTML = '';
  game.font = elementSize + "px Verdana";
  game.textAlign = "end";
}

function showLives() {
  const heartsArray = Array(lives).fill(emojis["HEART"]);
  spanLives.innerHTML = "";
  heartsArray.forEach((heart) => spanLives.append(heart));
}

function showRecord() {
  spanRecord.innerHTML = localStorage.getItem("record_time");
}

function startTimer() {
  timeInterval = setInterval(showTime, milliseconds);
  showRecord();
}

function showTime() {
  timeStart = timeStart + 1;
  spanTime.innerHTML = timeStart;
}

// RESTART AND PAUSE HANDLERS:
function restartGame() {
  level = 0;
  lives = 3;
  timeStart = 0;
  clearInterval(timeInterval);
  resetRocketPosition();
  initialLoad();
}

function togglePause() {
if (!paused) {
  paused = true;
  clearInterval(timeInterval);
  document.removeEventListener("keydown", checkCollisionWithAstronautAndRocks);
  canvas.classList.add("canvasPause");
  pauseButton.classList.add('btnBPause');
  restartButton.classList.add('btnAPause');

} else {
  paused = false;
  timeInterval = setInterval(showTime, milliseconds);
  document.addEventListener("keydown", checkCollisionWithAstronautAndRocks);
  canvas.classList.remove("canvasPause");
  pauseButton.classList.remove('btnBPause');
  restartButton.classList.remove('btnAPause');
}
}

// UTILS:
function round(value) {
  return Number(value.toFixed(3));
}

// EVENT LISTENERS:

// A.- Control buttons:
restartButton.addEventListener("click", restartGame);
pauseButton.addEventListener("click", togglePause);

// B.- Initial load and resize:
window.addEventListener("load", initialLoad);
window.addEventListener("resize", setCanvasSize);

// C.- Arrows buttons:
window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);



