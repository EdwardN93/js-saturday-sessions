function log(): void {
  console.log("Work");
}
type Player = {
  name: string;
  location: string;
  score: 0;
};
const players: Player[] = [];

const playerFactory = (name: string, location: string): Player => {
  const player: Player = {
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

function shuffle(array: Player[]): Player[] {
  return array.sort((a, b) => Math.random() - 0.5);
}

document
  .querySelector<HTMLButtonElement>("#shuffle-btn")
  ?.addEventListener("click", () => {
    const displayContainer =
      document.querySelector<HTMLDivElement>("#display-players");

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
