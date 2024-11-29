"use client";
import Link from "next/link";
import axios from "axios";

export default function DeleteUser({ id }) {  // Asegúrate de que el nombre de la función coincida
    async function borrar(event) {
        event.preventDefault();  // Prevenir el comportamiento por defecto del enlace
        const url = `http://localhost:3000/usuarios/borrarUsuario/${id}`;
        await axios.delete(url);
        window.location.replace("/usuarios/mostrar");
    }

    return (
        <Link href="#" onClick={borrar}>Borrar</Link>
    );
}
