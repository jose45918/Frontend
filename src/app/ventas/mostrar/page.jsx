"use client";
import { useEffect, useState } from "react";
import CanceleSale from "@/components/borrarVent";
import { EditSale } from "@/components/editarVent";
import axios from "axios";

export default function Sales() {
    const [ventas, setVentas] = useState([]);

    const fetchVentas = async () => {
        const url = "http://localhost:3000/ventas";
        try {
            const response = await axios.get(url);
            console.log("Ventas:", response.data);
            
            const ventasOrdenadas = response.data.sort((a, b) => {
                const fechaHoraA = new Date(`${a.fecha}T${a.hora}`);
                const fechaHoraB = new Date(`${b.fecha}T${b.hora}`);
                return fechaHoraA - fechaHoraB;
            });

            const ventasConID = ventasOrdenadas.map((venta, index) => ({
                ...venta,
                id: venta.id,  // Mantener el ID original de Firebase
                displayId: index + 1, // Para mostrar el ID en la UI
            }));
            
            setVentas(ventasConID);

            setVentas(ventasConID);
        } catch (error) {
            console.error("Error al obtener las ventas:", error);
        }
    };

    useEffect(() => {
        fetchVentas();
    }, []);

    return (
        <>
            <h1>Ventas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Usuario</th>
                        <th>Producto</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Estatus</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => (
                        <tr key={venta.id}>
                            <td>{venta.displayId}</td>
                            <td>{venta.idUsuario}</td>
                            <td>{venta.idProducto}</td>
                            <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                            <td>{venta.hora}</td>
                            <td>{venta.estatus}</td>
                            <td>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <CanceleSale id={venta.id} />
                                    <EditSale id={venta.id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
