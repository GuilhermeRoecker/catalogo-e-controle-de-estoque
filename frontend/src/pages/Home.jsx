import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import api from "../services/api";
import { toast } from "react-toastify";
import GraficoCategorias from "../components/GraficoCategorias";

export default function Home() {
    const navigate = useNavigate();

    const [estoqueBaixo, setEstoqueBaixo] = useState([]);
    const [grafico, setGrafico] = useState([]);
    const [recentes, setRecentes] = useState([]);

    useEffect(() => {
        carregarDashboard();
    }, []);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    async function carregarDashboard() {
        try {
            const [b, g, r] = await Promise.all([
                api.get("/dashboard/baixo"),
                api.get("/dashboard/categorias"),
                api.get("/dashboard/recentes")
            ]);

            setEstoqueBaixo(b.data);
            setGrafico(g.data);
            setRecentes(r.data);
        } catch {
            toast.error("Erro ao carregar dashboard");
        }
    }

    return (
        <div>
            {/* HEADER */}
            <div className="header">
                <div className="title">Dashboard</div>

                <button className="logout-btn" onClick={handleLogout}>
                    Sair
                </button>
            </div>

            <div className="content">
                {/* NAVEGAÇÃO */}
                <div className="card-nav">
                    <Link className="nav-item" to="/produtos">
                        Produtos
                    </Link>

                    <Link className="nav-item" to="/categorias">
                        Categorias
                    </Link>

                    <Link className="nav-item" to="/movimentacoes">
                        Movimentações
                    </Link>
                </div>

                {/* DASHBOARD */}
                <div className="section">
                    <h2>📊 Visão geral</h2>

                    <div className="dashboard-container">

                        {/* ESTOQUE BAIXO */}
                        <div className="dashboard-card">
                            <h3>⚠️ Estoque baixo</h3>

                            {estoqueBaixo.length === 0 ? (
                                <p className="empty">Nenhum produto com estoque baixo</p>
                            ) : (
                                estoqueBaixo.map(p => (
                                    <div key={p.id} className="item-row alerta">
                                        <span>{p.nome}</span>
                                        <strong>{p.quantidade}</strong>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* GRÁFICO */}
                        <div className="dashboard-card">
                            <h3>📊 Produtos por categoria</h3>

                            <div className="grafico-wrapper">
                                <GraficoCategorias data={grafico} />
                            </div>
                        </div>

                        {/* MOVIMENTAÇÕES */}
                        <div className="dashboard-card">
                            <h3>📦 Movimentações recentes</h3>

                            {recentes.length === 0 ? (
                                <p className="empty">Nenhuma movimentação</p>
                            ) : (
                                recentes.map(m => (
                                    <div key={m.id} className="item-row">
                                        <span>{m.produto_nome}</span>
                                        <span className={m.tipo === "entrada" ? "entrada" : "saida"}>
                                            {m.tipo} ({m.quantidade})
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}