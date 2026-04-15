import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

export default function Movimentacoes() {
  const [movs, setMovs] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [buscaProduto, setBuscaProduto] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mostrarLista, setMostrarLista] = useState(false);

  const [form, setForm] = useState({
    produto_id: "",
    tipo: "entrada",
    quantidade: "",
    observacao: "",
  });

  useEffect(() => {
    carregarMovs();
    carregarProdutos();
  }, []);

  async function carregarMovs() {
    try {
      const res = await api.get("/movimentacoes");
      setMovs(res.data);
    } catch {
      toast.error("Erro ao carregar movimentações");
    }
  }

  async function carregarProdutos() {
    try {
      const res = await api.get("/produtos");
      setProdutos(res.data);
    } catch {
      toast.error("Erro ao carregar produtos");
    }
  }

  function abrirModal() {
    setForm({
      produto_id: "",
      tipo: "entrada",
      quantidade: "",
      observacao: "",
    });

    setBuscaProduto("");
    setMostrarLista(false);
    setOpenModal(true);
  }

  function fecharModal() {
    setOpenModal(false);
  }

  async function salvar(e) {
    e.preventDefault();

    if (!form.produto_id || !form.quantidade) {
      return toast.error("Preencha os campos obrigatórios");
    }

    try {
      await api.post("/movimentacoes", {
        ...form,
        produto_id: Number(form.produto_id),
        quantidade: Number(form.quantidade),
      });

      toast.success("Movimentação registrada");
      fecharModal();
      carregarMovs();
    } catch (err) {
      toast.error(err?.response?.data?.erro || err.message);
    }
  }

  function normalizar(texto = "") {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  const filtrados = produtos.filter((p) =>
    normalizar(p.nome).includes(normalizar(buscaProduto))
  );

  const listaVisivel =
    mostrarLista &&
    buscaProduto.trim().length > 0 &&
    filtrados.length > 0;

  return (
    <div className="content">
      <Link className="nav-item" to="/">
        ← Voltar
      </Link>

      <div className="section">
        <div className="top-bar">
          <h2>Movimentações</h2>

          <button className="add-btn" onClick={abrirModal}>
            ➕ Movimentação
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Tipo</th>
              <th>Quantidade</th>
              <th>Observação</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>
            {movs.map((m) => (
              <tr key={m.id}>
                <td>{m.produto_nome}</td>
                <td>{m.tipo === "entrada" ? "Entrada" : "Saída"}</td>
                <td>{m.quantidade}</td>
                <td>{m.observacao || "-"}</td>
                <td>{new Date(m.data).toLocaleString().replace(",", " -")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={openModal} onClose={fecharModal}>
        <h3>Nova Movimentação</h3>

        <form className="form" onSubmit={salvar}>
          <input
            className="input"
            placeholder="Buscar produto..."
            value={buscaProduto}
            onChange={(e) => {
              setBuscaProduto(e.target.value);
              setMostrarLista(true);
            }}
          />

          {listaVisivel && (
            <div
              style={{
                maxHeight: 160,
                overflowY: "auto",
                border: "1px solid #ccc",
                borderRadius: 6,
                marginTop: 5,
                background: "#fff",
                color: "#000",
              }}
            >
              {filtrados.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setForm({ ...form, produto_id: p.id });
                    setBuscaProduto(p.nome);
                    setMostrarLista(false);
                  }}
                  style={{
                    padding: 8,
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {p.nome} (Estoque: {p.quantidade})
                </div>
              ))}
            </div>
          )}

          <select
            className="input"
            value={form.tipo}
            onChange={(e) =>
              setForm({ ...form, tipo: e.target.value })
            }
          >
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>

          <input
            className="input"
            type="number"
            placeholder="Quantidade"
            value={form.quantidade}
            onChange={(e) =>
              setForm({ ...form, quantidade: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Observação"
            value={form.observacao}
            onChange={(e) =>
              setForm({ ...form, observacao: e.target.value })
            }
          />

          <button className="button">Salvar</button>
        </form>
      </Modal>
    </div>
  );
}