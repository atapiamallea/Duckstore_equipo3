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

// QUANTITY BUTTON 

function totalClick(click) {
    const totalClicks = document.getElementById('');
    const sumvalue = parseInt(totalClicks.innerHTML) + click;
    totalClicks.innerHTML = sumvalue;

    // Avoid negative numbers
    if(sumvalue < 0) {
        totalClicks.innerHTML = 0;
    }
}