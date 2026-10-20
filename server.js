// Servidor de exemplo: mantém a chave da API fora do HTML/APK.
// Requer Node.js 18+ e uma chave de API válida.
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static("."));

app.post("/api/chat", async (req, res) => {
  try {
    const message = String(req.body?.message || "").slice(0, 12000);
    if (!message.trim()) return res.status(400).json({ error: "Mensagem vazia." });
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ error: "Configure OPENAI_API_KEY no arquivo .env do servidor." });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5-mini",
        input: message
      })
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || "Erro no provedor de IA." });
    const reply = (data.output || [])
      .flatMap(item => item.content || [])
      .filter(item => item.type === "output_text")
      .map(item => item.text)
      .join("\n");
    res.json({ reply: reply || "Não recebi uma resposta em texto." });
  } catch (err) {
    res.status(500).json({ error: "Falha interna ao consultar a IA." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Meu Assistente IA disponível na porta ${port}`));
