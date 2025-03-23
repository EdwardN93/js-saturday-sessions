const apiUrl = `http://localhost:3000`;

document.querySelector("#get-products")?.addEventListener("click", displayData);

document.querySelector("#add-product")?.addEventListener("click", () => {
  const productName = document.querySelector("#product-name");
  const productPrice = document.querySelector("#product-price");

  const options = {
    method: "POST",
    body: JSON.stringify({
      name: productName.value,
      price: productPrice.value,
    }),
  };
  fetch(`${apiUrl}/products`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayData();
    });
  console.log(`Add Product`);

  productName.value = "";
  productPrice.value = "";
});

document.querySelector("#edit-product")?.addEventListener("click", () => {
  const productId = document.querySelector("#edit-product-id").value;
  const productName = document.querySelector("#edit-product-name");
  const productPrice = document.querySelector("#edit-product-price");

  const options = {
    method: "PUT",
    body: JSON.stringify({
      name: productName.value,
      price: Number(productPrice.value),
    }),
  };

  fetch(`${apiUrl}/products/${productId}`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".edit-section").style.display = "none";
      displayData();
    });
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
    .then((data) => {
      console.log(data);
      displayData();
    });
}

function displayData() {
  console.log(`Fetch Products`);
  const productsUl = document.querySelector("#product-list");

  //Empty previous products list items

  if (productsUl !== null) productsUl.innerHTML = "";
  // Fetch data

  fetch(`${apiUrl}/products`)
    .then((response) => response.json())
    .then((data) => {
      const liNoItems = document.createElement("li");
      liNoItems.classList.add("no-items");
      liNoItems.innerText = `No items in list. Add items to display them`;

      if (data.length < 1) {
        productsUl.append(liNoItems);
      } else if (productsUl !== null) productsUl.innerHTML = "";

      data.forEach((element) => {
        const li = document.createElement("li");
        const div = document.createElement("div");
        // div.textContent = `${element.name} | ${element.price} `;
        const a = document.createElement("a");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        h3.textContent = element.name;
        const h4Price = document.createElement("h4");
        h4Price.textContent = `${element.price} Lei`;
        img.src = `../../server/img/rochie-roz-cambrata/${
          element?.pictures[Math.floor(Math.random() * element.pictures.length)]
        }`;
        img.classList.add("list-img");
        a.append(img);
        div.append(a);
        div.appendChild(h3);
        div.appendChild(h4Price);
        li.dataset.productId = element.id;
        li.appendChild(div);
        if (productsUl) productsUl.append(li);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        li.appendChild(editBtn);

        editBtn.addEventListener("click", () => {
          document.querySelector("#edit-product-id").value = element.id;
          document.querySelector("#edit-product-name").value = element.name;
          document.querySelector("#edit-product-price").value = element.price;
          document.querySelector(".edit-section").style.display = "block";
          console.log(element);
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        li.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", () => {
          deleteProduct(element.id);
          displayData();
        });
      });
      console.log(data);
    });
}
displayData();
console.log(window.location.pathname);
