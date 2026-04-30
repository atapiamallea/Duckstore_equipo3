import data from "../data/data.json" with { type: 'json' };
import { createCartCard } from "./components/payment-component.js";

export function renderCheckout() {
    const cartContainer = document.querySelector(".product-list");
    if (!cartContainer) return;

    const cartItems = JSON.parse(localStorage.getItem("duck-cart")) || [];

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<h2>Tu estanque está vacío... 🦆</h2>";
        calculateTotal([]); 
        ``
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
    const checkoutBtn = document.getElementById("myCheckout-Btn");

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
    if (checkoutBtn) {
    // Si el total es 0, desactivamos el botón y le cambiamos el estilo
    checkoutBtn.disabled = products.length === 0;
    checkoutBtn.style.opacity = products.length === 0 ? "0.5" : "1";
    checkoutBtn.style.cursor = products.length === 0 ? "not-allowed" : "pointer";
}
}

// REMOVE BUTTON
export function initRemoveItems() {
    const productList = document.querySelector(".product-list");

    if (productList) {
        productList.addEventListener("click", function(event) {
            // Detectar si el clic fue en el botón de borrar
            if (event.target.classList.contains("remove-btn")) {
                const cartCard = event.target.closest(".cart-card");
                
                if (cartCard) {
                    // Obtener el ID del producto (lo sacamos del data-id que pusimos en el componente)
                    const productId = Number(cartCard.dataset.id);
                    
                    //  Eliminar del LocalStorage
                    let cart = JSON.parse(localStorage.getItem("duck-cart")) || [];
                    // Filtramos el carrito: "quédate con todos menos con el que tiene este ID"
                    cart = cart.filter(item => item.id !== productId);
                    
                    localStorage.setItem("duck-cart", JSON.stringify(cart));
                    
                    import("./payment-logic.js").then(module => {
                        module.renderCheckout(); 
                        
                        // Si tienes la función del circulito rojo del header:
                        if (typeof module.updateCartBadge === "function") {
                            module.updateCartBadge();
                        }
                    });

                    console.log(`Producto ${productId} eliminado de la base de datos y de la vista.`);
                }
            }
        });
    }
}


//-- MODAL BOX---
export function initModal() {
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

