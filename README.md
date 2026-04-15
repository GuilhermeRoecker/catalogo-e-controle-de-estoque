# 📦 Sistema de Controle de Estoque

Sistema web para gerenciamento de estoque com controle de produtos, categorias e movimentações (entrada e saída), além de dashboard com indicadores.
Confira em: https://stackflow-w4pl.onrender.com/

---

## 🚀 Funcionalidades

### 🔐 Autenticação
- Login e registro de usuários
- Autenticação via JWT em cookie HTTP-only
- Logout com remoção de sessão

### 📦 Produtos
- Cadastro, edição e exclusão
- Associação com categorias
- Controle de quantidade em estoque
- Validação de exclusão (bloqueio se houver dependências)

### 🗂 Categorias
- CRUD completo
- Proteção contra exclusão quando existem produtos vinculados

### 🔄 Movimentações
- Entrada e saída de estoque
- Atualização automática de quantidade
- Registro com observação e histórico
- Validação de estoque insuficiente

### 📊 Dashboard
- Produtos com estoque baixo
- Gráfico de produtos por categoria
- Últimas movimentações

---

## 🧱 Tecnologias utilizadas

### Backend
- Node.js
- Express
- PostgreSQL
- JWT (jsonwebtoken)
- Cookies HTTP-only
- Transações SQL (BEGIN / COMMIT / ROLLBACK)

### Frontend
- React
- React Router DOM
- Axios
- Recharts
- React Toastify

---

## 🏗 Arquitetura

O projeto segue uma separação em camadas:

- **Controllers**: responsabilidade de requisição/resposta HTTP
- **Services**: regras de negócio
- **Database layer**: queries SQL isoladas
- **Frontend services**: abstração de chamadas HTTP

---

## 🔐 Segurança

- Token JWT armazenado em cookie HTTP-only
- Proteção de rotas via middleware
- CORS configurado para comunicação entre front e backend
- Validações de entrada no backend e frontend

---

## 📌 Observações

- Exclusão de categorias bloqueada caso existam produtos vinculados
- Movimentações controlam estoque em transação
- Sistema preparado para evitar inconsistências de dados

---

## ▶️ Como executar

### Backend
```bash
npm install
npm run dev
