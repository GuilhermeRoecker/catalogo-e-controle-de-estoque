require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "https://stackflow-w4pl.onrender.com",
    credentials: true
}));

// routes
const routes = require('./src/routes');
app.use('/api', routes);

// server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});