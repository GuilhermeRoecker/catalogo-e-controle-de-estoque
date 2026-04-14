class Movimentacao {
    constructor(
        id,
        produto_id,
        usuario_id,
        tipo,
        quantidade,
        data,
        observacao
    ) {
        this.id = id;
        this.produto_id = produto_id;
        this.usuario_id = usuario_id;
        this.tipo = tipo;
        this.quantidade = quantidade;
        this.data = data;
        this.observacao = observacao;
    }
}

module.exports = Movimentacao;