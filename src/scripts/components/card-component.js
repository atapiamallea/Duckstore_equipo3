
export function createDuckCard(product) {
    
    const { id, category, image, alt, link, name } = product;

    return `
        <article id="${id}" class="product-card">
            <div class="product-card__image-container">
                <img src="${image}" alt="${alt}" class="product-card__img">
            </div>
            <a class="product-card__button" href="${link}">
                <button>
                    Ver ${name} <span class="product-card__arrow">→</span>
                </button>
            </a>
        </article>
    `;
};
