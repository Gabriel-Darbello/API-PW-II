const fs = require('fs').promises;

// centralização de leitura de arquivos
const loadData = async (file) => {
  let response = [];
  try {
    const data = await fs.readFile(file, 'utf-8');
    response = JSON.parse(data);
  } catch {
    response = [];
  }

  return response;
};

// <-------- EXERCICIO 2 --------->
const getAluno = async () => {
  let alunos = await loadData('alunos.json');
  return alunos;
};

// <-------- EXERCICIO 3 --------->
const getAlunoById = async (id) => {
  let alunos = await loadData('alunos.json');
  const aluno = alunos.find((t) => t.id == id);
  return aluno || null;
};

// <-------- EXERCICIO 4 --------->
const getProduto = async (categoria) => {
  let produtos = await loadData('produtos.json');

  if (!categoria) return produtos;

  const produtosFiltrados = produtos.filter(
    (t) => t.categoria && t.categoria.toLowerCase() === categoria.toLowerCase()
  );

  return produtosFiltrados;
};

// <-------- EXERCICIO 5 --------->
const addAluno = async (nome, turma, curso) => {
  const alunos = await loadData('alunos.json');

  let idCounter = 1;
  if (alunos.length > 0) {
    idCounter = alunos[alunos.length - 1].id + 1;
  }

  let novoAluno = { id: idCounter, nome, turma, curso };

  alunos.push(novoAluno);

  try {
    await fs.writeFile('alunos.json', JSON.stringify(alunos, null, 2));
  } catch (err) {
    console.log('Erro ao salvar o arquivo', err);
  }

  return novoAluno;
};

module.exports = {
  getAluno,
  getAlunoById,
  getProduto,
  addAluno
};
