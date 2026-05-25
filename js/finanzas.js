import { db } from './firebase-config.js';
import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const formFinanzas = document.getElementById("formFinanzas");

formFinanzas.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Captura los valores del formulario
    const dineroDeben = Number(document.getElementById("dineroDeben").value || 0);
    const envio = Number(document.getElementById("envio").value || 0);

    // Guardamos los datos del registro en la colección "finanzas"
    await addDoc(collection(db, "finanzas"), { 
        dineroDeben, 
        envio,
        fecha: new Date().getTime() 
    });
    location.reload();
});

async function calcularFinanzas() {
    let tVendido = 0, tInvertido = 0, tEnvio = 0, tDeben = 0;

    // 1. Obtenemos datos de la colección "articulos"
    const artSnap = await getDocs(collection(db, "articulos"));
    artSnap.forEach(doc => {
        const a = doc.data();
        tVendido += Number(a.ingresos || 0);
        tInvertido += Number(a.costoTotal || 0);
    });

    // 2. Obtenemos datos de la colección "finanzas"
    const finSnap = await getDocs(collection(db, "finanzas"));
    finSnap.forEach(doc => {
        const d = doc.data();
        tEnvio += Number(d.envio || 0);
        tDeben += Number(d.dineroDeben || 0);
    });

    // 3. CÁLCULO ESTRICTO
    // El dinero real es lo que queda tras restar los costos operativos y de compra
    const dineroReal = tVendido - tInvertido - tEnvio;

    // 4. Actualizamos el DOM
    document.getElementById("totalVendido").innerText = "$" + tVendido.toLocaleString();
    document.getElementById("totalInvertido").innerText = "$" + tInvertido.toLocaleString();
    document.getElementById("gastosEnvio").innerText = "$" + tEnvio.toLocaleString();
    document.getElementById("totalDeben").innerText = "$" + tDeben.toLocaleString();
    document.getElementById("dineroReal").innerText = "$" + dineroReal.toLocaleString();
}

calcularFinanzas();