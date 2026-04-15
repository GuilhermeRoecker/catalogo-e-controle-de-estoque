import api from "./api";

export async function login(email, senha) {
    const res = await api.post("/auth/login", { email, senha });
    return res.data;
}

export async function register(nome, email, senha) {
    const res = await api.post("/auth/register", {
        nome,
        email,
        senha
    });
    return res.data;
}