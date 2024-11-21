import { getTodosPosts, criarPost } from "../models/postsModel.js";
import fs from "fs";
export async function listarPosts(req, res) {
    console.log("Recebida solicita o de lista de posts...")
    // Chama a fun o para buscar os posts
    // Chama a função para buscar os posts
    const posts = await getTodosPosts();
    console.log("Posts recuperados com sucesso! Enviando resposta...")
    // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
    res.status(200).json(posts);
    console.log("Resposta enviada com sucesso!");
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" })
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" })
    }
}