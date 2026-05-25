import { db } from './firebase-config.js';

import {
addDoc,
collection
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("formArticulo");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const nombre =
document.getElementById("nombre").value;

const cantidadComprada =
parseInt(document.getElementById("cantidadComprada").value);

const precioMayorista =
parseFloat(document.getElementById("precioMayorista").value);

const cantidadVendida =
parseInt(document.getElementById("cantidadVendida").value);

const precioVenta =
parseFloat(document.getElementById("precioVenta").value);

const costoTotal =
cantidadComprada * precioMayorista;

const disponibles =
cantidadComprada - cantidadVendida;

const ingresos =
cantidadVendida * precioVenta;

const estado =
disponibles > 0
? "Hay unidades"
: "No hay unidades";

await addDoc(collection(db, "articulos"), {

nombre,
cantidadComprada,
precioMayorista,
costoTotal,
cantidadVendida,
disponibles,
precioVenta,
ingresos,
estado

});

alert("Artículo agregado");

window.location.href =
"listarArticulos.html";

});