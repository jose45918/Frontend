'use client';
import axios from "axios";
import Link from "next/link";

export default function DeleteProduct({ id }) {
    async function borrar() {
        const url="http://localhost:3000/productos/borrarProducto/"+id;
        const answer=await axios.delete(url);
        window.location.replace("/productos/mostrar");
    }
    return (
        <Link href="" onClick={borrar}>Borrar</Link>
    );
}