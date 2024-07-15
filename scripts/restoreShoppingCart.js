import showItems from "./showItems.js";

function restoreShoppingCart(shoppingCart) {
  const restoredCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  let numberItemsCart = document.querySelector(".number-items-cart");

  shoppingCart = [...restoredCart];
  let legnthCart = shoppingCart.length;
  numberItemsCart.innerHTML = legnthCart;
  showItems(shoppingCart); // Update UI with restored items
}

export default restoreShoppingCart;
