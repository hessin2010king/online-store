import { closeAleart, openAleart, showItems } from "./script-shopping-cart.js";
const productId = localStorage.getItem("productId");
const productDetails = document.getElementById("productDetails");
// const cartUpdatedEvent = new Event("cartUpdated");
if (productId) {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      productDetails.innerHTML = `
                <div class="slider">
                    <div class="slides">
                        ${product.images
                          .map(
                            (image) =>
                              `<img src="${image}" alt="${product.title}">`
                          )
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

                <h3>Reviews</h3>
                <div class="reviews-container">
                    ${product.reviews.map(
                      (review) => `
                    <div class="review-card">
                        <div class="review-header">
                            <span class="reviewer-name">${review.reviewerName}</span>
                            <span class="review-date">${review.reviewerEmail}</span>
                            <span class="review-date">${review.date}</span>
                            <span class="review-date">${review.comment}</span>
                            <span class="review-date">${review.rating}</span>

                        </div>
                        </div>
                    </div>
                    `
                    )}
                </div>
    
                `;

      initSlider();
    })
    .catch((error) => {
      closeAleart(error);
      openAleart(error);
    });
} else {
  // Handle case where no product ID is found
  productDetails.innerHTML = "<p>No product details available.</p>";
}

// Function to initialize the image slider
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
