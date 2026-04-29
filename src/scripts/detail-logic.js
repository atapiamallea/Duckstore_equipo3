import data from "../data/data.json" with { type: 'json' };
import { createDetailTemplate } from "./components/detail-component.js";

const detailContainer = document.querySelector(".detail__container");

// --- FUNCIÓN 1: RENDERIZAR (Dibuja el pato y nos lo devuelve) ---
export function renderDetail() {
  const queryParams = new URLSearchParams(window.location.search);
  const idProduct = Number(queryParams.get("id"));

  const duck = data.find((item) => item.id == idProduct);

  if (duck) {
    detailContainer.innerHTML = createDetailTemplate(duck);
    return duck; // Devolvemos el pato para que el main lo use
  } else {
    detailContainer.innerHTML = "<h2>¡Cuac! Patito no encontrado.</h2>";
    return null;
  }
}

// --- FUNCIÓN 2: ACTUALIZAR EL BADGE (El numerito rojo del menú) ---
export function updateCartBadge() {
  const contadorVisual = document.getElementById("cart-count");
  const cart = JSON.parse(localStorage.getItem("duck-cart")) || [];
  
  // Sumamos las cantidades de todos los productos en el carrito
  const total = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (total > 0) {
    contadorVisual.style.display = "flex";
    contadorVisual.textContent = total;
  } else {
    contadorVisual.style.display = "none";
  }
}

// --- FUNCIÓN 3: AGREGAR AL CARRITO (Reemplaza a addCountCart) ---
export function setupAddToCart(duck) {
  const botonAgregar = document.querySelector(".shop__button");
  const contadorVisual = document.getElementById("cart-count");

  if (botonAgregar && duck) {
    botonAgregar.addEventListener("click", () => {
      // 1. ¿Cuántos patos dice el selector (+/-)?
      const cantidadElegida = parseInt(document.getElementById("totalClicks").textContent);

      if (cantidadElegida <= 0) return alert("Selecciona al menos un patito 🦆");

      // 2. Traer carrito actual del LocalStorage
      let cart = JSON.parse(localStorage.getItem("duck-cart")) || [];

      // 3. ¿Ya existe este pato en el carrito?
      const index = cart.findIndex(item => item.id === duck.id);

      if (index !== -1) {
        cart[index].quantity += cantidadElegida;
      } else {
        cart.push({ id: duck.id, quantity: cantidadElegida });
      }

      // 4. Guardar de nuevo en LocalStorage
      localStorage.setItem("duck-cart", JSON.stringify(cart));

      // 5. Animación y actualización visual
      updateCartBadge();
      contadorVisual.style.transform = "scale(1.3)";
      setTimeout(() => contadorVisual.style.transform = "scale(1)", 100);
      
      alert(`¡Agregado! Ahora tienes ${cantidadElegida} más en tu cesta.`);
    });
  }
}

// --- FUNCIÓN 4: EL SELECTOR (+/-) ---
export function totalClick(click) {
    const totalClicksSpan = document.getElementById('totalClicks');
    let sumValue = parseInt(totalClicksSpan.innerHTML) + click;
    if (sumValue < 0) sumValue = 0;
    totalClicksSpan.innerHTML = sumValue;
}