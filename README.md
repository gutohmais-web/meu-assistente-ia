# Meu Assistente IA — projeto inicial

Projeto pessoal com interface responsiva para celular. Inclui atalhos para chat, ideias de imagens, ideias de vídeos, programação, textos e planejamento.

## O que funciona agora
- Interface mobile em HTML/CSS/JavaScript.
- Seleção de ferramentas e envio de mensagens.
- Servidor de exemplo que consulta a API da OpenAI sem expor a chave no HTML.

## O que precisa configurar
- A conexão de chat exige uma chave de API e pode gerar cobrança conforme o uso e os preços do provedor.
- As opções de imagem e vídeo, nesta versão, ajudam a montar prompts; não geram mídia automaticamente. Para isso é preciso integrar serviços de geração de imagem/vídeo compatíveis.
- Para uso contínuo pela internet, o servidor precisa ficar hospedado. Hospedar pode ter custos e cotas.

## Executar o servidor
1. Instale Node.js 18 ou mais recente em um computador ou ambiente de hospedagem compatível.
2. No terminal, entre na pasta do projeto e rode `npm install`.
3. Crie um arquivo `.env` com:
   ```
   OPENAI_API_KEY=sua_chave_aqui
   OPENAI_MODEL=gpt-5-mini
   ```
4. Rode `npm start` e abra `http://localhost:3000`.

**Nunca coloque sua chave de API no `public/index.html` nem dentro do APK.** O arquivo `.env` deve ficar só no servidor e não deve ser enviado publicamente.

## Fazer virar APK usando apenas o celular
O HTML sozinho ainda não é um APK. Um caminho possível é hospedar o site e usar um serviço de build Android na nuvem, ou usar um ambiente Android compatível com Node/Java/Gradle e Capacitor. A configuração do APK é uma etapa separada; este ZIP é a base web e o servidor de IA, não um APK compilado.

## Arquivos
- `public/index.html`: interface.
- `server.js`: API de servidor para conversar com a IA.
- `package.json`: dependências.
- `.env.example`: modelo de configuração.
