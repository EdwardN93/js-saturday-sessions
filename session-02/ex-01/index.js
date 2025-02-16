const playerName = prompt(`Input player's name`);

let huntingSkill = Number(prompt("Enter survival Skill"));
let luckSkill = Number(prompt("Enter luck Skill"));
let combatSkill = Number(prompt("Enter combat Skill"));
let critChance = 1;

let playerIsAlive = true;
let playerHp = 100;
let attack = false;

let gold = 0;

let survivalDays = 10;
let daysCount = 1;
let monstersKilledCount = 0;

console.log(
  `${playerName} starts journey with ${gold} gold coins and the following skills:\nHunting: ${huntingSkill}\nCombat: ${combatSkill}\nLuck:${luckSkill}`
);

while (playerIsAlive && daysCount <= survivalDays) {
  delay(1000);
  console.log("\n");
  console.log(`Day ${daysCount} starts!`);

  let diceRoll = Math.floor(Math.random() * 10) + 1;
  let combatDice = Math.floor(Math.random() * 10) + 1;
  let goldDice = Math.floor(Math.random() * 10) + 1;

  delay(1000);
  console.log(
    `${playerName} (hunting skill : ${huntingSkill}) goes hunting and rolls ${diceRoll}`
  );
  delay(1000);
  if (playerIsAlive && diceRoll <= huntingSkill) {
    delay(1000);
    playerHp += 10;
    if (playerHp > 100) {
      playerHp = 100;
    }
    console.log(`${playerName} finds food hp: ${playerHp}`);
  } else {
    playerHp -= 10;
    if (playerHp <= 0) {
      delay(1000);
      playerIsAlive = false;
      console.log(`${playerName} died of starvation`);
    } else {
      delay(1000);
      console.log(
        `${playerName} did not find food and is starving.. Hp: ${playerHp}`
      );
    }
  }

  if (goldDice <= luckSkill) {
    delay(1000);
    goldFound = Math.floor(Math.random() * 20) + 1;
    gold += goldFound;
    console.log(
      `${playerName} found ${goldFound} gold pieces and now has ${gold}`
    );
  } else {
    delay(1000);
    console.log(`${playerName} did not find any gold coins`);
  }

  if (playerIsAlive && combatDice >= luckSkill) {
    let monsterHp = 10;
    monsterIsAlive = true;

    attack = true;
    console.log(`${playerName} encountered a monster `);

    while (attack) {
      let monsterAttack = Math.floor(Math.random() * 5) + 1;
      let playerAttack = Math.floor(Math.random() * combatSkill) + 1;
      let critDice = Math.floor(Math.random() * 10);

      let criticalHit = false;
      let critDamage = Math.floor(
        playerAttack + combatSkill * (1 + critChance)
      );

      if (playerHp > 1 && playerIsAlive) {
        delay(2000);
        if (critDice <= critChance) {
          monsterHp -= critDamage;
          criticalHit = true;
          console.log(
            `${playerName} did critical hit of ${critDamage} to the monster`
          );
        } else {
          monsterHp -= playerAttack;
          monsterHp > 0
            ? console.log(
                `Monster attacked ${playerName} and did ${monsterAttack} damage`
              )
            : "";
        }
      } else {
        console.log(
          `Monster killed ${playerName} with a killing blow of ${monsterAttack}`
        );
        attack = false;
        playerHp = 0;
        playerIsAlive = false;
      }
      if (monsterHp > 0 && monsterIsAlive) {
        delay(2000);
        playerHp -= monsterAttack;
        if (monsterHp > 0 && playerIsAlive) {
          console.log(
            `${playerName} attacked monster and did ${playerAttack} damage`
          );
        }
      } else {
        console.log(
          `${playerName} killed the monster with a killing blow of ${
            criticalHit ? critDamage : playerAttack
          } damage; Hp: ${playerHp}`
        );
        monsterIsAlive = false;
        attack = false;
        monstersKilledCount++;
      }
    }
  } else {
    playerHp > 1
      ? console.log(`${playerName} did not encounter any monsters`)
      : "";
  }
  daysCount++;
}
playerIsAlive
  ? console.log(
      `${playerName} survived! Collected ${gold} gold coins and killed ${
        monstersKilledCount == 0 ? "no" : monstersKilledCount
      } ${monstersKilledCount == 1 ? "monster" : "monsters"} on his journey!`
    )
  : console.log(`Unfortunately, ${playerName} didn't survive long enough`);

function delay(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Wait for the time to pass
  }
}
