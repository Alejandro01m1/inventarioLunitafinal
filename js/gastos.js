import { db } from './firebase-config.js';

import {
collection,
getDocs,
addDoc,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================
FORMULARIO
========================= */

const form =
document.getElementById("formGasto");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const nombreGasto =
document.getElementById("nombreGasto").value;

const valorGasto =
Number(document.getElementById("valorGasto").value);

await addDoc(collection(db, "gastos"), {
nombreGasto,
valorGasto
});

location.reload();

});

/* =========================
MOSTRAR GASTOS
========================= */

let totalGastos = 0;

const tabla =
document.getElementById("tablaGastos");

const snapshot =
await getDocs(collection(db, "gastos"));

snapshot.forEach((docSnap) => {

const gasto = docSnap.data();

totalGastos += Number(gasto.valorGasto || 0);

tabla.innerHTML += `
<tr>
<td>${gasto.nombreGasto}</td>
<td>$${gasto.valorGasto}</td>
<td>
<button class="btnEliminar" onclick="eliminarGasto('${docSnap.id}')">
🗑 Eliminar
</button>
</td>
</tr>
`;

});

/* =========================
TOTAL
========================= */

document.getElementById("totalGastos").innerText =
"$" + totalGastos;

/* =========================
ELIMINAR GASTO
========================= */

window.eliminarGasto = async (id) => {

await deleteDoc(doc(db, "gastos", id));

location.reload();

};