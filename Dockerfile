FROM node:16

# Define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia os arquivos necessários
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "app.js"]
