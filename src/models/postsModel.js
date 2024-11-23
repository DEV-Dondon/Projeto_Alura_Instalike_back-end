// Importa as dependências
import 'dotenv/config'; // Carrega as variáveis de ambiente
import { ObjectId } from "mongodb"; // Importa o ObjectId do MongoDB
import conectarAoBanco from "../config/dbConfig.js"; // Importa a função de conexão ao banco
import Joi from "joi"; // Biblioteca para validação de dados

// Define constantes para o nome do banco e coleção
const DATABASE_NAME = "imersao-instabyte";
const COLLECTION_NAME = "posts";

let conexao;

// Função para inicializar a conexão com o banco de dados
async function inicializarConexao() {
    if (!conexao) {
        try {
            conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
        } catch (error) {
            console.error("Erro ao inicializar a conexão com o banco de dados:", error.message);
            throw error;
        }
    }
    return conexao.db(DATABASE_NAME).collection(COLLECTION_NAME);
}

// Schema de validação para um post
const postSchema = Joi.object({
    descricao: Joi.string().optional(),
    imgUrl: Joi.string().uri().required(),
    alt: Joi.string().optional()
});

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    try {
        const colecao = await inicializarConexao();
        return await colecao.find().toArray(); // Retorna todos os documentos
    } catch (error) {
        console.error("Erro ao buscar posts:", error.message);
        throw error;
    }
}

// Função para criar um novo post
export async function criarPost(novoPost) {
    const { error } = postSchema.validate(novoPost);
    if (error) {
        throw new Error(`Erro de validação: ${error.message}`);
    }

    try {
        const colecao = await inicializarConexao();
        return await colecao.insertOne(novoPost); // Insere um novo post
    } catch (error) {
        console.error("Erro ao criar post:", error.message);
        throw error;
    }
}

// Função para atualizar um post existente
export async function atualizarPost(id, novoPost) {
    if (!ObjectId.isValid(id)) {
        throw new Error("ID fornecido é inválido");
    }

    const objID = new ObjectId(id);
    const { error } = postSchema.validate(novoPost);
    if (error) {
        throw new Error(`Erro de validação: ${error.message}`);
    }

    try {
        const colecao = await inicializarConexao();
        const resultado = await colecao.updateOne({ _id: objID }, { $set: novoPost });

        if (resultado.modifiedCount === 0) {
            throw new Error("Nenhum documento foi atualizado. Verifique o ID.");
        }

        return resultado;
    } catch (error) {
        console.error("Erro ao atualizar post:", error.message);
        throw error;
    }
}
