import fetchImages from "./fetchApis.js";

// Elementos do modal
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

// Grid de imagens
const imageGrid = document.querySelector(".image-grid");

// Função para exibir as imagens no grid
async function displayImages() {
  try {
    const data = await fetchImages();
    const fragment = document.createDocumentFragment();

    data.forEach(({ imgUrl, alt, descricao }) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      img.src = imgUrl;
      img.alt = alt;
      img.setAttribute("loading", "lazy"); // Lazy loading
      article.dataset.description = descricao;

      // Configura o clique na imagem para abrir o modal
      img.addEventListener("click", () => {
        openModal(img.src, descricao);
      });

      article.appendChild(img);
      fragment.appendChild(article);
    });

    imageGrid.appendChild(fragment);
  } catch (err) {
    console.error("Erro ao carregar as imagens:", err);
  }
}

// Função para abrir o modal
function openModal(imageSrc, description) {
  modal.style.display = "flex"; // Exibe o modal
  modalImg.src = imageSrc; // Define a imagem no modal
  captionText.textContent = description; // Define a descrição no modal
  modal.setAttribute('aria-hidden', 'false'); // Torna o modal acessível
}

// Função para fechar o modal
function closeModal() {
  modal.style.display = "none";
  modal.setAttribute('aria-hidden', 'true'); // Torna o modal inacessível
}

// Eventos para fechar o modal
closeBtn.addEventListener("click", closeModal); // Fechar ao clicar no "x"
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal(); // Fechar ao clicar fora do modal
});

// Carrega as imagens ao iniciar
window.addEventListener("DOMContentLoaded", displayImages);
