"use strict";
var _a;
function log() {
    console.log("Work");
}
const players = [];
const playerFactory = (name, location) => {
    const player = {
        name,
        location,
        score: 0,
    };
    return player;
};
players.push(playerFactory("Edward", "Bucuresti"));
players.push(playerFactory("Anca", "Cluj"));
players.push(playerFactory("Andreea", "Cluj"));
players.push(playerFactory("Ionut", "Bistrita"));
players.push(playerFactory("Elena", "Bucuresti"));
players.push(playerFactory("Adi", "Brasov"));
console.log(players);
function shuffle(array) {
    return array.sort((a, b) => Math.random() - 0.5);
}
(_a = document
    .querySelector("#shuffle-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const displayContainer = document.querySelector("#display-players");
    if (displayContainer) {
        displayContainer.innerHTML = "";
        shuffle(players).forEach((player) => {
            const playerContainer = document.createElement("div");
            playerContainer.classList.add("player-container");
            playerContainer.textContent = player.name;
            displayContainer.append(playerContainer);
        });
    }
});
