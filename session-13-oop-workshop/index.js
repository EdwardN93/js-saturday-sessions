const displayElement = document.querySelector(".display-dice");

class DiceComponent {
  constructor(parentElement, dice = 1) {
    this.diceDisplay = parentElement;
    this.diceNumber = dice;

    if (!this.isValidDice(dice)) {
      console.log(
        `Dice value must be a number 1 – 6 or a valid image path (string).`
      );
      return;
    }

    this.diceElement = document.createElement("div");
    this.img = document.createElement("img");
    this.diceElement.append(this.img);
    this.diceDisplay.append(this.diceElement);

    this.displayDice();
  }

  setSideImgs(sideImgs = []) {
    if (sideImgs.length == 0) {
      this.sideImgs = [
        "dice-imgs/dice-1.svg",
        "dice-imgs/dice-2.svg",
        "dice-imgs/dice-3.svg",
        "dice-imgs/dice-4.svg",
        "dice-imgs/dice-5.svg",
        "dice-imgs/dice-6.svg",
      ];
    }
  }

  setValue(newValue) {
    if (!this.isValidDice(newValue)) {
      console.log(
        `Dice value must be a number 1 – 6 or a valid image path (string).`
      );
      return;
    }

    this.diceNumber = newValue;
    this.displayDice();
  }

  displayDice() {
    this.img.src =
      typeof this.diceNumber === "string"
        ? this.diceNumber
        : `./dice-imgs/dice-${this.diceNumber}.svg`;
    this.img.alt = `Dice ${this.diceNumber}`;
  }

  isValidDice(value) {
    return (
      (typeof value === "number" && value >= 1 && value <= 6) ||
      (typeof value === "string" && value.trim() !== "")
    );
  }
}

class DiceSet {
  constructor(parentElement, diceNumber = 2) {
    this.diceComponents = [];

    for (let i = 0; i < diceNumber; i++) {
      this.diceComponents.push(new DiceComponent(parentElement));
    }
  }

  setDiceValue(diceIndex, newValue) {
    this.diceComponents[diceIndex].setValue(newValue);
  }
}

const dice1 = new DiceComponent(displayElement);
const dice2 = new DiceComponent(displayElement, 2);
const dice3 = new DiceComponent(displayElement, "./dice-imgs/dice-3.svg");

const continer = document.querySelector(".container");
const diceSet = new DiceSet(container);
