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

    async function salvar(e) {
        e.preventDefault();

        if (!form.nome || !form.preco || !form.categoria_id) {
            return toast.error("Preencha os campos obrigatórios");
        }

        if (editando) {
            await api.put(`/produtos/${produtoId}`, form);
            toast.success("Atualizado");
        } else {
            await api.post("/produtos", form);
            toast.success("Criado");
        }

        setOpenModal(false);
        carregarProdutos();
    }

    function confirmarDelete(id) {
        setProdutoDeleteId(id);
        setConfirmOpen(true);
    }

    async function deletar() {
        await api.delete(`/produtos/${produtoDeleteId}`);
        toast.success("Deletado");
        setConfirmOpen(false);
        carregarProdutos();
    }

    return (
        <div className="content">
            <Link className="nav-item" to="/">← Voltar</Link>

            <div className="top-bar">
                <h2>Produtos</h2>
                <button className="add-btn" onClick={abrirCriacao}>+ Produto</button>
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
                                    <button className="btn btn-warning" onClick={() => abrirEdicao(p)}>
                                        Editar
                                    </button>

                                    <button className="btn btn-danger" onClick={() => confirmarDelete(p.id)}>
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

            {/* modal e confirmação iguais ao que você já tem */}
        </div>
    );
}