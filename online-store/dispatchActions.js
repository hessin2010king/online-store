import showItems from "./addToCart.js";
import { shoppingCart } from "./product.js";
const dispatchActions = () => {
  var cartUpdatedEvent = new Event("cartUpdated");
  let numberItemsCart = document.querySelector(".number-items-cart");

  document.addEventListener("cartUpdated", () => {
    showItems(shoppingCart);
    console.log(shoppingCart);
    numberItemsCart.innerHTML = legnthCart;
    console.log("Shopping cart updated");
  });
};

export default dispatchActions;
