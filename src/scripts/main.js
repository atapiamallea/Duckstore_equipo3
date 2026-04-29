import { renderCatalog } from "./catalog-logic.js";
import { renderDetail, addCountCart, totalClick } from "./detail-logic.js";
import { initModal, initRemoveItems } from "./payment-logic.js";

window.totalClick = totalClick;

function app() {
     // console.log("app loaded")
    const catalogGrid = document.querySelector(".product-grid");
    const detailContainer = document.querySelector(".detail__container");
    const checkoutBtn = document.getElementById("myCheckout-Btn");
    const productList = document.querySelector(".product-list");

    if (catalogGrid) {
        renderCatalog();
    }

    if (detailContainer) {
    renderDetail();
    addCountCart();
    }

    if (checkoutBtn) {
        initModal();
    }

    if (productList) {
        initRemoveItems();
    }
}

app();



