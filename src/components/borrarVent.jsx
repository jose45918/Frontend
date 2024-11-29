"use client";
import axios from "axios";
import Link from "next/link";

export default function CanceleSale({ id }) {
    async function cancelar(e) {
        e.preventDefault(); // Evita el comportamiento por defecto del enlace
        const url = `http://localhost:3000/ventas/cancelarVenta/${id}`;

        try {
            const response = await axios.put(url);
            if (response.data.success) {
                alert("Venta cancelada exitosamente.");
                window.location.replace("/ventas/mostrar"); // Redirigir después de cancelar
            } else {
                alert("Error al cancelar la venta: " + response.data.message);
            }
        } catch (error) {
            console.error("Error al cancelar la venta:", error);
            alert("Hubo un error al intentar cancelar la venta.");
        }
    }

    return (
        <Link href="#" onClick={cancelar}>Cancelar</Link>
    );
}
