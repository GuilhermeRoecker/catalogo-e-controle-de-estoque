import { Link } from "react-router-dom";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div style={styles.container}>
            <h1>Dashboard</h1>

            <div style={styles.menu}>
                <Link style={styles.card} to="/produtos">
                    Produtos
                </Link>

                <Link style={styles.card} to="/categorias">
                    Categorias
                </Link>

                <Link style={styles.card} to="/movimentacoes">
                    Movimentações
                </Link>
            </div>

            <button onClick={handleLogout} style={styles.logout}>
                Sair
            </button>
        </div>
    );
}

const styles = {
    container: {
        padding: 20
    },
    menu: {
        display: "flex",
        gap: 10,
        marginTop: 20
    },
    card: {
        padding: 20,
        background: "#1c1d3b",
        border: "1px solid #74dc3b",
        color: "white",
        textDecoration: "none",
        borderRadius: 8
    },
    logout: {
        marginTop: 30,
        background: "#74dc3b",
        border: "none",
        padding: 10,
        borderRadius: 6,
        fontWeight: "bold"
    }
};