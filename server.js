import express from "express";
import { MongoClient } from "mongodb";
import routes from "./src/routes/postsRoutes.js"; // Supondo que as rotas estão aqui

const app = express();
app.use(express.json()); // Para garantir que as requisições com corpo JSON sejam lidas corretamente

// String de conexão com o MongoDB Atlas
const stringConexao = "mongodb+srv://filholucivan:cvdJlRSEQLMOqA7q@cluster0.q3yzn.mongodb.net/instalikeDB?retryWrites=true&w=majority";

// Função para conectar ao banco de dados
async function conectarAoBanco() {
    let mongoClient;
    try {
        mongoClient = new MongoClient(stringConexao);
        console.log("Conectando ao cluster do banco de dados...");
        await mongoClient.connect();
        console.log("Conectado ao MongoDB Atlas com sucesso!");
        return mongoClient;
    } catch (erro) {
        console.error("Falha na conexão com o banco!", erro);
        process.exit();
    }
}

// Conectar ao banco e passar a conexão para as rotas
conectarAoBanco().then((mongoClient) => {
    console.log("Banco de dados conectado!");
    routes(app, mongoClient); // Passando a conexão para as rotas
}).catch((error) => {
    console.error("Erro ao conectar com o banco de dados:", error);
    process.exit();
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor escutando...");
});
