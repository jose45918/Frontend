'use client'; 
import axios from "axios";

async function newSale(e) {
    e.preventDefault();
    const url = "http://localhost:3000/ventas/nuevaVenta";
    
    const datos = {
        idUsuario: document.getElementById("idUsuario").value,
        idProducto: document.getElementById("idProducto").value,
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toTimeString().split(' ')[0],
        estatus: "vendido"
    };

    try {
        await axios.post(url, datos);
        location.replace("http://localhost:3001/ventas/mostrar");
    } catch (error) {
        console.error("Error al agregar la venta:", error);
        alert("Hubo un error al agregar la venta. Inténtalo de nuevo.");
    }
}

export default function NuevoVenta() {
    return (
        <>
            <div className="m-0 row justify-content-center">
                <form className="col-6 mt-5 text-center" onSubmit={newSale} method="post">
                    <div className="card">
                        <div className="card-header">
                            <h1>Nueva Venta</h1>
                        </div>
                        <div className="card-body">
                            <input id="idUsuario" placeholder="ID Usuario" autoFocus className="form-control mb-3" type="text" />
                            <input id="idProducto" placeholder="ID Producto" className="form-control mb-3" type="text" />
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary col-12 mt-3 mb-3" type="submit">Guardar venta</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
