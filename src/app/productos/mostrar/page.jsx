"use client"; // Ensure this is present to use state hooks
import { useEffect, useState } from "react";
import EditProduct from "@/components/editarProd";
import DeleteProduct from "@/components/borrarProd";
import axios from "axios";

export default function Product() {
    const [productos, setProductos] = useState([]); // Initialize state to hold products

    const fetchProductos = async () => {
        const url = "http://localhost:3000/productos";
        const response = await axios.get(url);
        console.log("Productos:", response.data); // Log the response data
        setProductos(response.data); // Update state with fetched data
    };

    useEffect(() => {
        fetchProductos(); // Fetch products on component mount
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return (
        <>
            <h1>Productos</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Proveedor</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, i) => (
                        <tr key={producto.id}>
                            <td>{i + 1}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.proveedor}</td>
                            <td>{producto.descripcion}</td>
                            <td>{producto.categoria}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <DeleteProduct id={producto.id} />
                                    <EditProduct id={producto.id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
