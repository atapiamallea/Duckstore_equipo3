import { renderCatalog, initFilters } from "./catalog-logic.js";
import {
  renderDetail,
  setupAddToCart,
  totalClick,
  updateCartBadge,
} from "./detail-logic.js";
import {
  renderCheckout,
  updateCountItem,
  initModal,
  initRemoveItems,
} from "./payment-logic.js";

window.totalClick = totalClick;

function app() {
  const catalogGrid = document.querySelector(".product-grid");
  const detailContainer = document.querySelector(".detail__container");
  const checkoutBtn = document.getElementById("myCheckout-Btn");
  const paymentContainer = document.querySelector(".product-list");

  updateCartBadge();

  if (catalogGrid) {
    renderCatalog();
    initFilters();
  }

  if (detailContainer) {
    const currentDuck = renderDetail();
    if (currentDuck) {
      setupAddToCart(currentDuck);
    }
  }

  if (checkoutBtn) {
    initModal();
  }

  if (paymentContainer) {
    renderCheckout();
    updateCountItem();
    initModal();
    initRemoveItems();

    const currentDuck = renderDetail();
    if (currentDuck) {
      setupAddToCart(currentDuck);
    }
  }
  if (checkoutBtn) {
    initModal();
  }
}

app();
