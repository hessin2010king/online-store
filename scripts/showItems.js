let shopCard = document.querySelector(".shop-card");
let numberItemsCart = document.querySelector(".number-items-cart");

function showItems(shoppingCart) {
  console.clear();
  let lengthCart = shoppingCart.length;
  numberItemsCart.innerHTML = lengthCart;
  shopCard.innerHTML = "";

  shoppingCart.forEach((item, index) => {
    let itemTotalPrice = item.quantity * item.price;

    shopCard.innerHTML += `
      <div class="parent-item-cart-sin" >
        <img width="100px" src="${item.images[0]}" />
        <span>${item.title}</span>
        <br/>
        <input type="number" value="${
          item.quantity
        }" class="inputQ" data-id="${index}" />
        <div>
      </div>
        <span>Price: $${item.price}</span>
        <span class="totalPrice2" data-id="${index}">Total: $${itemTotalPrice.toFixed(
      2
    )}</span>
        <button class="Delete-item" data-id="${index}">Delete</button>
      </div>
    `;
  });

  updateTotalPrice(shoppingCart);
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

function updateQuantity(shoppingCart, index, newQuantity) {
  shoppingCart[index].quantity = newQuantity;
  let itemTotalPrice = newQuantity * shoppingCart[index].price;

  let totalPrice2 = document.querySelector(`.totalPrice2[data-id="${index}"]`);
  totalPrice2.innerHTML = "Total: $" + itemTotalPrice.toFixed(2);

  updateTotalPrice(shoppingCart);
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

function deleteItem(shoppingCart, index) {
  shoppingCart.splice(index, 1);
  showItems(shoppingCart);
}

function updateTotalPrice(shoppingCart) {
  let totalPrice = shoppingCart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  document.querySelector(
    "#totalPrice"
  ).innerHTML = `Total Price: $${totalPrice.toFixed(2)}`;
}

shopCard.addEventListener("change", (e) => {
  if (e.target.classList.contains("inputQ")) {
    let input = e.target;
    let index = input.getAttribute("data-id");
    let numInput = +input.value;
    updateQuantity(
      JSON.parse(localStorage.getItem("shoppingCart")),
      index,
      numInput
    );
  }
});

shopCard.addEventListener("click", (e) => {
  if (e.target.classList.contains("Delete-item")) {
    let index = e.target.getAttribute("data-id");
    deleteItem(JSON.parse(localStorage.getItem("shoppingCart")), index);
  }
});

export default showItems;
