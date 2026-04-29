import data from "../data/data.json" with { type: 'json' };
import { createDetailTemplate } from "./components/detail-component.js";

const detailContainer = document.querySelector(".detail__container");

export function renderDetail() {
  const queryParams = new URLSearchParams(window.location.search);
  const idProduct = Number(queryParams.get("id"));

  const duck = data.find((item) => item.id == idProduct);
  if (duck) {
    detailContainer.innerHTML = createDetailTemplate(duck);
  } else {
    detailContainer.innerHTML = "<h2>¡Cuac! Patito no encontrado.</h2>";
  }
}
let cantidadProductos = 0;

export function addCountCart() {
  const contadorVisual = document.getElementById("cart-count");
  const botonAgregar = document.querySelector(".shop__button");

  if (botonAgregar) {
    botonAgregar.addEventListener("click", () => {
      cantidadProductos++;
      if (cantidadProductos > 0) {
            contadorVisual.style.display = "flex";
        }

      contadorVisual.textContent = cantidadProductos;
      contadorVisual.style.transform = "scale(1.2)";
      setTimeout(() => {
        contadorVisual.style.transform = "scale(1)";
      }, 100);
    });
  }
}