import { db } from './firebase-config.js';

import {

collection,
getDocs,
deleteDoc,
doc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================
TABLA
========================= */

const tabla =
document.getElementById("tablaArticulos");

/* =========================
OBTENER DATOS
========================= */

const querySnapshot =
await getDocs(collection(db, "articulos"));

/* =========================
ARRAY
========================= */

const articulos = [];

querySnapshot.forEach((documento)=>{

articulos.push({

id: documento.id,
...documento.data()

});

});

/* =========================
ORDENAR
========================= */

articulos.sort((a,b)=>{

return a.id.localeCompare(b.id);

});

/* =========================
MOSTRAR
========================= */

let contador = 1;

articulos.forEach((a)=>{

const estadoClase =

a.estado === "Hay unidades"
? "estadoDisponible"
: "estadoNoDisponible";

tabla.innerHTML += `

<tr>

<td>${contador}</td>

<td>${a.nombre}</td>

<td>${a.cantidadComprada}</td>

<td>$${a.precioMayorista}</td>

<td>$${a.costoTotal}</td>

<td>${a.cantidadVendida}</td>

<td>${a.disponibles}</td>

<td>$${a.precioVenta}</td>

<td>$${a.ingresos}</td>

<td>

<span class="${estadoClase}">

${a.estado}

</span>

</td>

<td>

<div class="acciones">

<a href="editarArticulo.html?id=${a.id}">

<button class="btnEditar">

Editar

</button>

</a>

<button class="btnEliminar"
onclick="eliminarArticulo('${a.id}')">

Eliminar

</button>

</div>

</td>

</tr>

`;

contador++;

});

/* =========================
ELIMINAR
========================= */

window.eliminarArticulo = async (id)=>{

const confirmar =
confirm("¿Eliminar artículo?");

if(confirmar){

await deleteDoc(doc(db,"articulos",id));

location.reload();

}

};