import express from "express";
import routes from "./src/routes/postsRoutes.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.static("uploads"))
routes(app)

// Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen(3001, () => {
    console.log("Servidor rodando na porta 3000");
});
