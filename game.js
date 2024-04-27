import { DOM } from "./my_framework/dom";

export function initializeGame(playerName) {
  const welcomeMessage = `Welcome, ${playerName}! Game has started.`;
  DOM.setHTML(".game-container", welcomeMessage);
  // Add more game initialization logic here.
}
