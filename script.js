// ==========================================
// FOOD DATA
// ==========================================

const foods = [
    {
        name: "Veg Noodles",
        price: 90,
        category: "Noodles",
        type: "veg",
        restaurant: "Main Canteen",
        description: "Stir-fried noodles with fresh vegetables",
        image: "images/noodles.jpeg.jpeg"
    },
    {
        name: "Veg Burger",
        price: 50,
        category: "Burger",
        type: "veg",
        restaurant: "Café 21",
        description: "Crispy vegetable patty with fresh toppings",
        image: "images/burger.jpeg.jpeg"
    },
    {
        name: "Margherita Pizza",
        price: 120,
        category: "Pizza",
        type: "veg",
        restaurant: "Pizza Corner",
        description: "Cheesy pizza with tomato and herbs",
        image: "images/pizza.jpeg.jpeg"
    },
    {
        name: "Paneer Rice",
        price: 80,
        category: "Indian",
        type: "veg",
        restaurant: "Food Court",
        description: "Flavourful rice with fresh vegetables",
        image: "images/paneerrice.jpeg.jpeg"
    },
    {
        name: "Cold Coffee",
        price: 70,
        category: "Drinks",
        type: "veg",
        restaurant: "Café 21",
        description: "Chilled creamy coffee with caramel",
        image: "images/coldcoffee.jpeg.jpeg"
    },
    {
        name: "Chicken Noodles",
        price: 130,
        category: "Noodles",
        type: "nonveg",
        restaurant: "Main Canteen",
        description: "Noodles with chicken and vegetables",
        image: "images/noodles.jpeg.jpeg"
    },
    {
        name: "Chicken Burger",
        price: 100,
        category: "Burger",
        type: "nonveg",
        restaurant: "Food Court",
        description: "Chicken patty burger with fresh toppings",
        image: "images/burger.jpeg.jpeg"
    },
    {
        name: "Chicken Fried Rice",
        price: 110,
        category: "Indian",
        type: "nonveg",
        restaurant: "Food Court",
        description: "Fried rice with chicken and vegetables",
        image: "images/paneerrice.jpeg.jpeg"
    }
];

let cart = [];

// ==========================================
// FOOD DISPLAY
// ==========================================

function displayFood(foodList, title, subtitle) {
    const foodGrid = document.getElementById("food-grid");
    const foodTitle = document.getElementById("food-title");
    const foodSubtitle = document.getElementById("food-subtitle");

    if (!foodGrid) {
        return;
    }

    foodGrid.innerHTML = "";

    if (foodTitle && title) {
        foodTitle.textContent = title;
    }

    if (foodSubtitle && subtitle) {
        foodSubtitle.textContent = subtitle;
    }

    if (foodList.length === 0) {
        foodGrid.innerHTML = `
            <p>No food items found.</p>
        `;
        return;
    }

    foodList.forEach(function(food) {
        const card = document.createElement("div");
        card.className = "food-card";

        card.innerHTML = `
            <div class="food-image">
                <img src="${food.image}" alt="${food.name}">
            </div>

            <div class="food-details">
                <h3>${food.name}</h3>

                <p>${food.description}</p>

                <small>${food.restaurant}</small>

                <div class="food-bottom">
                    <strong>₹${food.price}</strong>

                    <button
                        class="add-button"
                        onclick="addToCart('${food.name}')">
                        + Add
                    </button>
                </div>
            </div>
        `;

        foodGrid.appendChild(card);
    });
}

// ==========================================
// SEARCH
// ==========================================

function searchFood() {
    const searchInput = document.getElementById("search-input");

    if (!searchInput) {
        return;
    }

    const searchText = searchInput.value.toLowerCase().trim();

    if (searchText === "") {
        displayFood(
            foods,
            "Food Items",
            "Browse food from all restaurants"
        );
        return;
    }

    const results = foods.filter(function(food) {
        return (
            food.name.toLowerCase().includes(searchText) ||
            food.restaurant.toLowerCase().includes(searchText)
        );
    });

    displayFood(
        results,
        "Search Results",
        "Food and restaurants matching your search"
    );
}

// ==========================================
// CATEGORY
// ==========================================

