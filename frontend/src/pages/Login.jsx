import { useState } from "react";
import { login, register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
    const [modo, setModo] = useState("login"); // login | register
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            if (modo === "login") {
                await login(email, senha);
                toast.success("Login realizado");
            } else {
                await register(nome, email, senha);
                toast.success("Conta criada");
            }

            navigate("/");
        } catch (err) {
            toast.error(err?.response?.data?.erro || "Erro");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container-center">
            <form className="card" onSubmit={handleSubmit}>
                <h2>{modo === "login" ? "Login" : "Cadastro"}</h2>

                {modo === "register" && (
                    <input
                        className="input"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                )}

                <input
                    className="input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="input"
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <button className="button">
                    {loading
                        ? "Carregando..."
                        : modo === "login"
                        ? "Entrar"
                        : "Cadastrar"}
                </button>

                <p style={{ fontSize: 14 }}>
                    {modo === "login" ? (
                        <>
                            Não tem conta?{" "}
                            <span
                                className="link"
                                onClick={() => setModo("register")}
                            >
                                Cadastrar
                            </span>
                        </>
                    ) : (
                        <>
                            Já tem conta?{" "}
                            <span
                                className="link"
                                onClick={() => setModo("login")}
                            >
                                Fazer login
                            </span>
                        </>
                    )}
                </p>
            </form>
        </div>
    );
}