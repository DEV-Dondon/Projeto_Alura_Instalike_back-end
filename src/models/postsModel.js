import 'dotenv/config'; // Carrega as variáveis de ambiente
import { ObjectId } from "mongodb"; // Importa o ObjectId do MongoDB
import conectarAoBanco from "../config/dbConfig.js"; // Importa a função de conexão ao banco

let conexao;

// Função para inicializar a conexão com o banco de dados
async function inicializarConexao() {
    if (!conexao) {
        conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
    }
    return conexao;
}

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    const conexao = await inicializarConexao();
    const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados
    const colecao = db.collection("posts"); // Seleciona a coleção
    return colecao.find().toArray(); // Retorna todos os documentos
}

// Função para criar um novo post
export async function criarPost(novoPost) {
    const conexao = await inicializarConexao();
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost); // Insere um novo post
}

// Função para atualizar um post existente
export async function atualizarPost(id, novoPost) {
    const conexao = await inicializarConexao();
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    // Converte a string `id` para ObjectId
    const objID = new ObjectId(id);

    return colecao.updateOne({ _id: objID }, { $set: novoPost }); // Atualiza o documento
}
