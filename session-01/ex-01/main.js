console.log("main.js loaded");
/* 
Programul preia de la utilizator o valoare numerica si afiseaza
   1. intr-un singur mesaj, o secventa de text ce contine: numarului anterior, numarul primit, numarul succesiv (ex. 5 => "4, 5, 6")
   2. opusul numarului (ex. 5 => "opusul numarului 5 este -5", -3 => "opusul numarului -3 este 3")
   3. restul impartirii la 2 (ex. 5 => "restul impartirii lui 5 la 2 este 1")
   4. 2 la puterea valorii (ex. 3 => "2 la puterea 3 este 8")
*/

// 1)
let inputNr = Number(prompt("Input a number"));
let sequenceNr = inputNr;

let sequence = [];

for (let x = 0; x < 3; x++) {
  sequence.push(sequenceNr++ - 1);
}
console.log(inputNr);

alert(sequence.join(", "));
alert(`The opposite of ${inputNr} is : ${-inputNr}`);
alert(`The remainder of ${inputNr} divided by 2 is : ${inputNr % 2}`);
alert(`2 to the power of ${inputNr} is ${2 ** inputNr}`);
