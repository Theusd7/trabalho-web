import express from "express";

const PORT = 3000;
const app = express();

let alunos = []

app.use(express.json());

app.get("/alunos", (req, res) => {
  res.json(alunos);
});

app.post("/alunos", (req, res) => {
    const { nome, idade, curso } = req.body;
    if (!nome || !idade || !curso) {
    return res.status(400).json({ erro: "Nome, idade e curso são obrigatórios" });
  }

  const novoAluno = {
    id: alunos.length + 1,
    nome,
    idade,
    curso
  };

  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
