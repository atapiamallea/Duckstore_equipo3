import data from "../data/data.json" with { type: 'json' };
import { createCartCard } from "./components/payment-component.js";

export function renderCheckout() {
    const cartContainer = document.querySelector(".product-list");
    if (!cartContainer) return;

    const cartItems = JSON.parse(localStorage.getItem("duck-cart")) || [];

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<h2>Tu estanque está vacío... 🦆</h2>";
        return;
    }

    const fullProducts = cartItems.map(item => {
        const info = data.find(p => p.id === item.id);
        return { ...info, quantity: item.quantity };
    });

    cartContainer.innerHTML = fullProducts.map(product => createCartCard(product)).join("");
    calculateTotal(fullProducts);
}
//-- CALCULAR VALORES---

function calculateTotal(products) {
    // 1. Capturamos los elementos del Aside
    const totalElement = document.querySelector(".total-amount"); 
    const subtotalValElement = document.getElementById("summary-subtotal-val");
    const qtyTextElement = document.getElementById("summary-qty-text");

    if (!totalElement) return;

    // 2. Calculamos los valores reales
    const totalQuantity = products.reduce((acc, p) => acc + p.quantity, 0);
    const totalPrice = products.reduce((acc, p) => {
        return acc + (parseFloat(p.price) * p.quantity);
    }, 0);

    const formattedPrice = `€${totalPrice.toFixed(2)}`;

    // 3. Pintamos los datos en el Aside
    totalElement.textContent = formattedPrice; // El total grande
    if (subtotalValElement) subtotalValElement.textContent = formattedPrice; // El subtotal de arriba
    if (qtyTextElement) qtyTextElement.textContent = `Subtotal (${totalQuantity} artículos)`;
}

// REMOVE BUTTON
export function initRemoveItems() {
    const productList = document.querySelector(".product-list");

    if (productList) {
        productList.addEventListener("click", function(event) {
            // Check if the clicked element has the 'remove-btn' class
            if (event.target.classList.contains("remove-btn")) {
                // Find the closest parent 'article' (the cart card)
                const cartCard = event.target.closest(".cart-card");
                
                if (cartCard) {
                    // Remove the element from the HTML
                    cartCard.remove();
                    
                    // Optional: Call a function here to update the Total Price
                    console.log("Item removed from UI");
                }
            }
        });
    }
}


// MODAL BOX
export function initModal(){
// Get the modal
    // var modal = document.getElementById("myModal");
    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // } 
}


//-- MODAL BOX---
export function activateModal() {
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("myCheckout-Btn");
    const span = document.querySelector(".close");

    if (btn && modal) {
        btn.onclick = () => modal.style.display = "flex";
        span.onclick = () => modal.style.display = "none";
        window.onclick = (event) => {
            if (event.target == modal) modal.style.display = "none";
        }
    }
}
// ---UPDATE COUNT ---
export function updateCountItem() {
    const cartContainer = document.querySelector(".product-list");

    if (!cartContainer) return;

    cartContainer.addEventListener("click", (e) => {
        // 1. Detectar si el clic fue en un botón de cantidad
        const btn = e.target.closest(".btnQuantityPay");
        if (!btn) return;

        // 2. Identificar el patito y la acción
        const card = btn.closest(".cart-card");
        const productId = Number(card.dataset.id);
        const action = btn.dataset.action;

        // 3. Traer el carrito del LocalStorage
        let cart = JSON.parse(localStorage.getItem("duck-cart")) || [];
        const itemIndex = cart.findIndex(item => item.id === productId);

        if (itemIndex !== -1) {
            // 4. Modificar la cantidad
            if (action === "plus") {
                cart[itemIndex].quantity++;
            } else if (action === "minus" && cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
            }

            localStorage.setItem("duck-cart", JSON.stringify(cart));

    
            renderCheckout();
            
            if (typeof updateCartBadge === "function") updateCartBadge();
        }
    });
}
