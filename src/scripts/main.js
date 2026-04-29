import { renderCatalog } from "./catalog-logic.js";
import { renderDetail, setupAddToCart, totalClick, updateCartBadge } from "./detail-logic.js";
import { renderCheckout } from "./payment-logic.js";
// Hacemos que la función del +/- funcione desde el HTML
window.totalClick = totalClick;

function app() {
    const catalogGrid = document.querySelector(".product-grid");
    const detailContainer = document.querySelector(".detail__container");
    const checkoutContainer = document.querySelector(".product-list");
    // Siempre actualizamos el numerito al cargar cualquier página
    updateCartBadge();

    if (catalogGrid) {
        renderCatalog();
    }

    if (detailContainer) {
        const currentDuck = renderDetail(); // Guardamos el pato que se está viendo
        if (currentDuck) {
            setupAddToCart(currentDuck); // Activamos el botón para ese pato
        }
    }
    if (checkoutContainer) {
        renderCheckout(); // <--- SE EJECUTA SOLO EN LA PÁGINA DE CHECKOUT
    }
}

app();