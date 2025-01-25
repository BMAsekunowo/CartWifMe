// alert("I am working properly");


let cart = []; // Array to store cart items

// Function to add an item to the cart
function addToCart(name, price, image) {
    cart.push({ name, price, image });
    updateCartCount();
}

// Function to remove an item from the cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartCount();
}

// Function to update the cart count badge
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length > 0 ? "flex" : "none";
}

// Function to open the cart page
function openCartPage() {
    const cartPage = document.getElementById("cart-page");
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; // Clear previous items

    // Populate cart items
    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
                <span>${item.name} - $${item.price}</span>
                <button onclick="removeFromCart('${item.name}')" class="btn btn-sm btn-danger">Remove</button>
            </div>
        `;
        cartItems.appendChild(li);
    });

    cartPage.style.display = "block";
}

// Function to close the cart page
function closeCartPage() {
    const cartPage = document.getElementById("cart-page");
    cartPage.style.display = "none";
}