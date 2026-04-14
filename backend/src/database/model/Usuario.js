class Usuario {
    constructor(id, nome, email, senha, cargo, created_at) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.cargo = cargo;
        this.created_at = created_at;
    }
}

module.exports = Usuario;