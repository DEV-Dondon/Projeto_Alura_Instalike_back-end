import express from "express";
import routes from "./src/routes/postsRoutes.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Serve arquivos estáticos da pasta 'uploads'
app.use(express.static("uploads"));

// Chama as rotas
routes(app);

const port = process.env.PORT || 8000;  // Usando 8000 por padrão localmente


// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
