console.log("Shiny new way implementation of Dice Game");

const gameRounds = 6;

const p1 = new Player("Petrica", "🚃");
const p2 = new Player("Maricica", "🚓");

for (let i = 1; i <= gameRounds; i++) {
  console.log(" ");
  console.log(`=== ROUND ${i} STARTS ===`);

  // Player 1 turn
  p1.movePlayer();
  // Player 2 turn
  p2.movePlayer();
}
