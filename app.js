import { DOM } from "./my_framework/dom";
import { Router } from "./my_framework/router";
import { initializeGame } from "./game.js";

const router = new Router();

router.addRoute("/", () => {
  const container = DOM.getByClass("game-container")[0];
  const input = DOM.createElement("input", { placeholder: "Enter your name", type: "text", class: "player-name" });
  const button = DOM.createElement("button", {}, "Start Game");
  button.addEventListener('click', () => startGame(button));
  DOM.setHTML(".game-container", "");
  container.appendChild(input);
  container.appendChild(button);
});

function startGame(button) {
  const playerName = DOM.getValue(".player-name");
  if (playerName) {
    button.disabled = true; // Disable button to prevent multiple clicks
    let counter = 10;
    const countdown = DOM.createElement("div", {}, `Game starts in ${counter} seconds...`);
    DOM.setHTML(".game-container", "");
    DOM.append(".game-container", countdown);
    const interval = setInterval(() => {
      counter--;
      countdown.textContent = `Game starts in ${counter} seconds...`;
      if (counter === 0) {
        clearInterval(interval);
        initializeGame(playerName);
      }
    }, 1000);
  } else {
    alert("Please enter your name to start the game.");
  }
}

router.navigate("/");
