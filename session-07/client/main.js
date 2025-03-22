const apiUrl = `http://localhost:3000`;

document.querySelector("#get-products").addEventListener("click", () => {
  console.log(`Fetch Products`);
  const productsUl = document.querySelector("#product-list");

  //Empty previous products list items
  productsUl.innerHTML = "";
  // Fetch data

  fetch(`${apiUrl}/products`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        const li = document.createElement("li");
        li.dataset.productId = element.id;
        li.innerText = `${element.name} | ${element.price} `;
        productsUl.appendChild(li);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        li.append(editBtn);

        editBtn.addEventListener("click", () => {
          document.querySelector("#edit-product-id").value = element.id;
          document.querySelector("#edit-product-name").value = element.name;
          document.querySelector("#edit-product-price").value = element.price;
          console.log(element);
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        li.append(deleteBtn);

        deleteBtn.addEventListener("click", () => {
          deleteProduct(element.id);
        });
      });
      console.log(data);
    });
});

document.querySelector("#add-product").addEventListener("click", () => {
  const productName = document.querySelector("#product-name").value;
  const productPrice = document.querySelector("#product-price").value;

  const options = {
    method: "POST",
    body: JSON.stringify({ name: productName, price: productPrice }),
  };
  fetch(`${apiUrl}/products`, options)
    .then((response) => response.json())
    .then((data) => console.log(data));
  console.log(`Add Product`);

  productName.value = "";
  productPrice.value = "";
});

document.querySelector("#edit-product").addEventListener("click", () => {
  const productId = document.querySelector("#edit-product-id").value;

  const productName = document.querySelector("#edit-product-name").value;
  const productPrice = document.querySelector("#edit-product-price").value;

  const options = {
    method: "PUT",
    body: JSON.stringify({ name: productName, price: productPrice }),
  };
  fetch(`${apiUrl}/products/${productId}`, options)
    .then((response) => response.json())
    .then((data) => console.log(data));
  console.log(`Add Product`);

  productName.value = "";
  productPrice.value = "";
});

function deleteProduct(productId) {
  const options = {
    method: "DELETE",
  };
  fetch(`${apiUrl}/products/${productId}`, options)
    .then((response) => response.json())
    .then((data) => console.log(data));
}
