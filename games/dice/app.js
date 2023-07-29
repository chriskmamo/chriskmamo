// Constants and DOM elements
const DICE_CLASSES = [
  "fa-solid fa-dice-one",
  "fa-solid fa-dice-two",
  "fa-solid fa-dice-three",
  "fa-solid fa-dice-four",
  "fa-solid fa-dice-five",
  "fa-solid fa-dice-six",
];
const MAX_DICE_VALUE = 6;
const MAX_PLAYERS = 6;
const MIN_PLAYERS = 1;
const HIDDEN_CLASS = "hidden";

const headline = document.querySelector("h1");
const playersHolder = document.querySelector(".players");
const remove = document.querySelector("#remove");
const add = document.querySelector("#add");
const trigger = document.querySelector("#play");

// Helper Functions
const getRandomDiceNumber = () => Math.floor(Math.random() * MAX_DICE_VALUE);
const isMaxPlayers = () => playersHolder.children.length === MAX_PLAYERS;
const isMinPlayers = () => playersHolder.children.length === MIN_PLAYERS;
const updateAddRemoveButtons = () => {
  add.classList.toggle(HIDDEN_CLASS, isMaxPlayers());
  remove.classList.toggle(HIDDEN_CLASS, isMinPlayers());
};

// Main Functions
function generatePlayerResults() {
  return Array.from(playersHolder.children).map((playerElement, i) => {
    const playerInput = playerElement.querySelector("input");
    const playerDice = playerElement.querySelector("i");
    const result = getRandomDiceNumber();

    const playerName = playerInput.value || `Player ${i + 1}`;
    playerDice.className = DICE_CLASSES[result];

    return { name: playerName, result: result + 1 };
  });
}

function declareWinner(playerResults) {
  if (playerResults.length > 1) {
    playerResults.sort((a, b) => a.result - b.result);
    const topPlayer = playerResults[playerResults.length - 1];
    const secondTopPlayer = playerResults[playerResults.length - 2];

    headline.textContent =
      topPlayer.result > secondTopPlayer.result
        ? `${topPlayer.name} Wins!`
        : "Draw!";
  } else {
    headline.textContent = `Result: ${playerResults[0].result}`;
  }
}

function rollDice() {
  const playerResults = generatePlayerResults();
  declareWinner(playerResults);
}

function addPlayer() {
  if (!isMaxPlayers()) {
    const newPlayerHTML = `
      <div class="player">
        <input type="text" placeholder="Player ${
          playersHolder.children.length + 1
        } Name" />
        <i class="${DICE_CLASSES[getRandomDiceNumber()]}"></i>
      </div>
    `;
    playersHolder.insertAdjacentHTML("beforeend", newPlayerHTML);
    headline.textContent = "Dice Game";
    updateAddRemoveButtons();
  }
}

function removePlayer() {
  if (!isMinPlayers()) {
    playersHolder.lastElementChild.remove();
    headline.textContent = "Dice Game";
    updateAddRemoveButtons();
  }
}

// Event Listeners
trigger.addEventListener("click", rollDice);
remove.addEventListener("click", removePlayer);
add.addEventListener("click", addPlayer);
document.addEventListener("keydown", function (e) {
  if (e.target === document.body) {
    switch (e.key) {
      case " ":
      case "Spacebar":
        e.preventDefault();
        rollDice();
        break;
      case "+":
        e.preventDefault();
        addPlayer();
        break;
      case "-":
        e.preventDefault();
        removePlayer();
        break;
    }
  }
});
