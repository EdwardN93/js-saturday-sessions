console.log("Fetch explained!");

console.log("Before request fire");

fetch("https://api.chucknorris.io/jokes/random")
  .then((response) => {
    console.log("Response received");
    console.log(response);
    return response.json();
  })
  .then((apiData) => {
    console.log("response string parsed");
    console.log(apiData);
  });

console.log("After request fire");
