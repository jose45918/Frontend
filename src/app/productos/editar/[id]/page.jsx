"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function EditarProducto({ params }) {
    const [productoId, setProductoId] = useState(null);
    const [producto, setProducto] = useState({
        nombre: '',
        proveedor: '',
        descripcion: '',
        categoria: '',
        precio: '', // Cambiar a string inicialmente
        stock: ''   // Cambiar a string inicialmente
    });
    const router = useRouter();

    useEffect(() => {
        async function fetchParams() {
            const resolvedParams = await params;
            setProductoId(resolvedParams.id);
        }
        fetchParams();
    }, [params]);

    useEffect(() => {
        if (productoId) {
            const fetchProducto = async () => {
                const url = `http://localhost:3000/productos/buscarPorId/${productoId}`;
                try {
                    const response = await axios.get(url);
                    const data = response.data;
                    setProducto(data);
                } catch (error) {
                    console.error("Error fetching product:", error);
                    alert("No se pudo cargar el producto. Inténtalo de nuevo.");
                }
            };
            fetchProducto();
        }
    }, [productoId]);

    const editarProducto = async (e) => {
        e.preventDefault();

        const url = `http://localhost:3000/productos/editarProducto/${productoId}`;
        try {
            const response = await axios.put(url, producto);
            console.log("Producto actualizado:", response.data);
            router.push("/productos/mostrar");
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Hubo un error al editar el producto. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={editarProducto} method="post">
                <div className="card">
                    <div className="card-header">
                        <h1>Editar Producto</h1>
                    </div>
                    <div className="card-body">
                        <input
                            value={producto.nombre}
                            onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
                            placeholder="Nombre"
                            className="form-control mb-3"
                            type="text"
                            required
                        />
                        <input
                            value={producto.proveedor}
                            onChange={(e) => setProducto({ ...producto, proveedor: e.target.value })}
                            placeholder="Proveedor"
                            className="form-control mb-3"
                            type="text"
                            required
                        />
                        <input
                            value={producto.descripcion}
                            onChange={(e) => setProducto({ ...producto, descripcion: e.target.value })}
                            placeholder="Descripción"
                            className="form-control mb-3"
                            type="text"
                            required
                        />
                        <input
                            value={producto.categoria}
                            onChange={(e) => setProducto({ ...producto, categoria: e.target.value })}
                            placeholder="Categoría"
                            className="form-control mb-3"
                            type="text"
                            required
                        />
                        <input
                            value={producto.precio}
                            onChange={(e) => {
                                const value = e.target.value;
                                setProducto({ ...producto, precio: value === '' ? '' : parseFloat(value) });
                            }}
                            placeholder="Precio"
                            className="form-control mb-3"
                            type="number"
                            step="0.01"
                            required
                        />
                        <input
                            value={producto.stock}
                            onChange={(e) => {
                                const value = e.target.value;
                                setProducto({ ...producto, stock: value === '' ? '' : parseInt(value, 10) });
                            }}
                            placeholder="Stock"
                            className="form-control mb-3"
                            type="number"
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
