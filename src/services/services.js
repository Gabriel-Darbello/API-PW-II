const fs = require('fs').promises;

const getAluno = async () => {
  try {
    const data = await fs.readFile('alunos.json', 'utf-8');
    alunos = JSON.parse(data);

    if (alunos.length > 0) {
      idCounter = alunos[alunos.length - 1].id + 1;
    }
  } catch {
    alunos = [];
  }
  return alunos;
};

const getAlunoById = async (id) => {
  try {
    const data = await fs.readFile('alunos.json', 'utf-8');
    alunos = JSON.parse(data);

    if (alunos.length > 0) {
      idCounter = alunos[alunos.length - 1].id + 1;
    }
  } catch {
    alunos = [];
  }

  const aluno = alunos.find((t) => t.id == id);
  return aluno || null;
};

module.exports = {
  getAluno,
  getAlunoById,
};
