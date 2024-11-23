import dotenv from 'dotenv';
import { MongoClient } from 'mongodb'; // Importa o MongoClient do pacote mongodb

dotenv.config(); // Carrega as variáveis do arquivo .env

const MONGO_URI = process.env.MONGO_URI; // Recupera a URI do banco de dados do arquivo .env
const API_KEY = process.env.API_KEY; // Variável de chave da API
const API_URL = process.env.API_URL; // URL da API

console.log(MONGO_URI); // Exemplo de uso

// Função para conectar ao MongoDB usando a URI do banco de dados
export default async function conectarAoBanco() {
  let mongoClient;

  try {
    mongoClient = new MongoClient(MONGO_URI); // Usando MONGO_URI diretamente
    console.log('Conectando ao cluster do banco de dados...');
    await mongoClient.connect();
    console.log('Conectado ao MongoDB Atlas com sucesso!');

    return mongoClient;
  } catch (erro) {
    console.error('Falha na conexão com o banco!', erro);
    process.exit(1); // Garantir que o processo seja finalizado em caso de erro
  }
}
