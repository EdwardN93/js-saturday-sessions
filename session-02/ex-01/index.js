const playerName = prompt(`Input player's name`);

let huntingSkill = Number(prompt("Enter survival Skill"));
let luckSkill = Number(prompt("Enter luck Skill"));
let combatSkill = Number(prompt("Enter combat Skill"));

let isAlive = true;
let playerHp = 100;
let attack = false;

let survivalDays = 10;
let daysCount = 1;

console.log(
  `${playerName} starts journey with the skills:\nHunting: ${huntingSkill}\nCombat: ${combatSkill}\nLuck:${luckSkill}`
);

while (isAlive && daysCount <= survivalDays) {
  console.log("\n");
  console.log(`Day ${daysCount} starts!`);

  let diceRoll = Math.floor(Math.random() * 10) + 1;
  let combatDice = Math.floor(Math.random() * 10) + 1;

  console.log(
    `${playerName} (hunting skill : ${huntingSkill}) goes hunting and rolls ${diceRoll}`
  );

  if (isAlive && diceRoll <= huntingSkill) {
    playerHp += 10;
    if (playerHp > 100) {
      playerHp = 100;
    }
    console.log(`${playerName} finds food hp: ${playerHp}`);
  } else {
    playerHp -= 10;
    if (playerHp <= 0) {
      isAlive = false;
      console.log(`${playerName} died of starvation`);
    } else {
      console.log(
        `${playerName} did not find food and is starving.. Hp: ${playerHp}`
      );
    }
  }

  if (isAlive && combatDice >= luckSkill) {
    let monsterHp = 10;
    monsterIsAlive = true;

    attack = true;
    console.log(`${playerName} encountered a monster`);

    while (attack) {
      let monsterAttack = Math.floor(Math.random() * 5) + 1;
      let playerAttack = Math.floor(Math.random() * combatSkill) + 1;

      if (playerHp > 0) {
        monsterHp -= playerAttack;
        monsterHp > 0
          ? console.log(
              `Monster attacked ${playerName} and did ${monsterAttack} damage`
            )
          : "";
      } else {
        console.log(
          `Monster killed ${playerName} with a killing blow of ${monsterAttack}`
        );
        attack = false;
        playerHp = 0;
        isAlive = false;
      }
      if (monsterHp > 0) {
        playerHp -= monsterAttack;
        playerHp > 0
          ? console.log(
              `${playerName} attacked monster and did ${playerAttack} damage`
            )
          : "";
      } else {
        console.log(
          `${playerName} killed the monster with a killing blow of ${playerAttack} damage; Hp: ${playerHp}`
        );
        monsterIsAlive = false;
        attack = false;
      }
    }
  } else {
    playerHp > 1
      ? console.log(`${playerName} did not enchounter any monsters`)
      : "";
  }
  daysCount++;
}
isAlive
  ? console.log(`${playerName} Survived the journey!`)
  : console.log(`Unfortunately, ${playerName} didn't survive long enough`);
