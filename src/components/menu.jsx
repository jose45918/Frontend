import Link from "next/link"
//import "@/components/menu.css"
export default function Menu(){
    return(
        <>
            <Link className="link" href="/chat">Chat</Link>
            <Link className="link" href="/usuarios/mostrar">Usuarios</Link>
            <Link className="link" href="/productos/mostrar">Productos</Link>
            <Link className="link" href="/ventas/mostrar">Ventas</Link>
        </>
    );
}