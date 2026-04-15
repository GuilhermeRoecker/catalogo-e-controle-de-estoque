import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

export default function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editando, setEditando] = useState(false);
    const [categoriaId, setCategoriaId] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [categoriaDeleteId, setCategoriaDeleteId] = useState(null);

    const [form, setForm] = useState({
        nome: "",
        descricao: ""
    });

    useEffect(() => {
        carregarCategorias();
    }, []);

    async function carregarCategorias() {
        try {
            const res = await api.get("/categorias");
            setCategorias(res.data);
        } catch {
            toast.error("Erro ao carregar categorias");
        }
    }

    function abrirCriacao() {
        setEditando(false);
        setCategoriaId(null);

        setForm({
            nome: "",
            descricao: ""
        });

        setOpenModal(true);
    }

    function abrirEdicao(cat) {
        setForm({
            nome: cat.nome,
            descricao: cat.descricao || ""
        });

        setCategoriaId(cat.id);
        setEditando(true);
        setOpenModal(true);
    }

    function fecharModal() {
        setOpenModal(false);
        setEditando(false);
        setCategoriaId(null);

        setForm({
            nome: "",
            descricao: ""
        });
    }

    async function salvar(e) {
        e.preventDefault();

        if (!form.nome) {
            return toast.error("Nome é obrigatório");
        }

        try {
            if (editando) {
                await api.put(`/categorias/${categoriaId}`, form);
                toast.success("Categoria atualizada");
            } else {
                await api.post("/categorias", form);
                toast.success("Categoria criada");
            }

            fecharModal();
            carregarCategorias();
        } catch (err) {
            toast.error(err?.response?.data?.erro || "Erro");
        }
    }

    function confirmarDelete(id) {
        setCategoriaDeleteId(id);
        setConfirmOpen(true);
    }

    async function deletarConfirmado() {
        try {
            await api.delete(`/categorias/${categoriaDeleteId}`);
            toast.success("Categoria deletada");
            carregarCategorias();
        } catch {
            toast.error("Erro ao deletar");
        } finally {
            setConfirmOpen(false);
            setCategoriaDeleteId(null);
        }
    }

    return (
        <div className="content">
            <Link className="nav-item" to="/">← Voltar</Link>

            <div className="section">
                <div className="top-bar">
                    <h2>Categorias</h2>

                    <button
                        className="add-btn"
                        onClick={abrirCriacao}
                    >
                        ➕ Categoria
                    </button>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categorias.map((c) => (
                            <tr key={c.id}>
                                <td>{c.nome}</td>
                                <td>{c.descricao}</td>

                                <td>
                                    <div style={{ display: "flex", gap: 10 }}>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => abrirEdicao(c)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => confirmarDelete(c.id)}
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

            <Modal isOpen={openModal} onClose={fecharModal}>
                <h3>
                    {editando ? "Editar Categoria" : "Nova Categoria"}
                </h3>

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

                    <button className="button">
                        {editando ? "Atualizar" : "Salvar"}
                    </button>
                </form>
            </Modal>

            <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <h3>Confirmar exclusão</h3>

                <p>Deseja realmente deletar esta categoria?</p>

                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                    <button className="btn btn-success" onClick={deletarConfirmado}>
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