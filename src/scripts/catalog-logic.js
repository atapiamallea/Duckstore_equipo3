import data from "../data/data.json" with { type: 'json' };
import { createDuckCard } from "./components/card-component.js";

const productGrid = document.querySelector(".product-grid");

export function renderCatalog() {
    for (let i = 0; i < data.length; i++){
        productGrid.innerHTML += createDuckCard(data[i]);
    }
}
