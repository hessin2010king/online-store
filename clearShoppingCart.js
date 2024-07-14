let retrievedCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
function clearShoppingCart() {
  localStorage.removeItem("shoppingCart");
  shoppingCart = [];
  numberItemsCart.innerHTML = shoppingCart.length;
  showItems(shoppingCart);
}

export default clearShoppingCart;
