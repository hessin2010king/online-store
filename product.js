// document.addEventListener("DOMContentLoaded", function() {
//     // (existing code)
    
    // function showProductDetails(product) {
    //     // Save the product ID in localStorage
    //     localStorage.setItem('productId', product.id);
    //     // Navigate to the product details page
    //     window.location.href = 'productdetails.html';
    // }

//     // (existing code)
// });





document.addEventListener("DOMContentLoaded", function() {

    const productList = document.getElementById("productList");
    const categoryFilter = document.getElementById("categoryFilter");
    const searchInput = document.getElementById("search");
    const productModal = document.getElementById("productModal");
    const productModal2 = document.getElementById("productModal2");
    const modalContent = document.getElementById("productDetails");
    const modalContent2 = document.getElementById("productDetails2");
    const closeModal = document.getElementsByClassName("close")[0];
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const pageInfo = document.getElementById("pageInfo");

    let currentPage = 0;
    const limit = 9;

    function fetchProducts(skip = 0, limit = 9) {
        fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
            .then(response => response.json())
            .then(data => {
                displayProducts(data.products);
                updatePageInfo(skip, limit, data.total);
                populateCategories(data.products);
            });
    }

    function displayProducts(products) {
        productList.innerHTML = "";
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>$${product.price}</p>
            `;
            productDiv.addEventListener("click", () => showProductDetails(product));
            productDiv.addEventListener("click", () => showProductDetails(product));

            productList.appendChild(productDiv);
        });
    }

    function populateCategories(products) {
        categoryFilter.innerHTML = '<option value="">All Categories</option>';
        const categories = [...new Set(products.map(product => product.category))];
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    function showProductDetails(product) {
        // Save the product ID in localStorage
        localStorage.setItem('productId', product.id);
        // Navigate to the product details page
        window.location.href = 'productdetails.html';
    }

    function showProductDetails(product) {
        
        modalContent.innerHTML = `
            <div class="slider">
                <div class="slides">
                    ${product.images.map(image => `<img src="${image}" alt="${product.title}">`).join('')}
                </div>
                <a class="prev">&#10094;</a>
                <a class="next">&#10095;</a>
            </div>
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <p>Rating: ${product.rating}</p>
            
        


            <a href="productdetails.html">
            <button id="show" onclick=''>More details</button>
            </a>
        `;
        productModal.style.display = "block";
        localStorage.setItem("productId",JSON.stringify( product.id));

        initSlider();
        // onclick= "externalproduct()
    }



    function initSlider() {
        let slideIndex = 0;
        const slides = document.querySelector('.slides');
        const images = document.querySelectorAll('.slides img');
        const prev = document.querySelector('.prev');
        const next = document.querySelector('.next');

        function showSlide(index) {
            if (index >= images.length) slideIndex = 0;
            if (index < 0) slideIndex = images.length - 1;
            slides.style.transform = `translateX(${-slideIndex * 100}%)`;
        }

        prev.addEventListener('click', () => {
            showSlide(--slideIndex);
        });

        next.addEventListener('click', () => {
            showSlide(++slideIndex);
        });

        showSlide(slideIndex);
    }

    function updatePageInfo(skip, limit, total) {
        pageInfo.textContent = `Page ${Math.ceil((skip + 1) / limit)} of ${Math.ceil(total / limit)}`;
        prevBtn.disabled = skip === 0;
        nextBtn.disabled = skip + limit >= total;
    }

    closeModal.onclick = function() {
        productModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == productModal) {
            productModal.style.display = "none";
        }
    }

// Search functionality
    searchInput.addEventListener("input", function() {

        const query = searchInput.value.toLowerCase();
        console.log(query);
        fetch(`https://dummyjson.com/products/search?q=${query}`)
            .then(response => response.json())
            .then(data => displayProducts(data.products));

            
    });

    categoryFilter.addEventListener("change", function() {
        const category = categoryFilter.value;
        fetch(category ? `https://dummyjson.com/products/category/${category}` : "https://dummyjson.com/products")
            .then(response => response.json())
            .then(data => displayProducts(data.products));
    });

    prevBtn.addEventListener("click", function() {
        if (currentPage > 0) {
            currentPage--;
            fetchProducts(currentPage * limit, limit);
        }
    });

    nextBtn.addEventListener("click", function() {
        currentPage++;
        fetchProducts(currentPage * limit, limit);
    });

    // show.addEventListener("click", function() { });

    fetchProducts();
});