function filterCategory(category) {
    const results = foods.filter(function(food) {
        return food.category === category;
    });

    displayFood(
        results,
        category,
        "Showing this category across all restaurants"
    );

    const foodGrid = document.getElementById("food-grid");

    if (foodGrid) {
        foodGrid.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// ==========================================
// RESTAURANT
// ==========================================

function openRestaurant(restaurantName) {
    const results = foods.filter(function(food) {
        return food.restaurant === restaurantName;
    });

    displayFood(
        results,
        restaurantName,
        "Food available at this restaurant"
    );

    const foodGrid = document.getElementById("food-grid");

    if (foodGrid) {
        foodGrid.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// ==========================================
// SHOW ALL FOOD
// ==========================================

function showAllFood() {
    const searchInput = document.getElementById("search-input");

    if (searchInput) {
        searchInput.value = "";
    }

    displayFood(
        foods,
        "Food Items",
        "Browse food from all restaurants"
    );
}

// ==========================================
// FILTERS
// ==========================================

function toggleFilters() {
    const panel = document.getElementById("filter-panel");

    if (panel) {
        panel.classList.toggle("show");
    }
}

function applyFilters() {
    const priceElement = document.getElementById("price-filter");
    const typeElement = document.getElementById("type-filter");

    if (!priceElement || !typeElement) {
        return;
    }

    const price = priceElement.value;
    const type = typeElement.value;

    let results = foods;

    if (price !== "all") {
        results = results.filter(function(food) {
            return food.price <= Number(price);
        });
    }

    if (type !== "all") {
        results = results.filter(function(food) {
            return food.type === type;
        });
    }

    displayFood(
        results,
        "Filtered Food",
        "Showing food based on your filters"
    );
}

// ==========================================
// NORMAL CART
// ==========================================

function addToCart(foodName) {
    const food = foods.find(function(item) {
        return item.name === foodName;
    });

    if (!food) {
        return;
    }

    const existingItem = cart.find(function(item) {
        return item.name === foodName;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...food,
            quantity: 1
        });
    }

    updateCart();
    openCart();
}

// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;
    }

    cart.forEach(function(item, index) {
        total += item.price * item.quantity;
        itemCount += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>${item.restaurant}</p>
                <p>₹${item.price}</p>
            </div>

            <div class="quantity-controls">
                <button onclick="changeQuantity(${index}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    if (cartCount) {
        cartCount.textContent = itemCount;
    }

    if (cartTotal) {
        cartTotal.textContent = "₹" + total;
    }
}

// ==========================================
// CHANGE CART QUANTITY
// ==========================================

function changeQuantity(index, amount) {
    if (!cart[index]) {
        return;
    }

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

// ==========================================
// OPEN CART
// ==========================================

function openCart() {
    const cartPanel = document.getElementById("cart-panel");
    const cartOverlay = document.getElementById("cart-overlay");

    if (cartPanel) {
        cartPanel.classList.add("show");
    }

    if (cartOverlay) {
        cartOverlay.classList.add("show");
    }
}

// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {
    const cartPanel = document.getElementById("cart-panel");
    const cartOverlay = document.getElementById("cart-overlay");

    if (cartPanel) {
        cartPanel.classList.remove("show");
    }

    if (cartOverlay) {
        cartOverlay.classList.remove("show");
    }
}

// ==========================================
// PAYMENT OPTION
// ==========================================

function showUPIOption() {
    const selectedPayment = document.querySelector(
        'input[name="payment-method"]:checked'
    );

    const upiSection = document.getElementById("upi-section");
    const upiError = document.getElementById("upi-error");

    if (!selectedPayment || !upiSection) {
        return;
    }

    if (selectedPayment.value === "upi") {
        upiSection.classList.add("show");
    } else {
        upiSection.classList.remove("show");

        if (upiError) {
            upiError.textContent = "";
        }
    }
}

// ==========================================
// VALIDATE UPI
// ==========================================

function validateUPI(upiID) {
    const upiPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+$/;

    return upiPattern.test(upiID);
}

// ==========================================
// NORMAL ORDER
// ==========================================

function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const selectedPayment = document.querySelector(
        'input[name="payment-method"]:checked'
    );

    if (!selectedPayment) {
        alert("Please select a payment method.");
        return;
    }

    let paymentText = "Cash on Delivery";

    if (selectedPayment.value === "upi") {
        const upiInput = document.getElementById("upi-id");
        const upiError = document.getElementById("upi-error");

        const upiID = upiInput ? upiInput.value.trim() : "";

        if (upiID === "") {
            if (upiError) {
                upiError.textContent = "Please enter your UPI ID.";
            }
            return;
        }

        if (!validateUPI(upiID)) {
            if (upiError) {
                upiError.textContent = "Please enter a valid UPI ID.";
            }
            return;
        }

        paymentText = "UPI - " + upiID;
    }

    const orderNumber = Math.floor(
        1000 + Math.random() * 9000
    );

    const orderNumberElement = document.getElementById("order-number");
    const confirmedPayment = document.getElementById("confirmed-payment");
    const orderModal = document.getElementById("order-modal");

    if (orderNumberElement) {
        orderNumberElement.textContent = "#" + orderNumber;
    }

    if (confirmedPayment) {
        confirmedPayment.textContent = paymentText;
    }

    if (orderModal) {
        orderModal.classList.add("show");
    }

    cart = [];

    updateCart();
    closeCart();

    // Reset payment
    const codRadio = document.querySelector(
        'input[name="payment-method"][value="cod"]'
    );

    if (codRadio) {
        codRadio.checked = true;
    }

    const upiInput = document.getElementById("upi-id");

    if (upiInput) {
        upiInput.value = "";
    }

    showUPIOption();
}

// ==========================================
// CLOSE ORDER
// ==========================================

function closeOrder() {
    const orderModal = document.getElementById("order-modal");

    if (orderModal) {
        orderModal.classList.remove("show");
    }
}

// ==========================================
// RESTAURANT CAROUSEL
// ==========================================

let restaurantPosition = 0;

function nextRestaurant() {
    const restaurantList = document.getElementById("restaurant-list");

    if (!restaurantList) {
        return;
    }

    restaurantPosition -= 280;

    if (restaurantPosition < -560) {
        restaurantPosition = 0;
    }

    restaurantList.style.transform =
        "translateX(" + restaurantPosition + "px)";
}

// ==========================================
// SIDE MENU
// ==========================================

function openMenu() {
    const sideMenu = document.getElementById("side-menu");
    const menuOverlay = document.getElementById("menu-overlay");

    if (sideMenu) {
        sideMenu.classList.add("show");
    }

    if (menuOverlay) {
        menuOverlay.classList.add("show");
    }
}

function closeMenu() {
    const sideMenu = document.getElementById("side-menu");
    const menuOverlay = document.getElementById("menu-overlay");

    if (sideMenu) {
        sideMenu.classList.remove("show");
    }

    if (menuOverlay) {
        menuOverlay.classList.remove("show");
    }
}

// ==========================================
// ACCOUNT
// ==========================================

function openAccount() {
    closeMenu();

    const accountModal = document.getElementById("account-modal");

    if (accountModal) {
        accountModal.classList.add("show");
    }
}

function closeAccount() {
    const accountModal = document.getElementById("account-modal");

    if (accountModal) {
        accountModal.classList.remove("show");
    }
}

// ==========================================
// PAST ORDERS
// ==========================================

function openPastOrders() {
    closeMenu();

    const ordersModal = document.getElementById("orders-modal");

    if (ordersModal) {
        ordersModal.classList.add("show");
    }
}

function closePastOrders() {
    const ordersModal = document.getElementById("orders-modal");

    if (ordersModal) {
        ordersModal.classList.remove("show");
    }
}

// ==========================================
// LOGOUT
// ==========================================

function logout() {
    closeMenu();
    alert("You have been logged out.");
}

// ==================================================
// FRIENDSHIP GROUP
// ==================================================

let friendshipGroup = {
    number: "",
    people: [],
    orders: {}
};

let currentPerson = "";

// ==========================================
// OPEN FRIENDSHIP GROUP
// ==========================================

function openFriendshipGroup() {
    closeMenu();

    const friendshipModal =
        document.getElementById("friendship-modal");

    if (!friendshipModal) {
        alert("Friendship Group modal is missing.");
        return;
    }

    friendshipModal.classList.add("show");
    showGroupSetup();
}

// ==========================================
// CLOSE FRIENDSHIP GROUP
// ==========================================

function closeFriendshipGroup() {
    const friendshipModal =
        document.getElementById("friendship-modal");

    if (friendshipModal) {
        friendshipModal.classList.remove("show");
    }
}

// ==========================================
// GROUP SETUP
// ==========================================

function showGroupSetup() {
    const modal =
        document.getElementById("friendship-modal");

    if (!modal) {
        return;
    }

    modal.innerHTML = `
        <div class="modal">
            <button
                class="close-modal"
                onclick="closeFriendshipGroup()">
                ✕
            </button>

            <h2>Friendship Group</h2>

            <p>
                Create a group order and add food
                for each person separately.
            </p>

            <label>Group Name</label>

            <input
                type="text"
                id="group-name-input"
                placeholder="Example: Lunch Squad">

            <label>People</label>

            <div id="people-inputs">
                <input
                    type="text"
                    class="person-input"
                    placeholder="Your name">

                <input
                    type="text"
                    class="person-input"
                    placeholder="Friend 1">
            </div>

            <button
                class="add-person-button"
                onclick="addPersonInput()">
                + Add Person
            </button>

            <button
                class="create-group-button"
                onclick="createGroup()">
                Create Group
            </button>
        </div>
    `;
}

// ==========================================
// ADD PERSON
// ==========================================

function addPersonInput() {
    const peopleInputs =
        document.getElementById("people-inputs");

    if (!peopleInputs) {
        return;
    }

    const currentInputs =
        peopleInputs.querySelectorAll(".person-input");

    if (currentInputs.length >= 8) {
        alert("A group can have up to 8 people.");
        return;
    }

    const input = document.createElement("input");

    input.type = "text";
    input.className = "person-input";
    input.placeholder = "Friend " + currentInputs.length;

    peopleInputs.appendChild(input);
}

// ==========================================
// CREATE GROUP
// ==========================================

function createGroup() {
    const groupNameInput =
        document.getElementById("group-name-input");

    if (!groupNameInput) {
        return;
    }

    const groupName = groupNameInput.value.trim();

    const inputs =
        document.querySelectorAll(".person-input");

    const people = [];

    inputs.forEach(function(input) {
        const name = input.value.trim();

        if (name !== "") {
            people.push(name);
        }
    });

    if (groupName === "") {
        alert("Please enter a group name.");
        return;
    }

    if (people.length < 2) {
        alert("Please enter at least 2 people.");
        return;
    }

    const uniquePeople = new Set(
        people.map(function(person) {
            return person.toLowerCase();
        })
    );

    if (uniquePeople.size !== people.length) {
        alert("Please use different names for each person.");
        return;
    }

    friendshipGroup.number = groupName;
    friendshipGroup.people = people;
    friendshipGroup.orders = {};

    people.forEach(function(person) {
        friendshipGroup.orders[person] = [];
    });

    currentPerson = "";

    showPersonSelection();
}

// ==========================================
// PERSON SELECTION
// ==========================================

function showPersonSelection() {
    const modal =
        document.getElementById("friendship-modal");

    if (!modal) {
        return;
    }

    let peopleHTML = "";

    friendshipGroup.people.forEach(function(person) {
        const order =
            friendshipGroup.orders[person] || [];

        let itemCount = 0;

        order.forEach(function(item) {
            itemCount += item.quantity;
        });

        peopleHTML += `
            <button
                class="person-choice"
                onclick="selectPerson('${escapePersonName(person)}')">

                <span>${person}</span>

                <small>${itemCount} item(s)</small>
            </button>
        `;
    });

    modal.innerHTML = `
        <div class="modal">
            <button
                class="close-modal"
                onclick="closeFriendshipGroup()">
                ✕
            </button>

            <h2>Group: ${friendshipGroup.number}</h2>

            <p>Select a person to add their food.</p>

            <div class="person-list">
                ${peopleHTML}
            </div>

            <button
                class="create-group-button"
                onclick="showFinalGroupOrder()">
                View Group Order
            </button>
        </div>
    `;
}

// ==========================================
// ESCAPE NAME
// ==========================================

function escapePersonName(name) {
    return name
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");
}

// ==========================================
// SELECT PERSON
// ==========================================

function selectPerson(person) {
    currentPerson = person;
    showPersonOrder();
}

// ==========================================
// SHOW PERSON ORDER
// ==========================================

function showPersonOrder() {
    const modal =
        document.getElementById("friendship-modal");

    if (!modal) {
        return;
    }

    const personOrders =
        friendshipGroup.orders[currentPerson] || [];

    let orderHTML = "";
    let subtotal = 0;

    personOrders.forEach(function(item, index) {
        const itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;

        orderHTML += `
            <div class="group-food-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>

                <div>
                    <strong>₹${itemTotal}</strong>

                    <div class="group-quantity">
                        <button
                            onclick="changeGroupFood(${index}, -1)">
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            onclick="changeGroupFood(${index}, 1)">
                            +
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    if (orderHTML === "") {
        orderHTML = `
            <p class="empty-group">
                No food added yet.
            </p>
        `;
    }

    let foodOptions = "";

    foods.forEach(function(food) {
        foodOptions += `
            <option value="${food.name}">
                ${food.name} - ₹${food.price}
            </option>
        `;
    });

    modal.innerHTML = `
        <div class="modal">
            <button
                class="close-modal"
                onclick="showPersonSelection()">
                ✕
            </button>

            <h2>${currentPerson}'s Order</h2>

            <p>Add food for ${currentPerson}.</p>

            <label>Choose Food</label>

            <select id="group-food-select">
                <option value="">Select Food</option>
                ${foodOptions}
            </select>

            <button
                class="create-group-button"
                onclick="addGroupFood()">
                + Add Food
            </button>

            <div class="group-food-list">
                ${orderHTML}
            </div>

            <div class="group-summary">
                <span>${currentPerson}'s subtotal</span>
                <strong>₹${subtotal}</strong>
            </div>

            <button
                class="create-group-button"
                onclick="showPersonSelection()">
                Done
            </button>
        </div>
    `;
}

// ==========================================
// ADD FOOD TO CURRENT PERSON
// ==========================================

function addGroupFood() {
    const select =
        document.getElementById("group-food-select");

    if (!select) {
        return;
    }

    const selectedFood = select.value;

    if (selectedFood === "") {
        alert("Please select a food item.");
        return;
    }

    const food = foods.find(function(item) {
        return item.name === selectedFood;
    });

    if (!food) {
        return;
    }

    const personOrders =
        friendshipGroup.orders[currentPerson];

    const existingItem =
        personOrders.find(function(item) {
            return item.name === food.name;
        });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        personOrders.push({
            name: food.name,
            price: food.price,
            quantity: 1
        });
    }

    showPersonOrder();
}

// ==========================================
// CHANGE GROUP FOOD QUANTITY
// ==========================================

function changeGroupFood(index, amount) {
    const personOrders =
        friendshipGroup.orders[currentPerson];

    if (!personOrders || !personOrders[index]) {
        return;
    }

    personOrders[index].quantity += amount;

    if (personOrders[index].quantity <= 0) {
        personOrders.splice(index, 1);
    }

    showPersonOrder();
}

// ==========================================
// FINAL GROUP ORDER
// ==========================================

function showFinalGroupOrder() {
    const modal =
        document.getElementById("friendship-modal");

    if (!modal) {
        return;
    }

    let groupTotal = 0;
    let finalHTML = "";

    friendshipGroup.people.forEach(function(person) {
        const personOrders =
            friendshipGroup.orders[person] || [];

        let personTotal = 0;
        let foodHTML = "";

        personOrders.forEach(function(item) {
            const itemTotal =
                item.price * item.quantity;

            personTotal += itemTotal;

            foodHTML += `
                <p>
                    ${item.name}
                    × ${item.quantity}
                    — ₹${itemTotal}
                </p>
            `;
        });

        groupTotal += personTotal;

        if (personOrders.length === 0) {
            foodHTML = `
                <p class="empty-group">
                    No items added
                </p>
            `;
        }

        finalHTML += `
            <div class="final-person-order">
                <div class="final-person-heading">
                    <strong>${person}</strong>
                    <strong>₹${personTotal}</strong>
                </div>

                ${foodHTML}
            </div>
        `;
    });

    modal.innerHTML = `
        <div class="modal">
            <button
                class="close-modal"
                onclick="showPersonSelection()">
                ✕
            </button>

            <h2>Group: ${friendshipGroup.number}</h2>

            <p>Final Group Order</p>

            <div class="final-group-orders">
                ${finalHTML}
            </div>

            <div class="group-summary final-total">
                <span>Group Total</span>
                <strong>₹${groupTotal}</strong>
            </div>

            <button
                class="create-group-button"
                onclick="showPersonSelection()">
                Edit Order
            </button>

            <button
                class="create-group-button"
                onclick="placeGroupOrder()">
                Place Group Order
            </button>
        </div>
    `;
}

// ==========================================
// PLACE GROUP ORDER
// ==========================================

function placeGroupOrder() {
    let hasFood = false;

    friendshipGroup.people.forEach(function(person) {
        const personOrders =
            friendshipGroup.orders[person] || [];

        if (personOrders.length > 0) {
            hasFood = true;
        }
    });

    if (!hasFood) {
        alert("Please add food for at least one person.");
        return;
    }

    const orderNumber = Math.floor(
        1000 + Math.random() * 9000
    );

    const orderNumberElement =
        document.getElementById("order-number");

    const confirmedPayment =
        document.getElementById("confirmed-payment");

    const orderModal =
        document.getElementById("order-modal");

    if (orderNumberElement) {
        orderNumberElement.textContent =
            "#" + orderNumber;
    }

    if (confirmedPayment) {
        confirmedPayment.textContent =
            "Cash on Delivery";
    }

    closeFriendshipGroup();

    if (orderModal) {
        orderModal.classList.add("show");
    }

    friendshipGroup = {
        number: "",
        people: [],
        orders: {}
    };

    currentPerson = "";
}

// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function() {
    displayFood(
        foods,
        "Food Items",
        "Browse food from all restaurants"
    );

    updateCart();
    showUPIOption();

    const searchInput =
        document.getElementById("search-input");

    if (searchInput) {
        searchInput.addEventListener(
            "input",
            searchFood
        );
    }
});
