import data from "../data/data.json" with { type: 'json' };
import { createDuckCard } from "./components/card-component.js";

const productGrid = document.querySelector(".product-grid");

export function renderCatalog(categoryFilter = "all") {
    productGrid.innerHTML = "";

    const filteredData = data.filter(item => {
        return categoryFilter === "all" || item.category === categoryFilter;
    });

    filteredData.forEach(item => {
        productGrid.innerHTML += createDuckCard(item);
    });
}
// Function to initialize the listeners for the sidebar buttons
export function initFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const category = btn.getAttribute("data-category");
            renderCatalog(category);

            // Optional: Add an "active" class for styling
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });
}

