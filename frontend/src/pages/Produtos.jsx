import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import Modal from "../components/Modal";

export default function Produtos() {
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
        const res = await api.get("/produtos");
        setProdutos(res.data);
    }

    async function carregarCategorias() {
        const res = await api.get("/categorias");
        setCategorias(res.data);
    }

    function abrirCriacao() {
        setEditando(false);
        setProdutoId(null);
        setForm({ nome: "", descricao: "", preco: "", categoria_id: "" });
        setOpenModal(true);
    }

    function abrirEdicao(p) {
        setForm({
            nome: p.nome,
            descricao: p.descricao || "",
            preco: p.preco,
            categoria_id: String(p.categoria_id)
        });
        setProdutoId(p.id);
        setEditando(true);
        setOpenModal(true);
    }

    function fecharModal() {
        setOpenModal(false);
        setEditando(false);
        setProdutoId(null);
        setForm({ nome: "", descricao: "", preco: "", categoria_id: "" });
    }

    async function salvar(e) {
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
                    preco: Number(String(form.preco).replace(",", ".")),
                    categoria_id: Number(form.categoria_id)
                });
                toast.success("Produto criado");
            }

            fecharModal();
            carregarProdutos();
        } catch {
            toast.error("Erro ao salvar");
        }
    }

    function confirmarDelete(id) {
        setProdutoDeleteId(id);
        setConfirmOpen(true);
    }

    async function deletar() {
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

    return (
        <div className="content">
            <Link className="nav-item" to="/">← Voltar</Link>

            <div className="top-bar">
                <h2>Produtos</h2>
                <button className="add-btn" onClick={abrirCriacao}>
                    ➕ Produto
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
                    {produtos.map(p => (
                        <tr key={p.id}>
                            <td>{p.nome}</td>
                            <td>R$ {Number(p.preco).toFixed(2)}</td>
                            <td style={{
                                color: p.quantidade < 5 ? "red" : "white"
                            }}>
                                {p.quantidade}
                            </td>

                            <td>
                                <div style={{ display: "flex", gap: 10 }}>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => abrirEdicao(p)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => confirmarDelete(p.id)}
                                    >
                                        Deletar
                                    </button>

                                    <Link to={`/movimentacoes?produto=${p.id}`}>
                                        <button className="btn">
                                            Histórico
                                        </button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* MODAL CRIAR/EDITAR */}
            <Modal isOpen={openModal} onClose={fecharModal}>
                <h3>{editando ? "Editar Produto" : "Novo Produto"}</h3>

                <form className="form" onSubmit={salvar}>
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
                        type="text"
                        inputMode="decimal"
                        placeholder="Preço"
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
                        <option value="">Selecione</option>

                        {categorias.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.nome}
                            </option>
                        ))}
                    </select>

                    <button className="button">
                        {editando ? "Atualizar" : "Salvar"}
                    </button>
                </form>
            </Modal>

            {/* MODAL CONFIRMAÇÃO */}
            <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <h3>Confirmar exclusão</h3>

                <p>Deseja realmente deletar este produto?</p>

                <div style={{ display: "flex", gap: 10 }}>
                    <button className="btn btn-success" onClick={deletar}>
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