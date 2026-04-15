import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        try {
            await register(nome, email, senha);
            navigate("/login");
        } catch (err) {
            alert("Erro ao cadastrar");
        }
    }

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleRegister}>
                <h2>Cadastro</h2>

                <input
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={styles.input}
                />

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

                <button style={styles.button}>Cadastrar</button>

                <p>
                    Já tem conta? <Link to="/login">Entrar</Link>
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