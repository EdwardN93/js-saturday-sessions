// 15 min challenge 1

function diceRoll(dice = 6) {
  return Math.floor(Math.random() * dice) + 1;
}

// 15 min challenge 2

function rollMultipleDice(dices = 2) {
  const rollsPerDice = [];
  if (dices > 1) {
    for (let i = 0; i < dices; i++) {
      rollsPerDice.push(diceRoll());
    }
    return rollsPerDice;
  } else {
    rollsPerDice.push(diceRoll());
  }
  return rollsPerDice;
}

// 15 min challenge 3

let rewardsForWinning = [
  "$50 USD american dollars",
  "a 3 days vacation in Hell",
  "emmotional damage",
  "an arrow in the knee",
  "a Js course",
  "nothing",
  "a Dog",
];

function rewardDice(reward) {
  return reward[Math.floor(Math.random() * reward.length)];
}

console.log(`Congratulations ! You earned: ${rewardDice(rewardsForWinning)}`);
