class Produto {
    constructor(
        id,
        nome,
        descricao,
        preco,
        quantidade,
        categoria_id,
        created_at
    ) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.categoria_id = categoria_id;
        this.created_at = created_at
    }
}

module.exports = Produto;