let retrievedCart = JSON.parse(localStorage.getItem("shoppingCart"));
let btnCart = document.querySelector(".btn-cart");
let shopCard = document.querySelector(".shop-card");
let div = document.querySelector(".mydiv");
let numberItemsCart = document.querySelector(".number-items-cart");
let btnToCart = document.querySelector(".btn-to-cart");
function showData() {
  let len = retrievedCart.length;
  numberItemsCart.innerHTML = len;
  retrievedCart.forEach((item) => {
    shopCard.innerHTML += `
              <div style="border:1px solid #000; border-radius: 10px; margin-bottom:20px;">
              
                  <img width="100px" src="${item.images[0]}" />
                  <span >${item.title}</span>
                  <br/>
                  <input type="number" value="${item.quantity}"/>
              </div>
  
          `;
  });
}
showData();

