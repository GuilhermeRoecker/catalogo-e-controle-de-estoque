class Movimentacao {
    constructor(id, produto_id, tipo, quantidade, data, observacao) {
        this.id = id;
        this.produto_id = produto_id;
        this.tipo = tipo;
        this.quantidade = quantidade;
        this.data = data;
        this.observacao = observacao;
    }
}

module.exports = Movimentacao;