class Categoria {
    constructor(
        id,
        nome,
        descricao,
        criado_por,
        created_at
    ) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.criado_por = criado_por;
        this.created_at = created_at;
    }
}

module.exports = Categoria;