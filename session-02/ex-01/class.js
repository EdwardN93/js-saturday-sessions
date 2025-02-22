class Account {
  constructor(name, currency, pin) {
    this.name = name;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${name}`);
  }

  deposit(val) {
    this.movements.push(val);
  }
  withdrawal(val) {
    this.movements.push(-val);
  }
  balance() {
    let balance = 0;
    for (let i = 0; i < this.movements.length; i++) {
      balance += this.movements[i];
    }
    return balance;
  }
  transactions() {
    let mapper = this.movements.map((element) => {
      return element;
    });
    return mapper;
  }
}

const acc1 = new Account("Edward", "EUR", 1111);

acc1.deposit(1000);
acc1.withdrawal(10);
console.log(acc1);

let balanceText = document.querySelector(".balance");
const addM = document.querySelector(".addMoney");
const withdraw = document.querySelector(".withdrawl");
let inputDeposit = document.querySelector(".inputDeposit");
let inputWithdrawal = document.querySelector(".inputWithdrawal");
let transaction = document.querySelector(".transaction");
let trans = acc1.transactions();
console.log(trans);

addM.addEventListener("click", function () {
  acc1.deposit(+inputDeposit.value);
  html = `<li class="movement deposit">
    deposit: ${+inputDeposit.value}
    </li>`;
  transaction.insertAdjacentHTML("beforeend", html);
  balance();
  inputDeposit.value = "";
});

withdraw.addEventListener("click", function () {
  if (acc1.balance() < inputWithdrawal.value) {
    console.log("not enough money");
    return;
  }
  acc1.withdrawal(inputWithdrawal.value);
  html = `<li class="movement withdraw">
  withdraw: -${inputWithdrawal.value}
  </li>`;
  transaction.insertAdjacentHTML("beforeend", html);
  balance();
  inputWithdrawal.value = "";
});

function balance() {
  balanceText.innerText = `€${Number(acc1.balance()).toLocaleString()}`;
}

function transactionsOnScreen() {
  acc1.transactions().forEach((element) => {
    html = `<li class="movement ${element > 0 ? "deposit" : "withdraw"} ">
    ${element > 0 ? "deposit" : "withdrawal"} ${element}
    </li>`;
    transaction.insertAdjacentHTML("beforeend", html);
  });
}
balance();
transactionsOnScreen();
