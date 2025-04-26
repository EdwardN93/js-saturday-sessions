console.log("OOP for UI");

const container = document.querySelector(".container");

class Panel {
  constructor(parentElement, id, text = "?") {
    this.domElement = null;
    this.createComponent(parentElement, id, text);
  }

  createComponent(parentElement, id, text) {
    this.domElement = document.createElement("div");
    this.domElement.classList.add("panel");
    this.domElement.id = id;
    this.domElement.textContent = text;
    parentElement.append(this.domElement);
  }

  changeText(text) {
    this.domElement.textContent = text;
  }

  addClass(cssClass) {
    this.domElement.classList.add(cssClass);
  }
}

const p1 = new Panel(container, "panel-1");
const p2 = new Panel(container, "panel-2");
const p3 = new Panel(container, "panel-3");
const p4 = new Panel(container, "panel-4");

p1.changeText("🦆");
p3.changeText("🐰");
p3.addClass("grass");
p1.addClass("water");

p2.domElement.textContent = "!!";
