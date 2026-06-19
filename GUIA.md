# 📋 Guía para editar productos.json

## Estructura de un producto

Cada producto es un bloque `{ }` separado por comas. Ejemplo completo:

```json
{
  "id": 1,
  "nombre": "Remera básica de tiras",
  "precio": 8500,
  "imagen": "tu-imagen-1.jpg",
  "categoria": "remeras",
  "color": "blanco",
  "colores": ["blanco", "negro", "marron"],
  "seccion": "oferta"
}
```

---

## Campos disponibles

| Campo       | Qué hace                                      | Ejemplo                        |
|-------------|-----------------------------------------------|--------------------------------|
| `id`        | Número único por producto. No repetir.        | `1`, `2`, `3`...               |
| `nombre`    | Nombre que aparece en la card.                | `"Remera básica"`              |
| `precio`    | Precio en números, sin puntos ni signos.      | `8500`                         |
| `imagen`    | Nombre del archivo de imagen (en la carpeta). | `"foto-remera.jpg"`            |
| `categoria` | Para el filtro de categoría.                  | Ver opciones abajo ↓           |
| `color`     | Color principal (para el filtro de color).    | Ver opciones abajo ↓           |
| `colores`   | Lista de colores que muestra los circulitos.  | `["blanco", "negro"]`          |
| `seccion`   | Dónde aparece el producto además del grid.    | Ver opciones abajo ↓           |

---

## Opciones de `categoria`

- `"remeras"`
- `"jeans"`
- `"camisas"`
- `"accesorios"`

---

## Opciones de `color` y `colores`

- `"blanco"`
- `"negro"`
- `"azul"`
- `"marron"`
- `"rojo"`
- `"verde"`
- `"rosa"`
- `"gris"`
- `"beige"`
- `"amarillo"`

---

## Opciones de `seccion`

| Valor             | Dónde aparece                              |
|-------------------|--------------------------------------------|
| *(sin el campo)*  | Solo en el grid de todos los productos     |
| `"oferta"`        | En la sección **Ofertas**                  |
| `"nueva-coleccion"` | En el scroll de **Nueva Colección**      |
| `"ambas"`         | En **Ofertas** y en **Nueva Colección**    |

---

## Agregar un producto nuevo

1. Copiar un bloque existente.
2. Cambiar el `id` por el siguiente número disponible.
3. Completar los demás campos.
4. Asegurarse de que haya una **coma** entre bloques (menos en el último).

```json
[
  { ... producto 1 ... },
  { ... producto 2 ... },
  { ... producto 3 ... }   ← este NO lleva coma al final
]
```

---

## ⚠️ Errores comunes

- **Olvidar la coma** entre productos → la página no carga.
- **Escribir el nombre de la imagen mal** → aparece sin foto.
- **Repetir el mismo `id`** → puede causar comportamientos raros.
- **Poner el precio con texto** como `"$8.500"` → usá solo el número: `8500`.