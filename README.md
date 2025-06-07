# AI Document Analyzer <img src="assets/img/logo.png" alt="AI Document Analyzer Logo" width="40" style="vertical-align: middle; border-radius: 50%; margin-left: 12px;">


[](https://opensource.org/licenses/MIT)
[](https://semver.org)
[](https://www.google.com/search?q=https://github.com/your-username/ai-document-analyzer/issues)

> Sua assistente de escrita inteligente para analisar, aprimorar e validar seus textos com o poder da IA.

## 📖 Sobre o Projeto

O **AI Document Analyzer** é uma aplicação web inovadora projetada para ajudar usuários a aprimorar seus textos de forma rápida e eficiente. Utilizando a API do Gemini, esta ferramenta oferece um conjunto de funcionalidades para analisar, resumir, melhorar e verificar a originalidade de qualquer documento, tudo em uma interface limpa e intuitiva.

Seja você um estudante, um profissional ou um criador de conteúdo, esta ferramenta foi feita para otimizar seu fluxo de trabalho e elevar a qualidade da sua escrita.
## 🖼️ Visão Geral da Interface
<p align="center">
   <img src="assets/img/image.png" alt="AI Document Analyzer Interface" width="80%">
</p>   

## ✨ Funcionalidades

  * **📝 Análise Crítica:** Receba uma análise detalhada sobre a clareza, coesão, tom e pontos fortes do seu texto.
  * **✂️ Sumarização Inteligente:** Gere resumos concisos e precisos de documentos longos em questão de segundos.
  * **🚀 Aprimoramento de Texto:** Obtenha sugestões para melhorar a gramática, o estilo e a fluidez do seu documento, tornando-o mais profissional.
  * **🔍 Verificação de Originalidade:** Analise o texto para identificar trechos que possam ser considerados plágio (conceitual).
  * **📋 Copiar para Área de Transferência:** Copie facilmente os resultados gerados com um único clique.
  * **🔔 Notificações:** Receba feedback visual para ações como copiar texto, garantindo uma melhor experiência de usuário.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

  * **Frontend:** HTML5, CSS3, JavaScript (ES6+)
  * **Inteligência Artificial:** Google Gemini API
  * **Utilitários:** [Showdown](https://github.com/showdownjs/showdown) (para conversão de Markdown para HTML)

## 🚀 Começando

Para executar o projeto localmente, siga os passos abaixo.

### Pré-requisitos

  * Você precisa ter o [Node.js](https://nodejs.org/) e o [npm](https://www.npmjs.com/) instalados em sua máquina.
  * Uma chave de API do [Google Gemini](https://aistudio.google.com/app/apikey).

### Configuração

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/GabrielHiro/ai-document-analyzer.git
    cd ai-document-analyzer
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure sua chave de API:**

      * Renomeie o arquivo `config/config.example.js` para `config/config.js`.
      * Abra o novo arquivo `config/config.js` e insira sua chave da API do Gemini:
        ```javascript
        // config/config.js
        export const API_KEY = 'SUA_CHAVE_DE_API_AQUI';
        ```

### Executando a Aplicação

Você pode executar a aplicação de duas maneiras:

1.  **Método Simples (Pode apresentar erros de CORS):**

      * Abra o arquivo `src/index.html` diretamente no seu navegador.

2.  **Método Recomendado (com um servidor local):**

      * Instale o `serve` globalmente (se ainda não o tiver):
        ```bash
        npm install -g serve
        ```
      * Inicie um servidor a partir da raiz do projeto:
        ```bash
        serve
        ```
      * Abra seu navegador e acesse `http://localhost:3000` (ou o endereço fornecido pelo `serve`).

## 📁 Estrutura do Projeto

A estrutura de arquivos está organizada para manter o código modular e de fácil manutenção.

```
ai-document-analyzer/
├── src/
│   ├── index.html          # Estrutura principal da página
│   ├── js/
│   │   ├── main.js         # Ponto de entrada e orquestração do JS
│   │   ├── api/gemini.js   # Lógica de interação com a API Gemini
│   │   └── components/     # Módulos de UI (input, botões, etc.)
│   ├── css/
│   │   ├── styles.css      # Estilos globais
│   │   └── components/     # Estilos para componentes específicos
│   └── assets/             # Ícones e outras mídias
├── config/
│   └── config.js           # Configurações (chave de API)
├── package.json            # Dependências e scripts do projeto
└── README.md               # Este arquivo
```

## 🤝 Como Contribuir

Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito bem-vinda**.

1.  Faça um **Fork** do projeto.
2.  Crie uma nova **Branch** (`git checkout -b feature/sua-feature-incrivel`).
3.  Faça o **Commit** de suas alterações (`git commit -m 'Adiciona sua-feature-incrivel'`).
4.  Faça o **Push** para a Branch (`git push origin feature/sua-feature-incrivel`).
5.  Abra um **Pull Request**.

Não hesite em abrir uma *issue* para relatar bugs ou sugerir novas funcionalidades.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.