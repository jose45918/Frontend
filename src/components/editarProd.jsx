"use client";
import Link from "next/link";

export default function EditProduct({ id }) {  // Default export
    return (
        <Link href={`/productos/editar/${id}`}>
            Editar
        </Link>
    );
}