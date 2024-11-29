"use client";
import { useEffect, useState } from "react";
import CanceleUser from "@/components/borrar"; // Asegúrate de que este componente exista
import  EditUser  from "@/components/editar"; // Asegúrate de que este componente exista
import axios from "axios";

export default function MostrarUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

    const fetchUsuarios = async () => {
        const url = "http://localhost:3000/usuarios"; // Ajusta la URL según tu API
        try {
            const response = await axios.get(url);
            console.log("Usuarios:", response.data);
            
            const usuariosOrdenados = response.data.sort((a, b) => {
                return a.nombre.localeCompare(b.nombre); // Ordena alfabéticamente por nombre
            });

            const usuariosConID = usuariosOrdenados.map((usuario, index) => ({
                ...usuario,
                displayId: index + 1, // Para mostrar un ID en la UI
            }));
            
            setUsuarios(usuariosConID);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    return (
        <>
            <h1>Usuarios</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Tipo de Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.displayId}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.usuario}</td>
                            <td>{usuario.tipoUsuario}</td>
                            <td>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <CanceleUser id={usuario.id} />
                                    <EditUser id={usuario.id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
