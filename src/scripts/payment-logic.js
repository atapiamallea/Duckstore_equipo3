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

function calculateTotal(products) {
    const totalElement = document.querySelector(".total-amount"); 
    if (!totalElement) return;

    const total = products.reduce((acc, p) => {
        return acc + (parseFloat(p.price) * p.quantity);
    }, 0);

    totalElement.textContent = `€${total.toFixed(2)}`;
}


// MODAL BOX

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