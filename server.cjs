import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";

let conexao;
const { inicializarConexao } = require('./conexao');
inicializarConexao();


const posts = [
  { id: 1, descricao: "Uma foto teste", imagem: "https://placekitten.com/300/150" },
  { id: 2, descricao: "Gato fazendo yoga", imagem: "https://placekitten.com/300/150" },
  { id: 3, descricao: "Gato fazendo panqueca", imagem: "https://placekitten.com/300/150" },
];

const app = express();

app.listen(3000, () => {
  console.log("Servidor escutando...");
});

app.get("/posts", async (req, res) => {
  try {
    const resultado = await getTodosPosts();
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar os posts." });
  }
});

function buscarPostPorID(id) {
  return posts.find((post) => post.id === Number(id));
}

app.get("/posts/:id", (req, res) => {
  const post = buscarPostPorID(req.params.id);

  if (!post) {
    return res.status(404).json({ erro: "Post não encontrado." });
  }

  res.status(200).json(post);
});
