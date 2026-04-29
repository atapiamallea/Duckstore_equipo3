import { renderCatalog } from "./catalog-logic.js";
import { renderDetail, setupAddToCart, totalClick, updateCartBadge } from "./detail-logic.js";
import { renderCheckout, activateModal, updateCountItem } from "./payment-logic.js";

window.totalClick = totalClick;

function app() {
    const catalogGrid = document.querySelector(".product-grid");
    const detailContainer = document.querySelector(".detail__container");
    const paymentContainer = document.querySelector(".product-list");

    updateCartBadge();

    if (catalogGrid) {
        renderCatalog();
    }

    if (detailContainer) {
        const currentDuck = renderDetail(); 
        if (currentDuck) {
            setupAddToCart(currentDuck); 
        }
    }
    if (paymentContainer) {
        renderCheckout();
        updateCountItem();
        activateModal(); // 
    }
}

app();