let cart = []; // Array to store cart items

// Function to add an item to the cart
function addToCart(name, price, image) {
    if (!name || !price || !image) {
        alert("Product details are incomplete. Please try again.");
        return;
    }

    const existingItem = cart.find(item => item.name === name);
    if (!existingItem) {
        cart.push({ name, price, image, quantity: 1 });
    } else {
        existingItem.quantity++; // Increment the quantity
    }

    updateCartCount();
    alert(`${name} has been added to the cart!`);
}

// Function to remove all instances of a product from the cart (called by the product preview section)
function removeAllFromCart(name) {
    if (!name) {
        alert("Product name is missing. Please try again.");
        return;
    }

    const initialLength = cart.length;
    cart = cart.filter(item => item.name !== name); // Completely remove the product
    if (cart.length < initialLength) {
        updateCartCount();
        alert(`All instances of ${name} have been removed from the cart.`);
    } else {
        alert(`${name} is not in the cart.`);
    }
}

// Function to remove one instance of a product from the cart (called inside the cart)
function removeFromCart(name) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity--; // Decrement the quantity
        if (existingItem.quantity === 0) {
            cart = cart.filter(item => item.name !== name); // Remove the product if quantity is 0
        }
        updateCartCount();
        openCartPage(); // Refresh the cart page to reflect changes
    } else {
        alert(`${name} is not in the cart.`);
    }
}

// Function to update the cart count badge
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0); // Sum of all quantities
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? "flex" : "none";
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
                <span>${item.name} - $${item.price} (x${item.quantity})</span>
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