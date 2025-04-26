console.log("Using the player class - Implementing different dice game");

const gameRounds = 10;

const p1 = new Player("Petrica", "🚃");
const p2 = new Player("Maricica", "🚓");

function game() {
  for (let i = 1; i <= gameRounds; i++) {
    console.log(" ");
    console.log(`=== ROUND ${i} STARTS ===`);
    const chosenPlayer = Math.random() > 0.5 ? p1 : p2;
    console.log(`${chosenPlayer.name} will roll the dice this round`);
    chosenPlayer.movePlayer();
  }
  playerWin();
}

function playerWin() {
  const message =
    p1.score > p2.score
      ? `${p1.name} wins with score: ${p1.score}`
      : `${p2.name} wins with score: ${p2.score}`;
  console.log(message);
}
game();
