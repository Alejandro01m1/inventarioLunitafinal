import { db } from './firebase-config.js';
import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const formFinanzas = document.getElementById("formFinanzas");

if (formFinanzas) {
    formFinanzas.addEventListener("submit", async (e) => {
        e.preventDefault();
        const dineroDeben = Number(document.getElementById("dineroDeben").value || 0);
        const envio = Number(document.getElementById("envio").value || 0);

        await addDoc(collection(db, "finanzas"), { dineroDeben, envio, fecha: new Date() });
        location.reload();
    });
}

async function cargarDatos() {
    let tVendido = 0;      
    let tCostoVendido = 0; 
    let tEnvio = 0;
    let tDeben = 0;

    const artSnap = await getDocs(collection(db, "articulos"));
    
    console.log("--- AUDITORÍA DE COSTOS (Compara esto con tu cuaderno) ---");
    
    artSnap.forEach(doc => {
        const a = doc.data();
        const pMayorista = Number(a.precioMayorista || 0);
        const cantVendida = Number(a.cantidadVendida || 0);
        const ingresos = Number(a.ingresos || 0);
        
        const costoFila = (pMayorista * cantVendida);
        tCostoVendido += costoFila;
        tVendido += ingresos;
        
        // ESTA LÍNEA ES LA CLAVE: Mira la consola (F12)
        console.log(`Producto: ${a.nombre} | Vendidos: ${cantVendida} | P.Mayorista: ${pMayorista} | Total sumado: ${costoFila}`);
    });

    const finSnap = await getDocs(collection(db, "finanzas"));
    finSnap.forEach(doc => {
        const d = doc.data();
        tEnvio += Number(d.envio || 0);
        tDeben += Number(d.dineroDeben || 0);
    });

    // Cálculos
    const dineroReal = tVendido - tCostoVendido - tEnvio - tDeben;

    // Mostrar
    document.getElementById("totalVendido").innerText = "$" + tVendido.toLocaleString();
    document.getElementById("totalInvertido").innerText = "$" + Math.round(tCostoVendido).toLocaleString();
    document.getElementById("gastosEnvio").innerText = "$" + tEnvio.toLocaleString();
    document.getElementById("totalDeben").innerText = "$" + tDeben.toLocaleString();
    document.getElementById("dineroReal").innerText = "$" + Math.round(dineroReal).toLocaleString();
    
    console.log("--- RESULTADOS FINALES ---");
    console.log("Suma total de Costos:", tCostoVendido);
    console.log("Dinero Real:", dineroReal);
}

cargarDatos();