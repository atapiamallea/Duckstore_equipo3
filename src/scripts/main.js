import { renderCatalog } from "./catalog-logic.js";
import { renderDetail } from "./detail-logic.js";


function app() {
     // console.log("app loaded")
    const catalogGrid = document.querySelector(".product-grid");
    const detailContainer = document.querySelector(".detail__container");

    if (catalogGrid) {
        renderCatalog();
    }

    if (detailContainer) {
        renderDetail();
    }
}

app();