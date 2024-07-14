// DOM elements retrieval
let btnCart = document.querySelector(".btn-cart");
let shopCard = document.querySelector(".shop-card");
let btnToCart = document.querySelector(".btn-to-cart");
let notifcations = document.querySelector(".notifcations");
const aleart = document.querySelector(".aleart");
const content = document.querySelector(".content");
let parentsectionCart = document.querySelector(".parent-section-shop");
let numberItemsCart = document.querySelector(".number-items-cart");
let btnClear = document.querySelector(".btn-clear");
let Deleteitem = document.createElement("div");
Deleteitem.className = "Delete-item";
// Initialize shopping cart from localStorage or set it to an empty array
let retrievedCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
let legnthCart = retrievedCart.length;

// Function to clear shopping cart from localStorage and update the UI
export function clearShoppingCart() {
  localStorage.removeItem("shoppingCart");
  retrievedCart = [];
  restoreShoppingCart(retrievedCart); // Reload cart after clearing
}

// Event listener for clearing the shopping cart
btnClear.addEventListener("click", () => {
  clearShoppingCart();
  console.log("Shopping cart cleared");
});

// Function to restore items to the shopping cart from localStorage
export function restoreShoppingCart(shoppingCart) {
  const restoredCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  shoppingCart = [...restoredCart];
  legnthCart = shoppingCart.length;
  numberItemsCart.innerHTML = legnthCart;
  showItems(shoppingCart); // Update UI with restored items
}

// Call function to restore items when needed
restoreShoppingCart();

// Check if the cart is empty when the page loads
if (retrievedCart === null) {
  retrievedCart = [];
  console.log(retrievedCart);
}

// Event listener to toggle the shopping cart visibility
btnCart.addEventListener("click", () => {
  parentsectionCart.classList.toggle("close-sopping-cart");
  console.log(retrievedCart);
});

// Function to display notifications
export function notificationDvi(text, background) {
  notifcations.textContent = text;
  notifcations.style.transform = "translate(0px)";

  // Expand the notification div
  setTimeout(() => {
    expandDiv(background);
  }, 100);

  // Hide the notification after 3 seconds
  setTimeout(() => {
    notifcations.style.transform = "translate(350px)";
  }, 3000);
}

// Function to expand a div element
export function expandDiv(background) {
  let myDiv = document.createElement("div");
  myDiv.classList.add("mydiv");
  notifcations.appendChild(myDiv);
  myDiv.style.width = "0%";

  // Animate the width of the div to 100%
  setTimeout(() => {
    myDiv.style.width = "100%";
  }, 10);

  myDiv.style.transition = "width 2s linear";
  myDiv.style.background = background;

  return myDiv;
}

// Function to display items in the shopping cart
export function showItems(shoppingCart) {
  let totalPrice = 0;

  legnthCart = shoppingCart.length;
  numberItemsCart.innerHTML = legnthCart;
  shopCard.innerHTML = "";
  var itemId = 0;
  // Display each item in the shopping cart
  shoppingCart.forEach((item) => {
    const itemTotalPrice = item.quantity * item.price;
    totalPrice += itemTotalPrice;
    shopCard.innerHTML += `
      <div style="border:1px solid #000; border-radius: 10px; margin-bottom:20px;">
        <img width="100px" src="${item.images[0]}" />
        <span>${item.title}</span>
        <br/>
        <input type="number" value="${item.quantity}"/>
        <span>Price: $${item.price}</span>
        <span>Total: $${itemTotalPrice.toFixed(2)}</span>
        <button class='Delete-item  ${(itemId =
          item.id)}' data_id=''>Delete</button>
      </div>
    `;
  });

  document.querySelector(
    "#totalPrice"
  ).innerHTML = `Total Price: $${totalPrice.toFixed(2)}`;

  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

// function removeFromCart(itemId) {
//   // Filter out the item with matching itemId
//   console.log(itemId);

//   const updatedCart = retrievedCart.filter((item) => {
//     item.id !== itemId;
//     console.log(+item.id !== +itemId);
//   });

//   console.log(updatedCart);
//   retrievedCart = updatedCart;

//   console.log(showItems(retrievedCart));
//   showItems(retrievedCart);

//   localStorage.setItem("shoppingCart", JSON.stringify(retrievedCart));
//   console.log(retrievedCart)
//   // Optionally, update localStorage with the updated cart
// }
// shopCard.addEventListener("click", (e) => {
//   const itemId = e.target.classList[1];
//   console.log(e.target.classList[1]);
//   // console.log(itemId);
//   removeFromCart(itemId);
//   // console.log("first");
// });
// Function to close the alert
export function closeAleart(error) {
  aleart.addEventListener("click", (e) => {
    aleart.style.display = "none";
    content.textContent = error;
  });
}

// Function to open the alert
export function openAleart(text) {
  aleart.style.display = "flex";
  content.textContent = text;
}
