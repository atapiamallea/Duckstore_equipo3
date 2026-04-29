export function createDetailTemplate(product) {
  const { image, alt, name, description, material, design, price } = product;

  return `
        
            <div class="detail__img-container">
                <img class="detail__img" src="${image}" alt="${alt}">
            </div>

            <div class="product__details">
                <h1 class="product__title">${name}</h1>
                <div class="product__description">
                    <h3 class="product__subtitle">Descripción producto</h3>
                    <p>${description}</p><br>
                    <p><strong>Material:</strong> ${material}<br>
                        <strong>Diseño:</strong> ${design}<br>
                </div>
                <div class="product__price">${price} €</div>
                <div class="product__quantity-text">CANTIDAD</div>
                
                <div class="action__row">
                <div class="quantity__selector">
                <button class="btnQuantity" onclick="totalClick(-1)">-</button>
                <span id="totalClicks">0</span>
                <button class="btnQuantity" onclick="totalClick(1)">+</button>
                </div>
                
                <button class="shop__button">Añadir al carrito</button></div>
                </div>
                </div>
            </div>
  
    `;
}
