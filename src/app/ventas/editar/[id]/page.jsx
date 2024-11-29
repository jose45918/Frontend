"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function EditarVenta({ params }) {
    const [ventaId, setVentaId] = useState(null);
    const [venta, setVenta] = useState({
        idUsuario: '',
        idProducto: '',
        fecha: '',
        hora: '',
    });
    const router = useRouter();

    useEffect(() => {
        async function fetchParams() {
            const resolvedParams = await params;
            setVentaId(resolvedParams.id);
        }
        fetchParams();
    }, [params]);

    useEffect(() => {
        if (ventaId) {
            const fetchVenta = async () => {
                const url = `http://localhost:3000/ventas/${ventaId}`;
                try {
                    const response = await axios.get(url);
                    const data = response.data;
                    setVenta(data);
                } catch (error) {
                    console.error("Error fetching sale:", error);
                    alert("No se pudo cargar la venta. Inténtalo de nuevo.");
                }
            };
            fetchVenta();
        }
    }, [ventaId]);

    const editarVenta = async (e) => {
        e.preventDefault();

        const url = `http://localhost:3000/ventas/editarVenta/${ventaId}`;
        try {
            const response = await axios.put(url, venta);
            console.log("Venta actualizada:", response.data);
            router.push("/ventas/mostrar");
        } catch (error) {
            console.error("Error updating sale:", error);
            alert("Hubo un error al editar la venta. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={editarVenta} method="post">
                <div className="card">
                    <div className="card-header">
                        <h1>Editar Venta</h1>
                    </div>
                    <div className="card-body">
                        <input
                            value={venta.idUsuario}
                            onChange={(e) => setVenta({ ...venta, idUsuario: e.target.value })}
                            placeholder="ID Usuario"
                            className="form-control mb-3"
                            type="text"
                            required
                        />
                        <input
                            value={venta.idProducto}
                            onChange={(e) => setVenta({ ...venta, idProducto: e.target.value })}
                            placeholder="ID Producto"
                            className="form-control mb-3"
                            type="text"
                            required
                        />
                        <input
                            value={venta.fecha}
                            onChange={(e) => setVenta({ ...venta, fecha: e.target.value })}
                            placeholder="Fecha"
                            className="form-control mb-3"
                            type="date"
                            required
                        />
                        <input
                            value={venta.hora}
                            onChange={(e) => setVenta({ ...venta, hora: e.target.value })}
                            placeholder="Hora"
                            className="form-control mb-3"
                            type="time"
                            required
                        />
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary col-12 mt-2 mb-2" type="submit">Guardar cambios</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
