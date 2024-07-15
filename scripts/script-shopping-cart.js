import restoreShoppingCart from "./restoreShoppingCart.js";
import showItems from "./showItems.js";

let btnCart = document.querySelector(".btn-cart");
let parentsectionCart = document.querySelector(".parent-section-shop");
let numberItemsCart = document.querySelector(".number-items-cart");
let btnClear = document.querySelector(".btn-clear");
const productList = document.getElementById("productList");
// Initialize shopping cart from localStorage or set it to an empty array
let retrievedCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

let Deleteitem = document.createElement("div");
Deleteitem.className = "Delete-item";
export let shopCard = document.querySelector(".shop-card");

export function clearShoppingCart() {
  localStorage.removeItem("shoppingCart");
  retrievedCart = [];
  restoreShoppingCart(retrievedCart);
}

btnClear.addEventListener("click", () => {
  clearShoppingCart();
  console.log("Shopping cart cleared");
});

restoreShoppingCart();

if (retrievedCart === null) {
  retrievedCart = [];
  console.log(retrievedCart);
}

// open and close the shopping cart

btnCart.addEventListener("click", () => {
  parentsectionCart.classList.toggle("close-sopping-cart");
  console.log(retrievedCart);
  console.log("first");
});

productList.addEventListener("click", () => {
  parentsectionCart.classList.remove("close-sopping-cart");
  console.log(retrievedCart);
});
