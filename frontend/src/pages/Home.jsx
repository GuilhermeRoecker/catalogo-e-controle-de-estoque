import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import api from "../services/api";
import { toast } from "react-toastify";
import Modal from "../components/Modal";

export default function Home() {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editando, setEditando] = useState(false);
    const [produtoId, setProdutoId] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [produtoDeleteId, setProdutoDeleteId] = useState(null);

    const [form, setForm] = useState({
        nome: "",
        descricao: "",
        preco: "",
        categoria_id: ""
    });

    useEffect(() => {
        carregarProdutos();
        carregarCategorias();
    }, []);

    async function carregarProdutos() {
        try {
            const res = await api.get("/produtos");
            setProdutos(res.data);
        } catch {
            toast.error("Erro ao carregar produtos");
        }
    }

    async function carregarCategorias() {
        try {
            const res = await api.get("/categorias");
            setCategorias(res.data);
        } catch {
            toast.error("Erro ao carregar categorias");
        }
    }

    function handleLogout() {
        logout();
        navigate("/login");
    }

    async function salvarProduto(e) {
        e.preventDefault();

        if (!form.nome || !form.preco || !form.categoria_id) {
            return toast.error("Preencha os campos obrigatórios");
        }

        try {
            if (editando) {
                await api.put(`/produtos/${produtoId}`, {
                    ...form,
                    categoria_id: Number(form.categoria_id)
                });

                toast.success("Produto atualizado");
            } else {
                await api.post("/produtos", {
                    ...form,
                    categoria_id: Number(form.categoria_id)
                });

                toast.success("Produto criado");
            }

            setOpenModal(false);
            setEditando(false);
            setProdutoId(null);

            carregarProdutos();

            setForm({
                nome: "",
                descricao: "",
                preco: "",
                categoria_id: ""
            });
        } catch (err) {
            toast.error(err?.response?.data?.erro || "Erro");
        }
    }

    function confirmarDeleteProduto(id) {
        setProdutoDeleteId(id);
        setConfirmOpen(true);
    }

    async function deletarProdutoConfirmado() {
        try {
            await api.delete(`/produtos/${produtoDeleteId}`);
            toast.success("Produto deletado");
            carregarProdutos();
        } catch {
            toast.error("Erro ao deletar");
        } finally {
            setConfirmOpen(false);
            setProdutoDeleteId(null);
        }
    }

    function abrirCriacao() {
        setEditando(false);
        setProdutoId(null);

        setForm({
            nome: "",
            descricao: "",
            preco: "",
            quantidade: "",
            categoria_id: ""
        });

        setOpenModal(true);
    }

    function abrirEdicao(produto) {
        setForm({
            nome: produto.nome,
            descricao: produto.descricao || "",
            preco: produto.preco,
            categoria_id: String(produto.categoria_id)
        });

        setProdutoId(produto.id);
        setEditando(true);
        setOpenModal(true);
    }

    function fecharModal() {
        setOpenModal(false);
        setEditando(false);
        setProdutoId(null);

        setForm({
            nome: "",
            descricao: "",
            preco: "",
            quantidade: "",
            categoria_id: ""
        });
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
                    <Link className="nav-item" to="/categorias">
                        Categorias
                    </Link>

                    <Link className="nav-item" to="/movimentacoes">
                        Movimentações
                    </Link>
                </div>

                {/* PRODUTOS */}
                <div className="section">
                    <div className="top-bar">
                        <h2>Produtos</h2>

                        <button
                            className="add-btn"
                            onClick={abrirCriacao}
                        >
                            + Produto
                        </button>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Quantidade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.nome}</td>
                                    <td>R$ {Number(p.preco || 0).toFixed(2)}</td>
                                    <td style={{
                                        color: p.quantidade < 5 ? "red" : "white",
                                        fontWeight: p.quantidade < 5 ? "bold" : "normal"
                                    }}>
                                        {p.quantidade}
                                    </td>

                                    <td>
                                        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
                                            <button
                                                className="btn btn-warning"
                                                onClick={() => abrirEdicao(p)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="btn btn-danger"
                                                onClick={() => confirmarDeleteProduto(p.id)}
                                            >
                                                Deletar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL */}
            <Modal isOpen={openModal} onClose={fecharModal}>
                <h3>{editando ? "Editar Produto" : "Novo Produto"}</h3>

                <form className="form" onSubmit={salvarProduto}>
                    <input
                        className="input"
                        placeholder="Nome"
                        value={form.nome}
                        onChange={(e) =>
                            setForm({ ...form, nome: e.target.value })
                        }
                    />

                    <input
                        className="input"
                        placeholder="Descrição"
                        value={form.descricao}
                        onChange={(e) =>
                            setForm({ ...form, descricao: e.target.value })
                        }
                    />

                    <input
                        className="input"
                        placeholder="Preço"
                        type="number"
                        value={form.preco}
                        onChange={(e) =>
                            setForm({ ...form, preco: e.target.value })
                        }
                    />

                    <select
                        className="input"
                        value={form.categoria_id}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                categoria_id: e.target.value
                            })
                        }
                    >
                        <option value="">Selecione uma categoria</option>

                        {categorias.length === 0 ? (
                            <option disabled>Carregando...</option>
                        ) : (
                            categorias.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.nome}
                                </option>
                            ))
                        )}
                    </select>

                    <button className="button">
                        {editando ? "Atualizar" : "Salvar"}
                    </button>
                </form>
            </Modal>

            <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <h3>Confirmar exclusão</h3>

                <p>Deseja realmente deletar este produto?</p>

                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                    <button
                        className="btn btn-success"
                        onClick={deletarProdutoConfirmado}
                    >
                        Confirmar
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={() => setConfirmOpen(false)}
                    >
                        Cancelar
                    </button>
                </div>
            </Modal>
        </div>
    );
}