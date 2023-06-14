const products = [
    {
        id: 1,
        Image: , //ddd
        name: "Air Pods Max", //change names
        price: "1000",
        quantity: 5,
    },
    {
        id: 2,
        Image: , //add
        name: "Beats by Dr Dre",
        price: "600",
        quantity: 5,
    },
    {
        id: 3,
        Image:  ,//aad
        name: `MacBook Pro`,
        price: `1200`,
        quantity: 5,
    },
    {
        id: 4,
        Image: , //adddd
        name: `MacBook Air`,
        price: `700`,
        quantity: 5,
    },
    {
        id: 5,
        Image: , //adddd
        name: `iPhone 11`,
        price: `500`,
        quantity: 5,
    },
    {
        id: 6,
        Image: , //addd
        name: `iPhone 11 Pro`,
        price: `800`,
        quantity: 5,
    }

];

function displayProducts() {
    const ourProducts = document.getElementById("products");
    products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.innerHTML = `
        <img src="${product.Image}" alt="${product.name}" id="product-imgs">
        <h3>${product.name}</h3>
        <p>${product.price}</p>        
        <button onclick="addToCart(${product.id})" class="addbtn">Add to cart</button>`;
        ourProducts.appendChild(productElement);
    });
}

let cart = JSON.parse(localStorage.getItem("Products")) || [];

function addToCart(productId) {
    const product = products.find((product) => product.id === productId);
    if (product && product.quantity > 0) {
        cart.push(product);
        product.quantity--;
        updateCart();
}
}

function removeFromCart(index) {
    let removedProduct = cart.splice(index, 1)[0];
    removedProduct.quantity++;
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById("cart-body");
    localStorage.setItem("Products", JSON.stringify(cart));
    cartContainer.innerHTML = "";
    cart.forEach((product, index) => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        <span>${product.name}</span>
        <span>${product.price}</span>
        <input type="number" placeholder="1" min="1" width="50px" height="40px">
        <p>Total $ ${product.price}</p>
        <button onclick="removeFromCart(${index})" class="rembutton">✖</button>
        `;
        cartContainer.appendChild(cartItem);
});
    calculateTotal();
}

function calculateTotal() {
    let totalElement = document.getElementById("total");
    let total = 0 
    cart.forEach(item => {
        total +=  eval(item.price)
    })
    totalElement.textContent = `$${total}`;
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to proceed with the checkout.");
        return;
      }

    const modalFooter = document.querySelector(".modal-footer");
    modalFooter.innerHTML = `
        <div class="tick-animation" >
        <img src="https://i.postimg.cc/wxhvCdcV/green-tick-checkbox-illustration-isolated-on-white-background-free-vector.jpg" alt="Tick" style="width: 400px;">
        <p>Checkout successful!</p>
        </div>
    `;

    cart = [];
    updateCart(); 
}

let isAscending = true;

function sortProductsByPrice() {
    const ourProducts = document.getElementById("products");

    
    isAscending = !isAscending;
    
    const sortedProducts = products.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);

        if (isAscending) {
            return priceA - priceB;
        } else {
            return priceB - priceA; 
        }
    });

    ourProducts.innerHTML = "";
    
    sortedProducts.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.innerHTML = `
        <img src="${product.Image}" alt="${product.name}" id="product-imgs">
        <h3>${product.name}</h3>
        <p>${product.price}</p>        
        <button onclick="addToCart(${product.id})" class="addbtn">Add to cart</button>`;
        ourProducts.appendChild(productElement);
    });
} 


displayProducts();

updateCart();