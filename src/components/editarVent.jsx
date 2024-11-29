"use client";
import Link from "next/link";

export function EditSale({ id }) { // Exportación con nombre
    return (
        <Link href={`/ventas/editar/${id}`}>
            Editar
        </Link>
    );
}