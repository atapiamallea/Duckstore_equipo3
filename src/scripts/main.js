import { renderCatalog, initFilters } from "./catalog-logic.js";
import {
  renderDetail,
  setupAddToCart,
  totalClick,
  updateCartBadge,
} from "./detail-logic.js";
import { renderCheckout, activateModal, updateCountItem, initModal, initRemoveItems } from "./payment-logic.js";

window.totalClick = totalClick;

function app() {
    const catalogGrid = document.querySelector(".product-grid");
    const detailContainer = document.querySelector(".detail__container");
    const checkoutBtn = document.getElementById("myCheckout-Btn");
    const productList = document.querySelector(".product-list");
    const paymentContainer = document.querySelector(".product-list");

    if (catalogGrid) {
        renderCatalog();
        initFilters();
    }
    if (detailContainer) {
    renderDetail();
    updateCountItem();
    }

    if (checkoutBtn) {
        initModal();
    }

    if (productList) {
        initRemoveItems();
        const currentDuck = renderDetail(); 
        if (currentDuck) {
            setupAddToCart(currentDuck); 
        }
    }
    if (paymentContainer) {
        renderCheckout();
        updateCountItem();
        activateModal();
        initRemoveItems();
    }
    if (checkoutBtn) {
        initModal();

    }
}

app();
