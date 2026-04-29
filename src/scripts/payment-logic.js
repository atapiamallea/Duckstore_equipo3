import data from "../data/data.json" with { type: 'json' };
import { createCartCard } from "./components/payment-component.js";

export function renderCheckout() {
    const cartContainer = document.querySelector(".product-list");
    if (!cartContainer) return;

    // 1. Leer lo que guardamos en la página de detalle
    const cartItems = JSON.parse(localStorage.getItem("duck-cart")) || [];

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<h2>Tu estanque está vacío... 🦆</h2>";
        return;
    }

    // 2. "Enriquecer" los datos: Combinar ID/Cantidad con la info del JSON
    const fullProducts = cartItems.map(item => {
        const info = data.find(p => p.id === item.id);
        return { ...info, quantity: item.quantity };
    });

    // 3. Renderizar todas las tarjetas
    cartContainer.innerHTML = fullProducts.map(product => createCartCard(product)).join("");
    
    // 4. (Opcional por ahora) Calcular el total de la compra
    calculateTotal(fullProducts);
}

function calculateTotal(products) {
    // Apuntamos a la clase .total-amount que ya tienes en el HTML del resumen
    const totalElement = document.querySelector(".total-amount"); 
    if (!totalElement) return;

    const total = products.reduce((acc, p) => {
        // CUIDADO: Si en el JSON el precio tiene coma (26,99), JS no lo suma. 
        // Asegúrate que en el JSON sea 26.99 (con punto)
        return acc + (parseFloat(p.price) * p.quantity);
    }, 0);

    totalElement.textContent = `€${total.toFixed(2)}`;
}


// MODAL BOX

export function activarModal() {
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