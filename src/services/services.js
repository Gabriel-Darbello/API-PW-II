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

module.exports = {
  getAluno,
};
