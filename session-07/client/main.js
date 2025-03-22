const apiUrl = `http://localhost:3000`;

document.querySelector("#get-products").addEventListener("click", () => {
  console.log(`Fetch Products`);
  fetch(`${apiUrl}/products`)
    .then((response) => response.json())
    .then((data) => console.log(data));
});

document.querySelector("#add-product").addEventListener("click", () => {
  fetch(`${apiUrl}/products`)
    .then((response) => response.json())
    .then((data) => console.log(data));
  console.log(`Add Product`);
});
