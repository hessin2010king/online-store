import { showItems } from "./script-shopping-cart.js";

export let shopCard = document.querySelector(".shop-card");
shopCard.addEventListener("click", (e) => {
  if (e.target.classList.contains("Delete-item")) {
    const itemId = e.target.classList[1];
    console.log(itemId);
    // Call removeFromCart function with the itemId
    removeFromCart(itemId);
    console.log(itemId);
  }
});

function removeFromCart(itemId) {
    let retrievedCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

  retrievedCart = retrievedCart.filter((item) => item.id != itemId);

  console.log(retrievedCart);

  showItems(retrievedCart);

  console.log("first");

  localStorage.setItem("shoppingCart", JSON.stringify(retrievedCart));
}
