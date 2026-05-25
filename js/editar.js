import { db } from './firebase-config.js';

import {

doc,
getDoc,
updateDoc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const params =
new URLSearchParams(window.location.search);

const id = params.get("id");

const referencia =
doc(db, "articulos", id);

const documento =
await getDoc(referencia);

const a = documento.data();

document.getElementById("nombre").value =
a.nombre;

document.getElementById("cantidadComprada").value =
a.cantidadComprada;

document.getElementById("precioMayorista").value =
a.precioMayorista;

document.getElementById("cantidadVendida").value =
a.cantidadVendida;

document.getElementById("precioVenta").value =
a.precioVenta;

const form =
document.getElementById("formEditar");

form.addEventListener("submit", async (e) => {

e.preventDefault();

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

await updateDoc(referencia, {

nombre:
document.getElementById("nombre").value,

cantidadComprada,
precioMayorista,
costoTotal,
cantidadVendida,
disponibles,
precioVenta,
ingresos,
estado

});

alert("Artículo actualizado");

window.location.href =
"listarArticulos.html";

});