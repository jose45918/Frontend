"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function EditarUsuario({ params }) {
    const [userId, setUserId] = useState(null);
    const [usuario, setUsuario] = useState({
        nombre: '',
        usuario: '',
        password: '',
    });
    const router = useRouter();

    useEffect(() => {
        async function fetchParams() {
            const resolvedParams = await params;
            setUserId(resolvedParams.id);
        }
        fetchParams();
    }, [params]);

    useEffect(() => {
        if (userId) {
            const fetchUsuario = async () => {
                const url = `http://localhost:3000/usuarios/buscarPorId/${userId}`;
                try {
                    const response = await axios.get(url);
                    setUsuario(response.data);
                } catch (error) {
                    console.error("Error fetching user:", error);
                    alert("No se pudo cargar el usuario. Inténtalo de nuevo.");
                }
            };
            fetchUsuario();
        }
    }, [userId]);

    const editarUsuario = async (e) => {
        e.preventDefault();

        const url = `http://localhost:3000/usuarios/editarUsuario/${userId}`;
        try {
            await axios.put(url, usuario);
            console.log("Usuario actualizado");
            router.push("/usuarios/mostrar");
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Hubo un error al editar el usuario. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={editarUsuario} method="post">
                <div className="card">
                    <div className="card-header">
                        <h1>Editar Usuario</h1>
                    </div>
                    <div className="card-body">
                        <input
                            value={usuario.nombre}
                            onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                            placeholder="Nombre"
                            className="form-control mb-3"
                            type="text"
                            required
                        />
                        <input
                            value={usuario.usuario}
                            onChange={(e) => setUsuario({ ...usuario, usuario: e.target.value })}
                            placeholder="Usuario"
                            className="form-control mb-3"
                            type="text"
                            required
                        />
                        <input
                            value={usuario.password}
                            onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
                            placeholder="Password"
                            className="form-control mb-3"
                            type="text"
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
