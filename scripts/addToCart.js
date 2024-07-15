import { notificationDvi } from "./aleartAndNatifcations.js";
import { shoppingCart } from "./product.js";
import dispatchActions from "./dispatchActions.js";

function addToCart(e, product, callback) {
  const cartUpdatedEvent = new Event("cartUpdated");
  const numberItemsCart = document.querySelector(".number-items-cart");

  // Check if e and e.target are defined
  if (!e || !e.target) {
    console.error("Event or event target is not defined.");
    return;
  }

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

    const lengthCart = shoppingCart.length;
    numberItemsCart.innerHTML = lengthCart;
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    dispatchActions();
    document.dispatchEvent(cartUpdatedEvent);
  } else {
    callback(product);
  }
}

export default addToCart;
