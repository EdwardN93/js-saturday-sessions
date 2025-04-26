class Player {
  constructor(name, avatar) {
    this.name = name;
    this.avatar = avatar;
    this.score = 0;
  }

  movePlayer() {
    console.log(" ");
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    console.log(`${this.avatar}: ${this.name} rolls ${diceRoll}`);
    this.score += diceRoll;
    console.log(`${this.avatar}: ${this.name} current score: ${this.score}`);
    console.log(" ");
  }
}
