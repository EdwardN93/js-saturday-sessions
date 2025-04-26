console.log("Old way implementation of Dice Game");

const gameRounds = 6;

function playerFactory(name, avatar) {
  return {
    name,
    avatar,
    score: 0,
  };
}

function movePlayer(p) {
  console.log(" ");
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  console.log(`${p.avatar}: ${p.name} rolls ${diceRoll}`);
  p.score += diceRoll;
  console.log(`${p.avatar}: ${p.name} current score: ${p.score}`);
  console.log(" ");
}

const p1 = playerFactory("Petrica", "🚃");
const p2 = playerFactory("Maricica", "🚓`");

for (let i = 1; i <= gameRounds; i++) {
  console.log(" ");
  console.log(`=== ROUND ${i} STARTS ===`);

  // Player 1 turn
  movePlayer(p1);
  movePlayer(p2);
  // Player 2 turn
}
