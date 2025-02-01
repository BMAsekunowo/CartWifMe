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
        existingItem.quantity++;
    }

    updateCartCount();
    alert(`${name} has been added to the cart!`);
}

// Function to add one more of an existing product
function addOneMore(name) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
        updateCartCount();
        openCartPage();
    }
}

// Function to remove all instances of a product from the cart
function removeAllFromCart(name) {
    if (confirm(`Are you sure you want to remove all instances of ${name}? This action is irreversible.`)) {
        cart = cart.filter(item => item.name !== name);
        updateCartCount();
        alert(`All instances of ${name} have been removed.`);
        openCartPage();
    }
}

// Function to remove one instance of a product from the cart
function removeFromCart(name) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        if (confirm(`Are you sure you want to remove one instance of ${name}?`)) {
            existingItem.quantity--;
            if (existingItem.quantity === 0) {
                cart = cart.filter(item => item.name !== name);
            }
            updateCartCount();
            openCartPage();
        }
    } else {
        alert(`${name} is not in the cart.`);
    }
}

// Function to update the cart count badge
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? "flex" : "none";
}

// Function to open the cart page
function openCartPage() {
    const cartPage = document.getElementById("cart-page");
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; // Clear previous items

    // Populate cart items dynamically (Display index as 1-based)
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
                <span>${index + 1}: ${item.name} - $${item.price} (x${item.quantity})</span>
                <div class="d-flex gap-1">
                    <button onclick="addOneMore('${item.name}')" class="btn btn-sm btn-success">➕</button>
                    <button onclick="removeFromCart('${item.name}')" class="btn btn-sm btn-danger">➖</button>
                    <button onclick="removeAllFromCart('${item.name}')" class="btn btn-sm btn-dark">❌</button>
                </div>
            </div>
        `;
        cartItems.appendChild(li);
    });

    // Add new buttons for cart actions
    const controlsDiv = document.createElement("div");
    controlsDiv.style.display = cart.length > 0 ? "block" : "none";
    controlsDiv.innerHTML = `
        <button onclick="deleteFirstItem()" class="btn btn-warning w-100 mt-2">Delete First Item</button>
        <button onclick="deleteLastItem()" class="btn btn-warning w-100 mt-2">Delete Last Item</button>
        <button onclick="deleteAllItems()" class="btn btn-danger w-100 mt-2">Delete All Items</button>
        <button onclick="deleteSpecificItem()" class="btn btn-primary w-100 mt-2">Delete Item by Number</button>
    `;
    cartItems.appendChild(controlsDiv);

    cartPage.style.display = "block";
}

// Function to delete the first item (Using shift)
function deleteFirstItem() {
    if (cart.length > 0) {
        if (confirm("Are you sure you want to remove the first item? This action is irreversible.")) {
            const removedItem = cart.shift();
            updateCartCount();
            alert(`First item (${removedItem.name}) has been removed.`);
            openCartPage();
        }
    } else {
        alert("Cart is already empty.");
    }
}

// Function to delete the last item (Using pop)
function deleteLastItem() {
    if (cart.length > 0) {
        if (confirm("Are you sure you want to remove the last item? This action is irreversible.")) {
            const removedItem = cart.pop();
            updateCartCount();
            alert(`Last item (${removedItem.name}) has been removed.`);
            openCartPage();
        }
    } else {
        alert("Cart is already empty.");
    }
}

// Function to delete all items (Using splice)
function deleteAllItems() {
    if (cart.length > 0) {
        if (confirm("Are you sure you want to delete all items? This action is irreversible.")) {
            cart.splice(0, cart.length);
            updateCartCount();
            alert("All items have been removed from the cart.");
            closeCartPage();
        }
    } else {
        alert("Cart is already empty.");
    }
}

// Function to delete a specific item by index (Using splice)
function deleteSpecificItem() {
    let itemIndex = prompt(`Enter the index number of the product to delete (1 to ${cart.length}):`);

    if (itemIndex === null) return; // If user cancels

    itemIndex = parseInt(itemIndex) - 1; // Convert to array index (1-based to 0-based)

    if (isNaN(itemIndex) || itemIndex < 0 || itemIndex >= cart.length) {
        alert(`Invalid index. Please enter a number between 1 and ${cart.length}`);
        return;
    }

    if (confirm(`Are you sure you want to delete ${cart[itemIndex].name}? This action is irreversible.`)) {
        cart.splice(itemIndex, 1);
        updateCartCount();
        alert(`Item at index ${itemIndex + 1} has been removed.`);
        openCartPage();
    }
}

// Function to close the cart page
function closeCartPage() {
    document.getElementById("cart-page").style.display = "none";
}