"use client";

import Link from "next/link";

export default function EditUser({ id }) {
    return (
        <Link href={`/usuarios/editar/${id}`}>
            Editar
        </Link>
    );
}





