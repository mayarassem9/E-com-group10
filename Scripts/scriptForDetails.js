// document.addEventListener('DOMContentLoaded', function () {
//     // Function to get product data from local storage
//     const getProductDataFromLocalStorage = () => {
//         const storedData = localStorage.getItem('booksData');
//         return storedData ? JSON.parse(storedData) : [];
//     };

//     // Function to get product details by ID
//     const getProductDetailsById = (productId) => {
//         const allBooksData = getProductDataFromLocalStorage();
//         return allBooksData.find(book => book.id === productId) || null;
//     };

//     // Function to populate the product details on the page
//     const populateProductDetails = (productData) => {
//         if (productData) {
//             const container = document.getElementById('product-details-container');
//             container.innerHTML = `
//                 <img src="${productData.imgLink}" alt="${productData.title} Image">
//                 <h1>${productData.title}</h1>
//                 <h2>${productData.author}</h2>
//                 <p>${productData.description}</p>
//                 <p class="price">$${productData.price.toFixed(2)}</p>
//                 ${productData.bestSeller ? '<span id="best-seller-label">Best Seller</span>' : ''}
//                 ${productData.recentlyAdded ? '<span id="recently-added-label">Recently Added</span>' : ''}
//                 <div class="quantity-section">
//                     <label for="quantity">Quantity:</label>
//                     <input type="number" id="quantity" value="1" min="1">
//                 </div>
//                 <button id="add-to-cart-btn" class="btn btn-dark">Add to Cart</button>
//             `;
            
//             // Attach event listener to the "Add to Cart" button
//             const addToCartBtn = document.getElementById('add-to-cart-btn');
//             addToCartBtn.addEventListener('click', function () {
//                 const quantity = parseInt(document.getElementById('quantity').value);
//                 addToCart(productData, quantity);
//             });
//         } else {
//             // Handle the case where product data is not available
//             console.error('Product data not found.');
//         }
//     };

//     // Get product ID from the URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const productId = parseInt(urlParams.get('id'));

//     // Get product details and populate the page
//     const productDetails = getProductDetailsById(productId);
//     populateProductDetails(productDetails);

//     // Function to handle adding product to the cart
//     const addToCart = (product, quantity) => {
//         // Implement your logic for adding the product to the cart
//         console.log(`Added ${quantity} ${product.title}(s) to the cart.`);
//     };
// });
