export function createCartCard(product) {
    const { id, image, alt, name, category, price, quantity } = product;
    
    // Calculamos el subtotal (Precio * Cantidad)
    const subtotal = (parseFloat(price) * quantity).toFixed(2);

    return `
        <article class="cart-card" data-id="${id}">
            <button class="remove-btn">&times;</button>
            
            <div class="product-img">
              <img src="${image}" alt="${alt}">
            </div>

            <div class="product-info">
              <h3>${name}</h3>
              <span class="badge">${category}</span>
              
              <div class="details-row">
                <div class="price-block">
                  <label>Precio unitario</label>
                  <p>€${price}</p>
                </div>
                
                <div class="quantity-selector">
                  <button class="btnQuantityPay"  data-action="minus">&minus;</button>
                  <span id="totalClicksPay"class="qty-number">${quantity}</span>
                  <button class="btnQuantityPay"  data-action="plus">&plus;</button>
                </div>
              </div>
            </div>

            <div class="subtotal-block">
              <label>Subtotal</label>
              <p class="price-highlight">€<span class="subtotal-value">${subtotal}</span></p>
            </div>
          </article>
    `;
}