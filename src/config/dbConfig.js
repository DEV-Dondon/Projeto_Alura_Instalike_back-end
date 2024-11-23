import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente

export default async function conectarAoBanco() {
  const stringConexao = process.env.MONGO_URI; // Use a variável de ambiente

  if (!stringConexao) {
    console.error("A string de conexão com o banco de dados não foi encontrada!");
    process.exit(1); // Encerra o processo se a string de conexão não existir
  }

  let mongoClient;

  try {
    mongoClient = new MongoClient(stringConexao, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectando ao cluster do banco de dados...');
    await mongoClient.connect();
    console.log('Conectado ao MongoDB Atlas com sucesso!');

    return mongoClient;
  } catch (erro) {
    console.error('Falha na conexão com o banco!', erro);
    process.exit(1); // Encerra o processo em caso de erro na conexão
  }
}
