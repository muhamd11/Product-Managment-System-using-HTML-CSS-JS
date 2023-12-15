let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let total = document.getElementById("total");
let mode = "create";
let tmp;

// Get Total Price
const getTotal = () => {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#dd5151";
  }
};

// Create Product
let products;
if (localStorage.products != null) {
  products = JSON.parse(localStorage.products);
} else {
  products = [];
}

submit.onclick = () => {
  let product = {
    title: title.value.toLowerCase(),
    price: +price.value,
    taxes: +taxes.value,
    ads: +ads.value,
    discount: +discount.value,
    total: +total.innerHTML,
    count: +count.value,
    category: category.value.toLowerCase(),
  };
  // Create Count

  if (
    title.value != "" &&
    count.value <= 100 &&
    price.value != "" &&
    category.value != ""
  ) {
    if (mode === "create") {
      if (product.count > 1) {
        for (let i = 0; i < product.count; i++) {
          products.push(product);
        }
      } else {
        products.push(product);
      }
    } else {
      products[tmp] = product;
      count.style.display = "block";
      submit.innerHTML = "create";
      mode = "create";
    }
    // Clear Data From Inputs
    clearData();
  }

  // Save To LocalSotarge
  localStorage.setItem("products", JSON.stringify(products));

  // Read Product In Table
  showData();
};

// Clear Data From Inputs
const clearData = () => {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  total.style.backgroundColor = "#dd5151";
};

// Read Product In Table
const showData = () => {
  let table = "";
  for (let i = 0; i < products.length; i++) {
    table += `
    <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">UPDATE</button></td>
        <td><button onclick="deleteData(${i})" id="delete">DELETE</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelAll = document.getElementById("deleteAll");
  if (products.length > 0) {
    btnDelAll.innerHTML = `
    <button onclick="deleteAll()">Delete All (${products.length})</button>
    `;
  } else {
    btnDelAll.innerHTML = "";
  }
};
showData();

// Delete Products
const deleteData = (id) => {
  products.splice(id, 1);
  localStorage.products = JSON.stringify(products);
  showData();
};
const deleteAll = () => {
  localStorage.clear();
  products.splice(0);
  showData();
};

// Update Products
const updateData = (i) => {
  mode = "update";
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  ads.value = products[i].ads;
  discount.value = products[i].discount;
  category.value = products[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
};

// Search Product
let search = "title";

const getSearchMood = (id) => {
  let searchInput = document.getElementById("search");

  if (id === "searchTitle") {
    search = "title";
  } else {
    search = "category";
  }
  searchInput.placeholder = "Search By " + search;

  searchInput.focus();
  searchInput.value = "";
  showData();
};

const searchData = (value) => {
  let table = "";
  for (let i = 0; i < products.length; i++) {
    if (search == "title") {
      if (products[i].title.includes(value.toLowerCase())) {
        table += `
              <tr>
                  <td>${i}</td>
                  <td>${products[i].title}</td>
                  <td>${products[i].price}</td>
                  <td>${products[i].taxes}</td>
                  <td>${products[i].ads}</td>
                  <td>${products[i].discount}</td>
                  <td>${products[i].total}</td>
                  <td>${products[i].category}</td>
                  <td><button onclick="updateData(${i})" id="update">UPDATE</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">DELETE</button></td>
              </tr>
              `;
      }
    } else {
      if (products[i].category.includes(value.toLowerCase())) {
        table += `
                <tr>
                    <td>${i}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">UPDATE</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">DELETE</button></td>
                </tr>
                `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
};
// Clean Data
