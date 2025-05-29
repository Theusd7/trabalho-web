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

app.delete("/alunos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const indice = alunos.findIndex(aluno => aluno.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }

  alunos.splice(indice, 1);
  res.status(204).send();
});

app.patch("/alunos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = alunos.find(aluno => aluno.id === id);

  if (!aluno) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }

  const { nome, idade, curso } = req.body;

  if (nome !== undefined) aluno.nome = nome;
  if (idade !== undefined) aluno.idade = idade;
  if (curso !== undefined) aluno.curso = curso;

  res.json({
    mensagem: "Aluno atualizado com sucesso",
    aluno
  });
});

app.get("/alunos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = alunos.find(aluno => aluno.id === id);

  if (!aluno) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }

  res.json(aluno);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
