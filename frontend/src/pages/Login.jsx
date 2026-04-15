import { useState } from "react";
import { login } from "../services/authService";
import { setToken } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const data = await login(email, senha);
            setToken(data.token);
            navigate("/");
        } catch (err) {
            alert("Erro no login");
        }
    }

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleLogin}>
                <h2>Login</h2>

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    style={styles.input}
                />

                <button style={styles.button}>Entrar</button>

                <p>
                    Não tem conta? <Link to="/register">Cadastrar</Link>
                </p>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
    },
    form: {
        background: "#1c1d3b",
        padding: 30,
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: 300,
        border: "1px solid #74dc3b"
    },
    input: {
        padding: 10,
        borderRadius: 5,
        border: "none"
    },
    button: {
        padding: 10,
        background: "#74dc3b",
        border: "none",
        borderRadius: 5,
        fontWeight: "bold"
    }
};