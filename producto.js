let productos = [];
let productosFiltrados = [];

// ── Mapa de color (valor del JSON → clase CSS) ────────────────────────────────
const COLOR_MAP = {
  blanco:  "white",
  negro:   "black",
  azul:    "navy",
  marron:  "brown",
  rojo:    "red",
  verde:   "green",
  rosa:    "pink",
  gris:    "gray",
  beige:   "beige",
  amarillo:"yellow",
};

// ── Genera los dots de color de un producto ───────────────────────────────────
function generarColorDots(prod) {
  // Si tiene array "colores" lo usa; si no, usa el campo "color" como único dot
  const lista = prod.colores && prod.colores.length
    ? prod.colores
    : prod.color
      ? [prod.color]
      : [];

  if (lista.length === 0) return "";

  const dots = lista
    .map(c => {
      const clase = COLOR_MAP[c.toLowerCase()] || c.toLowerCase();
      return `<span class="color-dot ${clase}" title="${c}"></span>`;
    })
    .join("");

  return `<div class="color-dots">${dots}</div>`;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function estaEn(prod, seccion) {
  if (!prod.seccion) return false;
  if (prod.seccion === "ambas") return true;
  return prod.seccion === seccion;
}

// ── Sección OFERTAS ───────────────────────────────────────────────────────────
function renderizarOfertas() {
  const container = document.getElementById("ofertas-container");
  const seccion   = document.getElementById("ofertas");
  if (!container || !seccion) return;

  const enOferta = productos.filter(p => estaEn(p, "oferta"));

  if (enOferta.length === 0) {
    seccion.style.display = "none";
    return;
  }

  seccion.style.display = "";
  container.innerHTML = "";

  enOferta.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("producto-card");
    card.innerHTML = `
      <div class="img-placeholder">
        <img src="${prod.imagen}" alt="${prod.nombre}">
        ${generarColorDots(prod)}
      </div>
      <h2>${prod.nombre}</h2>
      <p>$${prod.precio.toLocaleString("es-AR")}</p>
      <button class="btn-whatsapp">Consultar por WhatsApp</button>
    `;
    container.appendChild(card);
  });
}

// ── Sección NUEVA COLECCIÓN ───────────────────────────────────────────────────
function renderizarNuevaColeccion() {
  const scroll  = document.getElementById("scroll-nueva-coleccion");
  const seccion = document.querySelector(".scroll-productos");
  if (!scroll || !seccion) return;

  const enColeccion = productos.filter(p => estaEn(p, "nueva-coleccion"));

  if (enColeccion.length === 0) {
    seccion.style.display = "none";
    return;
  }

  seccion.style.display = "";
  const todos = [...enColeccion, ...enColeccion];
  scroll.innerHTML = todos
    .map(p => `<img src="${p.imagen}" alt="${p.nombre}">`)
    .join("");
}

// ── Grid de TODOS LOS PRODUCTOS ───────────────────────────────────────────────
function renderizarProductos(lista) {
  const grid = document.getElementById("productos-grid");
  if (!grid) return;
  grid.innerHTML = "";

  if (lista.length === 0) {
    grid.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  lista.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("producto-card");
    card.innerHTML = `
      <div class="img-placeholder">
        <img src="${prod.imagen}" alt="${prod.nombre}">
        ${generarColorDots(prod)}
      </div>
      <h2>${prod.nombre}</h2>
      <p>$${prod.precio.toLocaleString("es-AR")}</p>
      <button class="btn-whatsapp">WhatsApp</button>
    `;
    grid.appendChild(card);
  });
}

// ── Filtros ───────────────────────────────────────────────────────────────────
function aplicarFiltros() {
  const searchValue = document.getElementById("search").value.toLowerCase();

  const categoriasSeleccionadas = Array.from(
    document.querySelectorAll('input[name="categoria"]:checked')
  ).map(cb => cb.value);

  const coloresSeleccionados = Array.from(
    document.querySelectorAll('input[name="color"]:checked')
  ).map(cb => cb.value);

  productosFiltrados = productos.filter(prod => {
    const coincideBusqueda = prod.nombre.toLowerCase().includes(searchValue);
    const coincideCategoria =
      categoriasSeleccionadas.length === 0 ||
      categoriasSeleccionadas.includes(prod.categoria);
    const coincideColor =
      coloresSeleccionados.length === 0 ||
      coloresSeleccionados.includes(prod.color);
    return coincideBusqueda && coincideCategoria && coincideColor;
  });

  renderizarProductos(productosFiltrados);
}

// ── Carga principal ───────────────────────────────────────────────────────────
async function cargarProductos() {
  const response = await fetch("productos.json");
  productos = await response.json();
  productosFiltrados = productos;

  renderizarOfertas();
  renderizarNuevaColeccion();
  renderizarProductos(productosFiltrados);
}

// ── Eventos ───────────────────────────────────────────────────────────────────
document.getElementById("search").addEventListener("input", aplicarFiltros);
document.querySelector(".btn-aplicar").addEventListener("click", aplicarFiltros);

cargarProductos();