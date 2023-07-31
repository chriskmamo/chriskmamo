// Constants for class names and delay times
const HIGHLIGHT_CLASS = "highlight";
const SHOW_SEQUENCE_DELAY = 500;
const HIGHLIGHT_DELAY = 100;

// DOM elements
const header = $("h1");
const gameButton = $(".game button");
const newGameButton = $(".new-game");
const maxLevelHeader = $(".best-level");

// Game state
let level = 0;
let maxLevel = 0;
let sequence = [];
let userSequence = [];

// Helper Functions
function generateRandomNumber() {
  return Math.floor(Math.random() * gameButton.length);
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function compareArrays(array1, array2) {
  for (let i = 0; i < Math.min(array1.length, array2.length); i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}

// MAIN FUNCTIONS
function newSequence() {
  sequence.length = 0;
  userSequence.length = 0;
  for (let i = 0; i < level + 2; i++) {
    sequence.push(generateRandomNumber());
  }
}

async function showSequence() {
  for (const num of sequence) {
    gameButton.eq(num).addClass(HIGHLIGHT_CLASS);
    await delay(HIGHLIGHT_DELAY);
    gameButton.eq(num).removeClass(HIGHLIGHT_CLASS);
    await delay(HIGHLIGHT_DELAY);
  }
}

function startNewGame() {
  levelUp();
  newGameButton.hide();
}

function levelUp() {
  if (level > maxLevel) {
    maxLevel = level;
    maxLevelHeader.text(`${maxLevel}`);
  }
  level++;
  header.text(`Level ${level}`);
  setTimeout(() => {
    newSequence();
    showSequence();
  }, SHOW_SEQUENCE_DELAY);
}

function handleGameButtonClick() {
  if (level > 0) {
    userSequence.push(gameButton.index(this));
    if (compareArrays(sequence, userSequence)) {
      if (sequence.length === userSequence.length) {
        levelUp();
      }
    } else {
      level = 0;
      header.text("Game Over!");
      newGameButton.show();
    }
  }
}

// Event Listeners
newGameButton.on("click", startNewGame);
gameButton.on("click", handleGameButtonClick);
