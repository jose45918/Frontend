'use client';
import axios from "axios";

async function newProduct(e) {
    e.preventDefault();
    const url = "http://localhost:3000/productos/nuevoProducto";

    const datos = {
        nombre: document.getElementById("nombre").value,
        proveedor: document.getElementById("proveedor").value,
        codigo: document.getElementById("codigo").value,
        descripcion: document.getElementById("descripcion").value,
        categoria: document.getElementById("categoria").value,
        precio: document.getElementById("precio").value,
        stock: document.getElementById("stock").value,
    };

    try {
        await axios.post(url, datos);
        location.replace("http://localhost:3001/productos/mostrar");
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        alert("Hubo un error al agregar el producto. Inténtalo de nuevo.");
    }
}

export default function Nuevo() {
    return (
        <>
            <div className="m-0 row justify-content-center">
                <form className="col-6 mt-5 text-center" onSubmit={newProduct} action="" method="post">
                    <div className="card">
                        <div className="card-header">
                            <h1>Nuevo Producto</h1>
                        </div>
                        <div className="card-body">
                            <input id="nombre" placeholder="Nombre" autoFocus className="form-control mb-3" type="text" />
                            <input id="proveedor" placeholder="Cantidad" className="form-control mb-3" type="text" />
                            <input id="codigo" placeholder="Codigo" className="form-control mb-3" type="text" />
                            <input id="descripcion" placeholder="Descripción" className="form-control mb-3" type="text" />
                            <input id="categoria" placeholder="Categoría" className="form-control mb-3" type="text" />
                            <input id="precio" placeholder="Precio" className="form-control mb-3" type="number" />
                            <input id="stock" placeholder="Stock" className="form-control mb-3" type="number" />
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary col-12 mt-3 mb-3" type="submit">Guardar producto</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}