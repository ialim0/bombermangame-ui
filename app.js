import { DOM } from "./my_framework/dom";
import { Router } from "./my_framework/router";
import { initializeGame } from "./game.js";

const router = new Router();

router.addRoute("/", () => {
  const container = DOM.getByClass("game-container")[0];
  const input = DOM.createElement("input", { placeholder: "Enter your name", type: "text", class: "player-name" });
  const button = DOM.createElement("button", {}, "Start Game");
  button.addEventListener('click', startGame);
  DOM.setHTML(".game-container", "");
  container.appendChild(input);
  container.appendChild(button);
});

function startGame() {
  const playerName = DOM.getValue(".player-name");
  if (playerName) {
    const countdown = DOM.createElement("div", {}, "Game starts in 10 seconds...");
    DOM.setHTML(".game-container", "");
    DOM.append(".game-container", countdown);
    setTimeout(() => {
      initializeGame(playerName);
    }, 10000);
  }
}

router.navigate("/");
