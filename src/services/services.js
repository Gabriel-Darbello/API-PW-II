const fs = require('fs').promises;

const getAluno = async () => {
  try {
    const data = await fs.readFile('alunos.json', 'utf-8');
    alunos = JSON.parse(data);
  } catch {
    alunos = [];
  }
  return alunos;
};

const getAlunoById = async (id) => {
  try {
    const data = await fs.readFile('alunos.json', 'utf-8');
    var alunos = JSON.parse(data);
  } catch {
    alunos = [];
  }

  const aluno = alunos.find((t) => t.id == id);
  return aluno || null;
};

const getProduto = async (categoria) => {
  let produtos = [];

  try {
    const data = await fs.readFile('produtos.json', 'utf-8');
    produtos = JSON.parse(data);
  } catch {
    produtos = [];
  }

  if (!categoria) return produtos;

  const produtosFiltrados = produtos.filter(
    (t) => t.categoria && t.categoria.toLowerCase() === categoria.toLowerCase()
  );

  return produtosFiltrados;
};

module.exports = {
  getAluno,
  getAlunoById,
  getProduto
};
