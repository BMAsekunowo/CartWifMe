let cart = []; // Array to store cart items

// Function to add an item to the cart
function addToCart(name, price, image) {
    if (!name || !price || !image) {
        alert("Product details are incomplete. Please try again.");
        return;
    }
    
    const existingItem = cart.find(item => item.name === name);
    if (!existingItem) {
        cart.push({ name, price, image });
        updateCartCount();
        alert(`${name} has been added to the cart!`);
    } else {
        alert(`${name} is already in the cart.`);
    }
}

// Function to remove an item from the cart
function removeFromCart(name) {
    if (!name) {
        alert("Product name is missing. Please try again.");
        return;
    }

    const initialLength = cart.length;
    cart = cart.filter(item => item.name !== name); // Remove item by name
    if (cart.length < initialLength) {
        updateCartCount();
        alert(`${name} has been removed from the cart.`);
        openCartPage(); // Refresh the cart page to reflect changes
    } else {
        alert(`${name} is not in the cart.`);
    }
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

    // Populate cart items dynamically
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