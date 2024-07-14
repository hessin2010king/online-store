const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("search");
const productModal = document.getElementById("productModal");
const modalContent = document.getElementById("productDetails");
const closeModal = document.querySelector(".close");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const numberItemsCart = document.querySelector(".number-items-cart");
const btnClear = document.querySelector(".btn-clear");
const ratingFilter = document.getElementById("ratingFilter");
const priceFilter = document.getElementById("priceFilter");
const discountFilter = document.getElementById("discountFilter");


export let shoppingCart =
  JSON.parse(localStorage.getItem("shoppingCart")) || [];
let legnthCart = shoppingCart.length;
localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

function clearShoppingCart() {
  localStorage.removeItem("shoppingCart");
  shoppingCart = [];
  legnthCart = shoppingCart.length;
  numberItemsCart.innerHTML = legnthCart;
  showItems(shoppingCart);
}

btnClear.addEventListener("click", () => {
  clearShoppingCart();
  console.log("Shopping cart cleared");
});

let currentCategory = '';
let currentRating = '';
let currentPrice = '';
let currentDiscount = '';
let currentPage = 0;
const limit = 9;

function fetchProducts(skip = 0, limit = 9) {
  let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
        if (currentCategory) {
            url += `&category=${currentCategory}`;
        }
    fetch(url)
    .then((response) => response.json())
    .then((data) => { 
      let products = data.products;
      // Apply filters
      if (currentRating) {
          products = products.filter(product => product.rating >= currentRating);
      }
      if (currentPrice) {
          products = products.filter(product => product.price <= currentPrice);
      }
      if (currentDiscount) {
          products = products.filter(product => product.discountPercentage >= currentDiscount);
      }
      displayProducts(products);
      updatePageInfo(skip, limit, data.total);
      populateCategories(products);
      // populateCategories(products);
      showItems(shoppingCart);
    })
    .catch((error) => {
      closeAleart(error),
        openAleart(error),
        console.error("Error fetching products:", error);
    });
}

function displayProducts(products) {
  productList.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p class="discount">${product.discountPercentage}% Discount</p>

      <div class='parent-content'>
        <p>$${product.price}</p>
        <button class='btn-to-cart'> Add To Cart </button>
      </div>
    `;
    productDiv.addEventListener("click", (e) => {
      addToCart(e, product, () => showProductDetails(product));
    });

    productList.appendChild(productDiv);
  });
}
// product category filter
function populateCategories(products) {
  categoryFilter.innerHTML = '<option value="">All Categories</option>';
  const categories = [...new Set(products.map(product => product.category))];
  categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
  });
}

function showProductDetails(product) {
  modalContent.innerHTML = `
    <div class="slider">
      <div class="slides">
        ${product.images
          .map((image) => `<img src="${image}" alt="${product.title}">`)
          .join("")}
      </div>
      <a class="prev">&#10094;</a>
      <a class="next">&#10095;</a>
    </div>
    <h2>${product.title}</h2>
    <p>${product.description}</p>
    <p>$${product.price}</p>
    <p>Rating: ${product.rating}</p>
    <p class="discount">${product.discountPercentage}% Discount</p>

    <a href="productdetails.html">
      <button id="show">More details</button>
    </a>
    <button class='btn-to-cart' id="addCartFD"> Add To Cart </button>
  `;

  productModal.style.display = "block";
  localStorage.setItem("productId", JSON.stringify(product.id));
  initSlider();

  const addCartFD = document.getElementById("addCartFD");
  addCartFD.addEventListener("click", (e) => {
    addToCart(e, product);
  });
}

function initSlider() {
  let slideIndex = 0;
  const slides = document.querySelector(".slides");
  const images = document.querySelectorAll(".slides img");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  function showSlide(index) {
    if (index >= images.length) slideIndex = 0;
    if (index < 0) slideIndex = images.length - 1;
    slides.style.transform = `translateX(${-slideIndex * 100}%)`;
  }

  prev.addEventListener("click", () => {
    showSlide(--slideIndex);
  });

  next.addEventListener("click", () => {
    showSlide(++slideIndex);
  });

  showSlide(slideIndex);
}

function updatePageInfo(skip, limit, total) {
  pageInfo.textContent = `Page ${Math.ceil((skip + 1) / limit)} of ${Math.ceil(
    total / limit
  )}`;
  prevBtn.disabled = skip === 0;
  nextBtn.disabled = skip + limit >= total;
}

window.onclick = function (event) {
  if (event.target == productModal) {
    productModal.style.display = "none";
  }
};

closeModal.addEventListener("click", () => {
  productModal.style.display = "none";
});

searchInput.addEventListener("input", function () {
  const query = searchInput.value.toLowerCase();
  fetch(`https://dummyjson.com/products/search?q=${query}`)
    .then((response) => response.json())
    .then((data) => displayProducts(data.products))
    .catch((error) => {
      console.error("Error searching products:", error);
    });
});

categoryFilter.addEventListener("change", function () {
  const category = categoryFilter.value;
  fetch(
    category
      ? `https://dummyjson.com/products/category/${category}`
      : "https://dummyjson.com/products"
  )
    .then((response) => response.json())
    .then((data) => displayProducts(data.products))
    .catch((error) => {
      console.error("Error filtering products:", error);
    });
});

ratingFilter.addEventListener("change", function() {
  currentRating = ratingFilter.value;
  fetchProducts(0, limit);
});

priceFilter.addEventListener("change", function() {
  currentPrice = priceFilter.value;
  fetchProducts(0, limit);
});

discountFilter.addEventListener("change", function() {
  currentDiscount = discountFilter.value;
  fetchProducts(0, limit);
});

prevBtn.addEventListener("click", function () {
  if (currentPage > 0) {
    currentPage--;
    fetchProducts(currentPage * limit, limit);
  }
});

nextBtn.addEventListener("click", function () {
  currentPage++;
  fetchProducts(currentPage * limit, limit);
});

export function addToCart(e, product, callback) {
  const btnToCart = e.target.closest(".btn-to-cart");
  if (btnToCart) {
    notificationDvi("Add to shopping cart", "green");
    if (!product) {
      console.error("Product not found.");
      return;
    }

    let existingItem = shoppingCart.find((item) => item.id === product.id);
    if (!existingItem) {
      product.quantity = 1;
      shoppingCart.push(product);
    } else {
      existingItem.quantity++;
    }

    legnthCart = shoppingCart.length;
    numberItemsCart.innerHTML = legnthCart;
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    // restoreShoppingCart(shoppingCart);
    document.dispatchEvent(cartUpdatedEvent);
  } else {
    callback(product);
  }
}

export var cartUpdatedEvent = new Event("cartUpdated");

document.addEventListener("cartUpdated", () => {
  showItems(shoppingCart);
  console.log(shoppingCart);
  numberItemsCart.innerHTML = legnthCart;
  console.log("Shopping cart updated");
});


fetchProducts();
import {
  notificationDvi,
  showItems,
  closeAleart,
  openAleart,
} from "./script-shopping-cart.js";
