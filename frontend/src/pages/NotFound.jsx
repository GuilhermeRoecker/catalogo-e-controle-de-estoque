import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            color: "#fff"
        }}>
            <h1 style={{ fontSize: "64px", marginBottom: 10 }}>404</h1>
            <p style={{ marginBottom: 20 }}>
                Página não encontrada
            </p>

            <Link to="/" className="btn btn-primary">
                Voltar para o início
            </Link>
        </div>
    );
}